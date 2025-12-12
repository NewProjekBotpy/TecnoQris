import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertTransactionSchema,
  insertWalletSchema,
  insertQrCodeSchema,
  insertPaymentSchema,
  type ApiKey,
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getSakurupiahService, SakurupiahError, SakurupiahConfigError } from "./sakurupiah";

let sakurupiahService: ReturnType<typeof getSakurupiahService> | null = null;
let sakurupiahConfigured = false;

function initSakurupiahService() {
  try {
    sakurupiahService = getSakurupiahService();
    sakurupiahConfigured = true;
    console.log('[Payment] Sakurupiah service initialized successfully');
  } catch (error) {
    if (error instanceof SakurupiahConfigError) {
      console.warn('[Payment] Sakurupiah not configured - running in sandbox mode. Set SAKURUPIAH_API_ID and SAKURUPIAH_API_KEY to enable production payments.');
      sakurupiahConfigured = false;
    } else {
      console.error('[Payment] Failed to initialize Sakurupiah service:', error);
      sakurupiahConfigured = false;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

interface AuthenticatedRequest extends Request {
  apiKey?: ApiKey;
  apiKeyUserId?: string;
}

function isAuthenticated(req: any, res: any, next: any) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

async function apiKeyAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const apiKeyHeader = req.headers["x-api-key"] as string;
  
  if (!apiKeyHeader) {
    return res.status(401).json({ 
      success: false,
      error: {
        code: "MISSING_API_KEY",
        message: "API key is required. Please provide X-API-Key header."
      }
    });
  }

  try {
    const apiKey = await storage.getApiKeyByValue(apiKeyHeader);
    
    if (!apiKey) {
      return res.status(401).json({ 
        success: false,
        error: {
          code: "INVALID_API_KEY",
          message: "Invalid API key. Please check your API key and try again."
        }
      });
    }

    if (apiKey.isActive !== 1) {
      return res.status(403).json({ 
        success: false,
        error: {
          code: "INACTIVE_API_KEY",
          message: "This API key has been deactivated."
        }
      });
    }

    await storage.incrementApiKeyUsage(apiKey._id);
    
    req.apiKey = apiKey;
    req.apiKeyUserId = apiKey.userId;
    next();
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
}

function generateQRISString(paymentId: string, amount: number, merchantName: string = "QRIS Merchant"): string {
  const timestamp = Date.now().toString(36);
  return `00020101021226580016ID.CO.QRIS.WWW0215ID${paymentId.slice(0, 15)}0303UMI51440014ID.CO.QRIS.WWW0215ID${timestamp}53033605802ID5913${merchantName.slice(0, 13)}6007Jakarta61051234062070703A01${amount.toString().padStart(13, '0')}6304`;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimits = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  let cleanedCount = 0;
  const entries = Array.from(rateLimits.entries());
  for (let i = 0; i < entries.length; i++) {
    const [key, entry] = entries[i];
    if (entry.resetAt < now) {
      rateLimits.delete(key);
      cleanedCount++;
    }
  }
  if (cleanedCount > 0) {
    console.log(`[RateLimit] Cleaned up ${cleanedCount} expired entries`);
  }
}, 5 * 60 * 1000);

function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'] as string;
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${options.keyPrefix || 'default'}:${apiKey || ip}`;
    
    const now = Date.now();
    let entry = rateLimits.get(key);
    
    if (!entry || entry.resetAt < now) {
      entry = { count: 0, resetAt: now + options.windowMs };
      rateLimits.set(key, entry);
    }
    
    entry.count++;
    
    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - entry.count));
    res.setHeader('X-RateLimit-Reset', entry.resetAt);
    
    if (entry.count > options.maxRequests) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
          retry_after: Math.ceil((entry.resetAt - now) / 1000)
        }
      });
    }
    
    next();
  };
}

const authRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10,
  keyPrefix: 'auth'
});

const apiV1RateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 100,
  keyPrefix: 'api_v1'
});

const webhookRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 1000,
  keyPrefix: 'webhook'
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  initSakurupiahService();
  
  app.post("/api/auth/register", authRateLimiter, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });
      
      await storage.createInitialApiKeys(user._id);
      
      // Seed example transactions for new user with unique transaction IDs
      const userPrefix = user._id.slice(0, 8);
      const exampleTransactions = [
        { transactionId: `TRX-${userPrefix}-001`, type: "income", amount: 150000, status: "success", customer: "Budi Santoso", method: "QRIS", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-002`, type: "income", amount: 25000, status: "success", customer: "Siti Aminah", method: "QRIS", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-003`, type: "expense", amount: 500000, status: "pending", customer: "Vendor Payment", method: "Bank Transfer", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-004`, type: "income", amount: 75000, status: "success", customer: "Rudi Hartono", method: "QRIS", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-005`, type: "income", amount: 200000, status: "failed", customer: "Dewi Lestari", method: "E-Wallet", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-006`, type: "income", amount: 350000, status: "success", customer: "Andi Pratama", method: "QRIS", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-007`, type: "expense", amount: 125000, status: "success", customer: "Supplier ABC", method: "Bank Transfer", createdAt: new Date().toISOString() },
        { transactionId: `TRX-${userPrefix}-008`, type: "income", amount: 450000, status: "success", customer: "Maya Sari", method: "E-Wallet", createdAt: new Date().toISOString() },
      ];
      
      for (const trx of exampleTransactions) {
        await storage.createTransaction({
          ...trx,
          userId: user._id,
        });
      }
      
      req.session.userId = user._id;
      
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to save session" });
        }
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", authRateLimiter, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user._id;
      
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to save session" });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", authRateLimiter, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/transactions", isAuthenticated, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const transactions = await storage.getTransactions(req.session.userId!, limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/transactions/:id", isAuthenticated, async (req, res) => {
    try {
      const transaction = await storage.getTransactionById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      if (transaction.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/transactions", isAuthenticated, async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const transaction = await storage.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/transactions/:id", isAuthenticated, async (req, res) => {
    try {
      const existingTransaction = await storage.getTransactionById(req.params.id);
      if (!existingTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      if (existingTransaction.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updates = insertTransactionSchema.partial().parse(req.body);
      const transaction = await storage.updateTransaction(req.params.id, updates);
      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/wallets", isAuthenticated, async (req, res) => {
    try {
      const wallets = await storage.getWallets(req.session.userId!);
      res.json(wallets);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/wallets/:id", isAuthenticated, async (req, res) => {
    try {
      const wallet = await storage.getWalletById(req.params.id);
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      if (wallet.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(wallet);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/wallets", isAuthenticated, async (req, res) => {
    try {
      const walletData = insertWalletSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const wallet = await storage.createWallet(walletData);
      res.status(201).json(wallet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/wallets/:id", isAuthenticated, async (req, res) => {
    try {
      const existingWallet = await storage.getWalletById(req.params.id);
      if (!existingWallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      if (existingWallet.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updates = insertWalletSchema.partial().parse(req.body);
      const wallet = await storage.updateWallet(req.params.id, updates);
      res.json(wallet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/wallets/:id", isAuthenticated, async (req, res) => {
    try {
      const existingWallet = await storage.getWalletById(req.params.id);
      if (!existingWallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      
      if (existingWallet.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      await storage.deleteWallet(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/qr-codes", isAuthenticated, async (req, res) => {
    try {
      const qrCodes = await storage.getQrCodes(req.session.userId!);
      res.json(qrCodes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/qr-codes/:id", isAuthenticated, async (req, res) => {
    try {
      const qrCode = await storage.getQrCodeById(req.params.id);
      if (!qrCode) {
        return res.status(404).json({ message: "QR code not found" });
      }
      
      if (qrCode.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(qrCode);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/qr-codes", isAuthenticated, async (req, res) => {
    try {
      const qrCodeData = insertQrCodeSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const qrCode = await storage.createQrCode(qrCodeData);
      res.status(201).json(qrCode);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/qr-codes/:id", isAuthenticated, async (req, res) => {
    try {
      const existingQrCode = await storage.getQrCodeById(req.params.id);
      if (!existingQrCode) {
        return res.status(404).json({ message: "QR code not found" });
      }
      
      if (existingQrCode.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updates = insertQrCodeSchema.partial().parse(req.body);
      const qrCode = await storage.updateQrCode(req.params.id, updates);
      res.json(qrCode);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/qr-codes/:id", isAuthenticated, async (req, res) => {
    try {
      const existingQrCode = await storage.getQrCodeById(req.params.id);
      if (!existingQrCode) {
        return res.status(404).json({ message: "QR code not found" });
      }
      
      if (existingQrCode.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      await storage.deleteQrCode(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/api-keys", isAuthenticated, async (req, res) => {
    try {
      const apiKeys = await storage.getApiKeys(req.session.userId!);
      res.json(apiKeys);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/api-keys", isAuthenticated, async (req, res) => {
    try {
      const { mode } = req.body;
      if (!mode || (mode !== 'sandbox' && mode !== 'live')) {
        return res.status(400).json({ message: "Mode must be 'sandbox' or 'live'" });
      }
      
      const prefix = mode === 'sandbox' ? 'sk_sandbox_' : 'sk_live_';
      const randomKey = prefix + crypto.randomBytes(24).toString('hex');
      const apiKey = await storage.createOrResetApiKey(req.session.userId!, mode, randomKey);
      res.status(201).json(apiKey);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/api-keys/:id/status", isAuthenticated, async (req, res) => {
    try {
      const apiKeys = await storage.getApiKeys(req.session.userId!);
      
      const apiKey = apiKeys.find(k => k._id === req.params.id);
      if (!apiKey) {
        return res.status(404).json({ message: "API key not found" });
      }
      
      const { isActive } = req.body;
      if (typeof isActive !== 'number' || (isActive !== 0 && isActive !== 1)) {
        return res.status(400).json({ message: "isActive must be 0 or 1" });
      }
      
      const updatedKey = await storage.updateApiKeyStatus(req.params.id, isActive);
      res.json(updatedKey);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/analytics/revenue", isAuthenticated, async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      
      const stats = await storage.getRevenueStats(req.session.userId!, startDate, endDate);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/analytics/stats", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getTransactionStats(req.session.userId!);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ==========================================
  // PUBLIC API v1 - QRIS Payment Gateway
  // ==========================================

  const createPaymentSchema = z.object({
    external_id: z.string().min(1).max(100),
    amount: z.number().int().positive().min(1000).max(100000000),
    payment_method: z.enum(['QRIS', 'BCAVA', 'BRIVA', 'BNIVA', 'GOPAY', 'DANA', 'OVO']).default('QRIS'),
    description: z.string().max(255).optional(),
    customer_name: z.string().max(100).optional(),
    customer_email: z.string().email().optional(),
    customer_phone: z.string().max(20).optional(),
    callback_url: z.string().url().optional(),
    return_url: z.string().url().optional(),
    expires_in_minutes: z.number().int().positive().max(1440).default(30),
    idempotency_key: z.string().max(100).optional(),
  });

  app.post("/api/v1/payments", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
    try {
      const validatedData = createPaymentSchema.parse(req.body);
      
      if (validatedData.idempotency_key) {
        const existingPaymentByKey = await storage.getPaymentByIdempotencyKey(validatedData.idempotency_key);
        if (existingPaymentByKey) {
          return res.status(200).json({
            success: true,
            data: {
              id: existingPaymentByKey._id,
              external_id: existingPaymentByKey.externalId,
              amount: existingPaymentByKey.amount,
              fee_amount: existingPaymentByKey.feeAmount,
              net_amount: existingPaymentByKey.netAmount,
              description: existingPaymentByKey.description,
              customer_name: existingPaymentByKey.customerName,
              customer_email: existingPaymentByKey.customerEmail,
              status: existingPaymentByKey.status,
              payment_method: existingPaymentByKey.paymentMethod,
              qr_string: existingPaymentByKey.qrString,
              provider_ref: existingPaymentByKey.providerRef,
              expires_at: existingPaymentByKey.expiresAt,
              paid_at: existingPaymentByKey.paidAt || null,
              created_at: existingPaymentByKey.createdAt,
            },
            idempotent: true,
          });
        }
      }
      
      const existingPayment = await storage.getPaymentByExternalId(validatedData.external_id);
      if (existingPayment) {
        return res.status(409).json({
          success: false,
          error: {
            code: "DUPLICATE_EXTERNAL_ID",
            message: "A payment with this external_id already exists."
          }
        });
      }

      const paymentChannel = await storage.getPaymentChannelByCode(validatedData.payment_method);
      let feeAmount = 0;
      if (paymentChannel) {
        feeAmount = paymentChannel.feeFlat + Math.floor(validatedData.amount * paymentChannel.feePercentage / 100);
      }

      const paymentId = `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      let qrString = '';
      let providerRef: string | null = null;
      let expiresAt: Date;
      let providerStatus: string | null = null;
      let signatureHash: string | null = null;

      if (sakurupiahConfigured && sakurupiahService) {
        try {
          const sakurupiahResponse = await sakurupiahService.createTransaction({
            method: validatedData.payment_method,
            merchant_ref: paymentId,
            amount: validatedData.amount,
            customer_name: validatedData.customer_name,
            customer_email: validatedData.customer_email,
            customer_phone: validatedData.customer_phone,
            callback_url: validatedData.callback_url,
            return_url: validatedData.return_url,
            expired_time: validatedData.expires_in_minutes,
          });

          providerRef = sakurupiahResponse.data.reference;
          qrString = sakurupiahResponse.data.qr_string || sakurupiahResponse.data.pay_code || sakurupiahResponse.data.pay_url || '';
          expiresAt = new Date(sakurupiahResponse.data.expired_time);
          feeAmount = sakurupiahResponse.data.fee || feeAmount;
          providerStatus = sakurupiahResponse.status;
          signatureHash = sakurupiahService.generateSignature(
            validatedData.payment_method,
            paymentId,
            validatedData.amount
          );

          console.log('[Payment] Created transaction via Sakurupiah', { 
            paymentId, 
            providerRef,
            method: validatedData.payment_method 
          });
        } catch (sakurupiahError) {
          if (sakurupiahError instanceof SakurupiahError) {
            console.error('[Payment] Sakurupiah API error:', sakurupiahError.message);
            return res.status(502).json({
              success: false,
              error: {
                code: "PAYMENT_PROVIDER_ERROR",
                message: `Payment provider error: ${sakurupiahError.message}`,
                provider_code: sakurupiahError.code,
              }
            });
          }
          throw sakurupiahError;
        }
      } else {
        qrString = generateQRISString(paymentId, validatedData.amount);
        expiresAt = new Date(Date.now() + validatedData.expires_in_minutes * 60 * 1000);
        console.log('[Payment] Created sandbox payment (Sakurupiah not configured)', { paymentId });
      }
      
      const netAmount = validatedData.amount - feeAmount;
      
      const payment = await storage.createPayment({
        userId: req.apiKeyUserId!,
        externalId: validatedData.external_id,
        amount: validatedData.amount,
        description: validatedData.description || null,
        customerName: validatedData.customer_name || null,
        customerEmail: validatedData.customer_email || null,
        status: "pending",
        qrString: qrString,
        expiresAt: expiresAt.toISOString(),
        paymentMethod: validatedData.payment_method,
        providerRef: providerRef,
        providerStatus: providerStatus,
        signatureHash: signatureHash,
        idempotencyKey: validatedData.idempotency_key || null,
        callbackUrl: validatedData.callback_url || null,
        feeAmount: feeAmount,
        netAmount: netAmount,
      });

      res.status(201).json({
        success: true,
        data: {
          id: payment._id,
          external_id: payment.externalId,
          amount: payment.amount,
          fee_amount: payment.feeAmount,
          net_amount: payment.netAmount,
          description: payment.description,
          customer_name: payment.customerName,
          customer_email: payment.customerEmail,
          status: payment.status,
          payment_method: payment.paymentMethod,
          qr_string: payment.qrString,
          provider_ref: payment.providerRef,
          expires_at: payment.expiresAt,
          created_at: payment.createdAt,
          sandbox_mode: !sakurupiahConfigured,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request body",
            details: error.errors
          }
        });
      }
      console.error("Create payment error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error"
        }
      });
    }
  });

  app.get("/api/v1/payments", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
    try {
      const limit = req.query.limit ? Math.min(parseInt(req.query.limit as string), 100) : 20;
      const status = req.query.status as string | undefined;
      
      let payments = await storage.getPayments(req.apiKeyUserId!, limit);
      
      if (status) {
        payments = payments.filter(p => p.status === status);
      }

      res.json({
        success: true,
        data: payments.map(payment => ({
          id: payment._id,
          external_id: payment.externalId,
          amount: payment.amount,
          description: payment.description,
          customer_name: payment.customerName,
          customer_email: payment.customerEmail,
          status: payment.status,
          qr_string: payment.qrString,
          expires_at: payment.expiresAt,
          paid_at: payment.paidAt || null,
          created_at: payment.createdAt,
        })),
        meta: {
          count: payments.length,
          limit: limit,
        }
      });
    } catch (error) {
      console.error("List payments error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error"
        }
      });
    }
  });

  app.get("/api/v1/payments/:id", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
    try {
      let payment = await storage.getPaymentById(req.params.id);
      
      if (!payment) {
        payment = await storage.getPaymentByExternalId(req.params.id);
      }
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PAYMENT_NOT_FOUND",
            message: "Payment not found"
          }
        });
      }

      if (payment.userId !== req.apiKeyUserId) {
        return res.status(403).json({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You don't have permission to access this payment"
          }
        });
      }

      res.json({
        success: true,
        data: {
          id: payment._id,
          external_id: payment.externalId,
          amount: payment.amount,
          description: payment.description,
          customer_name: payment.customerName,
          customer_email: payment.customerEmail,
          status: payment.status,
          qr_string: payment.qrString,
          expires_at: payment.expiresAt,
          paid_at: payment.paidAt || null,
          created_at: payment.createdAt,
        }
      });
    } catch (error) {
      console.error("Get payment error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error"
        }
      });
    }
  });

  const simulatePaymentSchema = z.object({
    status: z.enum(["paid", "expired", "cancelled"]),
  });

  app.post("/api/v1/payments/:id/simulate", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
    try {
      const validatedData = simulatePaymentSchema.parse(req.body);
      
      let payment = await storage.getPaymentById(req.params.id);
      
      if (!payment) {
        payment = await storage.getPaymentByExternalId(req.params.id);
      }
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PAYMENT_NOT_FOUND",
            message: "Payment not found"
          }
        });
      }

      if (payment.userId !== req.apiKeyUserId) {
        return res.status(403).json({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You don't have permission to access this payment"
          }
        });
      }

      if (payment.status !== "pending") {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_STATUS",
            message: `Cannot simulate payment. Current status is '${payment.status}'. Only pending payments can be simulated.`
          }
        });
      }

      const updates: any = {
        status: validatedData.status,
      };

      if (validatedData.status === "paid") {
        updates.paidAt = new Date().toISOString();
      }

      const updatedPayment = await storage.updatePayment(payment._id, updates);

      res.json({
        success: true,
        data: {
          id: updatedPayment!._id,
          external_id: updatedPayment!.externalId,
          amount: updatedPayment!.amount,
          description: updatedPayment!.description,
          customer_name: updatedPayment!.customerName,
          customer_email: updatedPayment!.customerEmail,
          status: updatedPayment!.status,
          qr_string: updatedPayment!.qrString,
          expires_at: updatedPayment!.expiresAt,
          paid_at: updatedPayment!.paidAt || null,
          created_at: updatedPayment!.createdAt,
        },
        message: `Payment status updated to '${validatedData.status}'`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request body",
            details: error.errors
          }
        });
      }
      console.error("Simulate payment error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error"
        }
      });
    }
  });

  app.get("/api/v1/payments/:id/status", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
    try {
      let payment = await storage.getPaymentById(req.params.id);
      
      if (!payment) {
        payment = await storage.getPaymentByExternalId(req.params.id);
      }
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PAYMENT_NOT_FOUND",
            message: "Payment not found"
          }
        });
      }

      if (payment.userId !== req.apiKeyUserId) {
        return res.status(403).json({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You don't have permission to access this payment"
          }
        });
      }

      let currentStatus = payment.status;
      let paidAt = payment.paidAt;
      let providerStatus = payment.providerStatus;

      if (sakurupiahConfigured && sakurupiahService && payment.providerRef && payment.status === "pending") {
        try {
          const statusResponse = await sakurupiahService.checkTransactionStatus(payment.providerRef);
          providerStatus = statusResponse.data.status;
          
          const statusMapping: Record<string, string> = {
            'PAID': 'paid',
            'SUCCESS': 'paid',
            'EXPIRED': 'expired',
            'FAILED': 'failed',
            'CANCELLED': 'cancelled',
            'PENDING': 'pending',
          };
          
          const mappedStatus = statusMapping[statusResponse.data.status.toUpperCase()] || payment.status;
          
          if (mappedStatus !== payment.status) {
            const updates: any = { 
              status: mappedStatus,
              providerStatus: statusResponse.data.status,
            };
            if (mappedStatus === 'paid' && statusResponse.data.paid_at) {
              updates.paidAt = statusResponse.data.paid_at;
              paidAt = statusResponse.data.paid_at;
            }
            await storage.updatePayment(payment._id, updates);
            currentStatus = mappedStatus;
            console.log('[Payment] Status updated from Sakurupiah', { 
              paymentId: payment._id, 
              oldStatus: payment.status, 
              newStatus: mappedStatus 
            });
          }
        } catch (sakurupiahError) {
          console.error('[Payment] Failed to check status from Sakurupiah:', sakurupiahError);
        }
      } else {
        const isExpired = payment.status === "pending" && new Date() > new Date(payment.expiresAt);
        currentStatus = isExpired ? "expired" : payment.status;

        if (isExpired && payment.status === "pending") {
          await storage.updatePayment(payment._id, { status: "expired" });
        }
      }

      res.json({
        success: true,
        data: {
          id: payment._id,
          external_id: payment.externalId,
          status: currentStatus,
          provider_status: providerStatus,
          amount: payment.amount,
          fee_amount: payment.feeAmount,
          net_amount: payment.netAmount,
          paid_at: paidAt || null,
        }
      });
    } catch (error) {
      console.error("Get payment status error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error"
        }
      });
    }
  });

  // ==========================================
  // Webhook Endpoint - Sakurupiah Callbacks
  // ==========================================

  app.post("/api/v1/webhooks/sakurupiah", webhookRateLimiter, async (req: Request, res: Response) => {
    try {
      const signature = req.headers['x-signature'] as string || req.headers['x-sakurupiah-signature'] as string;
      const rawBody = JSON.stringify(req.body);

      await storage.createWebhookLog({
        paymentId: req.body?.reference || 'unknown',
        eventType: req.body?.status || 'unknown',
        payload: rawBody,
        signature: signature || '',
        verified: 0,
        createdAt: new Date().toISOString(),
      });

      if (!sakurupiahConfigured || !sakurupiahService) {
        console.warn('[Webhook] Sakurupiah not configured, processing webhook in sandbox mode');
      }

      let isSignatureValid = true;
      if (sakurupiahConfigured && sakurupiahService && signature) {
        isSignatureValid = sakurupiahService.verifyWebhookSignature(rawBody, signature);
        if (!isSignatureValid) {
          console.warn('[Webhook] Invalid signature received');
          return res.status(401).json({
            success: false,
            error: {
              code: "INVALID_SIGNATURE",
              message: "Webhook signature verification failed"
            }
          });
        }
      }

      const { reference, merchant_ref, status, amount, paid_at } = req.body;

      if (!reference && !merchant_ref) {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PAYLOAD",
            message: "Missing reference or merchant_ref in webhook payload"
          }
        });
      }

      const payments = await storage.getPayments('', 1000);
      let payment = payments.find(p => p.providerRef === reference);
      
      if (!payment && merchant_ref) {
        payment = payments.find(p => p.externalId === merchant_ref || p._id.includes(merchant_ref));
      }

      if (!payment) {
        console.warn('[Webhook] Payment not found for reference:', reference);
        return res.status(404).json({
          success: false,
          error: {
            code: "PAYMENT_NOT_FOUND",
            message: "Payment not found for this webhook"
          }
        });
      }

      const statusMapping: Record<string, string> = {
        'PAID': 'paid',
        'SUCCESS': 'paid',
        'EXPIRED': 'expired',
        'FAILED': 'failed',
        'CANCELLED': 'cancelled',
        'PENDING': 'pending',
      };

      const mappedStatus = statusMapping[status?.toUpperCase()] || status?.toLowerCase() || payment.status;
      
      const updates: any = {
        status: mappedStatus,
        providerStatus: status,
      };

      if (mappedStatus === 'paid' && paid_at) {
        updates.paidAt = paid_at;
      } else if (mappedStatus === 'paid' && !payment.paidAt) {
        updates.paidAt = new Date().toISOString();
      }

      await storage.updatePayment(payment._id, updates);

      await storage.createWebhookLog({
        paymentId: payment._id,
        eventType: `payment.${mappedStatus}`,
        payload: rawBody,
        signature: signature || '',
        verified: isSignatureValid ? 1 : 0,
        createdAt: new Date().toISOString(),
      });

      console.log('[Webhook] Payment status updated', { 
        paymentId: payment._id, 
        oldStatus: payment.status, 
        newStatus: mappedStatus,
        reference 
      });

      res.status(200).json({
        success: true,
        message: "Webhook processed successfully"
      });
    } catch (error) {
      console.error("[Webhook] Error processing webhook:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "WEBHOOK_PROCESSING_ERROR",
          message: "Failed to process webhook"
        }
      });
    }
  });

  // ==========================================
  // Payment Channels Endpoint
  // ==========================================

  app.get("/api/v1/payment-channels", apiV1RateLimiter, async (req: Request, res: Response) => {
    try {
      const channels = await storage.getPaymentChannels();
      
      const activeChannels = channels.filter(c => c.isActive === 1);

      res.json({
        success: true,
        data: activeChannels.map(channel => ({
          code: channel.code,
          name: channel.name,
          type: channel.type,
          fee_percentage: channel.feePercentage,
          fee_flat: channel.feeFlat,
          min_amount: channel.minAmount,
          max_amount: channel.maxAmount,
          icon_url: channel.iconUrl,
        })),
        meta: {
          count: activeChannels.length,
          sandbox_mode: !sakurupiahConfigured,
        }
      });
    } catch (error) {
      console.error("Get payment channels error:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error"
        }
      });
    }
  });

  return httpServer;
}
