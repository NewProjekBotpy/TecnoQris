import express, { type Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import {
  insertUserSchema,
  insertTransactionSchema,
  insertWalletSchema,
  insertQrCodeSchema,
  insertPaymentSchema,
  type ApiKey,
} from "../shared/schema";
import { z } from "zod";

// Lazy load heavy modules - don't import at top level
let bcryptModule: any = null;
let dbModule: any = null;
let storage: any = null;
let sakurupiahService: any = null;
let sakurupiahConfigured = false;
let servicesInitialized = false;

function isDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

async function loadBcrypt() {
  if (!bcryptModule) {
    bcryptModule = await import("bcryptjs");
  }
  return bcryptModule.default || bcryptModule;
}

async function initializeServices(): Promise<boolean> {
  if (servicesInitialized && storage !== null) return true;
  
  if (!isDatabaseConfigured()) {
    console.error('[Init] DATABASE_URL not configured');
    return false;
  }

  // Lazy load db module
  if (!dbModule) {
    dbModule = await import("./db");
  }

  const dbResult = await dbModule.initializeDatabase();
  if (!dbResult.success) {
    console.error('[Init] Failed to initialize database:', dbResult.error);
    return false;
  }

  try {
    const storageModule = await import("../server/storage");
    storage = storageModule.storage;
    console.log('[Init] Database and storage initialized successfully');
  } catch (error: any) {
    console.error('[Init] Failed to initialize storage:', error?.message);
    return false;
  }

  try {
    const sakurupiahModule = await import("../server/sakurupiah");
    sakurupiahService = sakurupiahModule.getSakurupiahService();
    sakurupiahConfigured = true;
    console.log('[Payment] Sakurupiah service initialized successfully');
  } catch (error: any) {
    if (error?.message?.includes('SAKURUPIAH')) {
      console.warn('[Payment] Sakurupiah not configured - running in sandbox mode');
    } else {
      console.error('[Payment] Failed to initialize Sakurupiah service:', error?.message);
    }
    sakurupiahConfigured = false;
  }
  
  servicesInitialized = true;
  return true;
}

function requireDatabase(req: Request, res: Response, next: NextFunction) {
  if (!isDatabaseConfigured()) {
    return res.status(503).json({
      message: "Database not configured",
      error: "DATABASE_URL environment variable is not set. Please configure it in Vercel dashboard under Settings > Environment Variables.",
      code: "DATABASE_NOT_CONFIGURED"
    });
  }
  
  if (dbModule) {
    const initError = dbModule.getInitializationError?.();
    if (initError) {
      return res.status(503).json({
        message: "Database initialization failed",
        error: initError.message,
        code: "DATABASE_INIT_FAILED"
      });
    }
  }
  
  if (!storage) {
    return res.status(503).json({
      message: "Service not ready",
      error: "Database connection is being established. Please try again in a moment.",
      code: "SERVICE_NOT_READY"
    });
  }
  
  next();
}

// Initialize services lazily - don't block cold start
// initializeServices() is called on-demand by routes that need database

const app = express();

const JWT_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "fintech-dashboard-secret-key-2024"
);

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

interface AuthenticatedRequest extends Request {
  userId?: string;
  apiKey?: ApiKey;
  apiKeyUserId?: string;
}

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple ping endpoint - no database required, fast response for health checks
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

async function createToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
  return token;
}

async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (typeof payload.userId === 'string') {
      return { userId: payload.userId, iat: payload.iat, exp: payload.exp };
    }
    return null;
  } catch {
    return null;
  }
}

function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith("auth_token="));
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
  }
  
  return null;
}

async function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  await initializeServices();
  
  if (!isDatabaseConfigured() || !storage) {
    return res.status(503).json({ 
      message: "Service unavailable", 
      error: "Database not configured. Please check DATABASE_URL in Vercel environment variables.",
      code: "DATABASE_NOT_CONFIGURED"
    });
  }
  
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const payload = await verifyToken(token);
  if (!payload || !payload.userId) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  
  req.userId = payload.userId;
  next();
}

async function apiKeyAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  await initializeServices();
  
  if (!isDatabaseConfigured() || !storage) {
    return res.status(503).json({ 
      success: false,
      error: {
        code: "DATABASE_NOT_CONFIGURED",
        message: "Database not configured. Please check DATABASE_URL in Vercel environment variables."
      }
    });
  }
  
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

    if (!apiKey.isActive) {
      return res.status(403).json({ 
        success: false,
        error: {
          code: "INACTIVE_API_KEY",
          message: "This API key has been deactivated."
        }
      });
    }

    await storage.incrementApiKeyUsage(apiKey.id);
    
    req.apiKey = apiKey;
    req.apiKeyUserId = apiKey.userId;
    next();
  } catch (error: any) {
    console.error("API key auth error:", error?.message || error);
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

app.get("/api/health", async (req, res) => {
  await initializeServices();
  
  const sakurupiahStatus = sakurupiahConfigured ? "configured" : "not_configured";
  const dbConfigured = isDatabaseConfigured();
  const initError = dbModule?.getInitializationError?.() || null;
  
  let dbConnection = "unknown";
  if (!dbConfigured) {
    dbConnection = "not_configured: DATABASE_URL not set";
  } else if (initError) {
    dbConnection = `error: ${initError.message}`;
  } else if (storage) {
    try {
      await storage.getPaymentChannels();
      dbConnection = "connected";
    } catch (error: any) {
      dbConnection = `error: ${error.message}`;
    }
  } else {
    dbConnection = "initializing";
  }

  res.json({
    status: dbConfigured && storage ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "unknown",
    vercel: process.env.VERCEL === '1' || !!process.env.VERCEL_ENV,
    services: {
      postgresql: {
        configured: dbConfigured,
        connection: dbConnection,
        error: dbConfigured ? (initError?.message || null) : "DATABASE_URL not set"
      },
      sakurupiah: sakurupiahStatus
    },
    env_check: {
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      SESSION_SECRET: process.env.SESSION_SECRET ? "set" : "missing",
      SAKURUPIAH_API_ID: process.env.SAKURUPIAH_API_ID ? "set" : "missing",
      SAKURUPIAH_API_KEY: process.env.SAKURUPIAH_API_KEY ? "set" : "missing",
    }
  });
});

app.post("/api/auth/register", authRateLimiter, requireDatabase, async (req, res) => {
  try {
    await initializeServices();
    
    const userData = insertUserSchema.parse(req.body);
    
    const existingUser = await storage.getUserByUsername(userData.username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const bcrypt = await loadBcrypt();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword,
    });
    
    const token = await createToken(user.id);
    
    res.setHeader("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=86400`);
    
    const { password, ...userWithoutPassword } = user;
    res.status(201).json({ ...userWithoutPassword, token });
  } catch (error: any) {
    console.error("Registration error:", error?.message || error);
    console.error("Registration error stack:", error?.stack);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    
    if (error?.message?.includes("DATABASE_URL") || error?.message?.includes("database") || error?.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        message: "Database connection error", 
        error: "Unable to connect to database. Please check DATABASE_URL environment variable in Vercel.",
        code: "DATABASE_CONNECTION_ERROR"
      });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV !== 'production' ? error?.message : undefined,
      code: "INTERNAL_ERROR"
    });
  }
});

app.post("/api/auth/login", authRateLimiter, requireDatabase, async (req, res) => {
  try {
    await initializeServices();
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const bcrypt = await loadBcrypt();
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = await createToken(user.id);
    
    res.setHeader("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=86400`);
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, token });
  } catch (error: any) {
    console.error("Login error:", error?.message || error);
    
    if (error?.message?.includes("DATABASE_URL") || error?.message?.includes("database") || error?.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        message: "Database connection error", 
        error: "Unable to connect to database. Please check DATABASE_URL environment variable in Vercel.",
        code: "DATABASE_CONNECTION_ERROR"
      });
    }
    
    res.status(500).json({ message: "Internal server error", code: "INTERNAL_ERROR" });
  }
});

app.post("/api/auth/logout", authRateLimiter, (req, res) => {
  res.setHeader("Set-Cookie", `auth_token=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0`);
  res.json({ message: "Logged out successfully" });
});

app.get("/api/auth/me", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await storage.getUser(req.userId!);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/transactions", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
    const transactions = await storage.getTransactions(req.userId!, limit);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/transactions/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const transaction = await storage.getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    
    if (transaction.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/transactions", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const transactionData = insertTransactionSchema.parse({
      ...req.body,
      userId: req.userId,
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

app.put("/api/transactions/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const existingTransaction = await storage.getTransactionById(req.params.id);
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    
    if (existingTransaction.userId !== req.userId) {
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

app.get("/api/wallets", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const wallets = await storage.getWallets(req.userId!);
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/wallets/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const wallet = await storage.getWalletById(req.params.id);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    
    if (wallet.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/wallets", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const walletData = insertWalletSchema.parse({
      ...req.body,
      userId: req.userId,
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

app.put("/api/wallets/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const existingWallet = await storage.getWalletById(req.params.id);
    if (!existingWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    
    if (existingWallet.userId !== req.userId) {
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

app.delete("/api/wallets/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const existingWallet = await storage.getWalletById(req.params.id);
    if (!existingWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    
    if (existingWallet.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    await storage.deleteWallet(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/qr-codes", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const qrCodes = await storage.getQrCodes(req.userId!);
    res.json(qrCodes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/qr-codes/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const qrCode = await storage.getQrCodeById(req.params.id);
    if (!qrCode) {
      return res.status(404).json({ message: "QR code not found" });
    }
    
    if (qrCode.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    res.json(qrCode);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/qr-codes", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const qrCodeData = insertQrCodeSchema.parse({
      ...req.body,
      userId: req.userId,
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

app.put("/api/qr-codes/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const existingQrCode = await storage.getQrCodeById(req.params.id);
    if (!existingQrCode) {
      return res.status(404).json({ message: "QR code not found" });
    }
    
    if (existingQrCode.userId !== req.userId) {
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

app.delete("/api/qr-codes/:id", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const existingQrCode = await storage.getQrCodeById(req.params.id);
    if (!existingQrCode) {
      return res.status(404).json({ message: "QR code not found" });
    }
    
    if (existingQrCode.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    await storage.deleteQrCode(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/api-keys", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const apiKeys = await storage.getApiKeys(req.userId!);
    res.json(apiKeys);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/api-keys", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const { mode } = req.body;
    if (!mode || (mode !== 'sandbox' && mode !== 'live')) {
      return res.status(400).json({ message: "Mode must be 'sandbox' or 'live'" });
    }
    
    const prefix = mode === 'sandbox' ? 'sk_sandbox_' : 'sk_live_';
    const randomKey = prefix + crypto.randomBytes(24).toString('hex');
    const apiKey = await storage.createOrResetApiKey(req.userId!, mode, randomKey);
    res.status(201).json(apiKey);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/api/api-keys/:id/status", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const apiKeys = await storage.getApiKeys(req.userId!);
    
    const apiKey = apiKeys.find((k: any) => k.id === req.params.id);
    if (!apiKey) {
      return res.status(404).json({ message: "API key not found" });
    }
    
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: "isActive must be a boolean" });
    }
    
    const updatedKey = await storage.updateApiKeyStatus(req.params.id, isActive);
    res.json(updatedKey);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/analytics/stats", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const stats = await storage.getTransactionStats(req.userId!);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/analytics/revenue", isAuthenticated as any, async (req: AuthenticatedRequest, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    const revenue = await storage.getRevenueStats(req.userId!, startDate, endDate);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const createPaymentSchema = z.object({
  external_id: z.string().min(1).max(100),
  amount: z.number().int().positive().min(1000).max(100000000),
  payment_method: z.enum(['QRIS', 'BCAVA', 'BRIVA', 'BNIVA', 'GOPAY', 'DANA', 'OVO']).default('QRIS'),
  description: z.string().max(255).optional(),
  customer_name: z.string().max(100).optional(),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().max(20).optional(),
  callback_url: z.string().url().optional(),
  expiry_minutes: z.number().int().positive().min(5).max(1440).default(30),
});

app.post("/api/v1/payments", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = createPaymentSchema.parse(req.body);
    
    const idempotencyKey = req.headers['x-idempotency-key'] as string;
    if (idempotencyKey) {
      const existingPayment = await storage.getPaymentByIdempotencyKey(idempotencyKey);
      if (existingPayment) {
        return res.status(200).json({
          success: true,
          data: {
            id: existingPayment.id,
            external_id: existingPayment.externalId,
            amount: existingPayment.amount,
            description: existingPayment.description,
            customer_name: existingPayment.customerName,
            customer_email: existingPayment.customerEmail,
            status: existingPayment.status,
            payment_method: existingPayment.paymentMethod,
            qr_string: existingPayment.qrString,
            qr_url: existingPayment.qrUrl,
            expires_at: existingPayment.expiresAt,
            created_at: existingPayment.createdAt,
          },
          meta: {
            idempotent: true,
            sandbox_mode: !sakurupiahConfigured,
          }
        });
      }
    }

    const channel = await storage.getPaymentChannelByCode(validatedData.payment_method);
    if (!channel) {
      await storage.seedPaymentChannels();
    }

    const paymentChannel = await storage.getPaymentChannelByCode(validatedData.payment_method);
    const feePercentage = paymentChannel?.feePercentage || 0.7;
    const feeFlat = paymentChannel?.feeFlat || 0;
    const feeAmount = Math.ceil((validatedData.amount * feePercentage / 100) + feeFlat);
    const netAmount = validatedData.amount - feeAmount;

    const expiresAt = new Date(Date.now() + validatedData.expiry_minutes * 60 * 1000);
    
    let qrString = "";
    let qrUrl = "";
    let providerRef = "";

    if (sakurupiahConfigured && sakurupiahService) {
      try {
        const sakurupiahResponse = await sakurupiahService.createTransaction({
          method: validatedData.payment_method,
          merchant_ref: validatedData.external_id,
          amount: validatedData.amount,
          customer_name: validatedData.customer_name,
          customer_email: validatedData.customer_email,
          customer_phone: validatedData.customer_phone,
          expired_time: validatedData.expiry_minutes,
          callback_url: validatedData.callback_url,
        });

        qrString = sakurupiahResponse.data.qr_string || "";
        qrUrl = sakurupiahResponse.data.qr_url || "";
        providerRef = sakurupiahResponse.data.reference || "";
        
        console.log('[Payment] QRIS created via Sakurupiah', { 
          externalId: validatedData.external_id, 
          providerRef 
        });
      } catch (sakurupiahError) {
        console.error('[Payment] Sakurupiah error, falling back to sandbox:', sakurupiahError);
        qrString = generateQRISString(validatedData.external_id, validatedData.amount, validatedData.customer_name);
        qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`;
      }
    } else {
      qrString = generateQRISString(validatedData.external_id, validatedData.amount, validatedData.customer_name);
      qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`;
    }

    const payment = await storage.createPayment({
      userId: req.apiKeyUserId!,
      externalId: validatedData.external_id,
      amount: validatedData.amount,
      status: "pending",
      feeAmount,
      netAmount,
      description: validatedData.description || null,
      customerName: validatedData.customer_name || null,
      customerEmail: validatedData.customer_email || null,
      customerPhone: validatedData.customer_phone || null,
      paymentMethod: validatedData.payment_method,
      qrString,
      qrUrl,
      callbackUrl: validatedData.callback_url || null,
      expiresAt,
      idempotencyKey: idempotencyKey || null,
      providerRef: providerRef || null,
      providerStatus: null,
    });

    res.status(201).json({
      success: true,
      data: {
        id: payment.id,
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
        qr_url: payment.qrUrl,
        expires_at: payment.expiresAt,
        created_at: payment.createdAt,
      },
      meta: {
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
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
    const payments = await storage.getPayments(req.apiKeyUserId!, limit);

    res.json({
      success: true,
      data: payments.map((payment: any) => ({
        id: payment.id,
        external_id: payment.externalId,
        amount: payment.amount,
        fee_amount: payment.feeAmount,
        net_amount: payment.netAmount,
        description: payment.description,
        customer_name: payment.customerName,
        status: payment.status,
        payment_method: payment.paymentMethod,
        expires_at: payment.expiresAt,
        paid_at: payment.paidAt,
        created_at: payment.createdAt,
      })),
      meta: {
        count: payments.length,
        limit,
        sandbox_mode: !sakurupiahConfigured,
      }
    });
  } catch (error) {
    console.error("Get payments error:", error);
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
        id: payment.id,
        external_id: payment.externalId,
        amount: payment.amount,
        fee_amount: payment.feeAmount,
        net_amount: payment.netAmount,
        description: payment.description,
        customer_name: payment.customerName,
        customer_email: payment.customerEmail,
        customer_phone: payment.customerPhone,
        status: payment.status,
        payment_method: payment.paymentMethod,
        qr_string: payment.qrString,
        qr_url: payment.qrUrl,
        expires_at: payment.expiresAt,
        paid_at: payment.paidAt,
        created_at: payment.createdAt,
      },
      meta: {
        sandbox_mode: !sakurupiahConfigured,
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
  status: z.enum(["paid", "expired", "failed"]),
});

app.post("/api/v1/payments/:id/simulate", apiV1RateLimiter, apiKeyAuth as any, async (req: AuthenticatedRequest, res) => {
  try {
    if (req.apiKey?.mode !== "sandbox") {
      return res.status(403).json({
        success: false,
        error: {
          code: "SANDBOX_ONLY",
          message: "Payment simulation is only available in sandbox mode. Use a sandbox API key."
        }
      });
    }

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
      updates.paidAt = new Date();
    }

    const updatedPayment = await storage.updatePayment(payment.id, updates);

    res.json({
      success: true,
      data: {
        id: updatedPayment!.id,
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
            updates.paidAt = new Date(statusResponse.data.paid_at);
            paidAt = new Date(statusResponse.data.paid_at);
          }
          await storage.updatePayment(payment.id, updates);
          currentStatus = mappedStatus;
          console.log('[Payment] Status updated from Sakurupiah', { 
            paymentId: payment.id, 
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
        await storage.updatePayment(payment.id, { status: "expired" });
      }
    }

    res.json({
      success: true,
      data: {
        id: payment.id,
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

app.post("/api/v1/webhooks/sakurupiah", webhookRateLimiter, requireDatabase, async (req: Request, res: Response) => {
  try {
    await initializeServices();
    
    const signature = req.headers['x-signature'] as string || req.headers['x-sakurupiah-signature'] as string;
    const rawBody = JSON.stringify(req.body);

    await storage.createWebhookLog({
      paymentId: req.body?.reference || 'unknown',
      eventType: req.body?.status || 'unknown',
      payload: rawBody,
      signature: signature || '',
      verified: false,
      createdAt: new Date(),
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
    let payment = payments.find((p: any) => p.providerRef === reference);
    
    if (!payment && merchant_ref) {
      payment = payments.find((p: any) => p.externalId === merchant_ref || p.id.includes(merchant_ref));
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
      updates.paidAt = new Date(paid_at);
    } else if (mappedStatus === 'paid' && !payment.paidAt) {
      updates.paidAt = new Date();
    }

    await storage.updatePayment(payment.id, updates);

    await storage.createWebhookLog({
      paymentId: payment.id,
      eventType: `payment.${mappedStatus}`,
      payload: rawBody,
      signature: signature || '',
      verified: isSignatureValid,
      createdAt: new Date(),
    });

    console.log('[Webhook] Payment status updated', { 
      paymentId: payment.id, 
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

app.get("/api/v1/payment-channels", apiV1RateLimiter, requireDatabase, async (req: Request, res: Response) => {
  try {
    await initializeServices();
    const channels = await storage.getPaymentChannels();
    
    const activeChannels = channels.filter((c: any) => c.isActive);

    res.json({
      success: true,
      data: activeChannels.map((channel: any) => ({
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

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default serverless(app);
