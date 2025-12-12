import crypto from "crypto";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  transactions,
  wallets,
  qrCodes,
  apiKeys,
  payments,
  webhookLogs,
  paymentChannels,
  type User,
  type InsertUser,
  type Transaction,
  type InsertTransaction,
  type Wallet,
  type InsertWallet,
  type QrCode,
  type InsertQrCode,
  type ApiKey,
  type InsertApiKey,
  type Payment,
  type InsertPayment,
  type UpdatePayment,
  type WebhookLog,
  type InsertWebhookLog,
  type UpdateWebhookLog,
  type PaymentChannel,
  type InsertPaymentChannel,
  type UpdatePaymentChannel,
} from "../shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  getTransactions(userId: string, limit?: number): Promise<Transaction[]>;
  getTransactionById(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  createTransactionsBatch(transactions: InsertTransaction[]): Promise<Transaction[]>;
  updateTransaction(id: string, updates: Partial<InsertTransaction>): Promise<Transaction | undefined>;

  getWallets(userId: string): Promise<Wallet[]>;
  getWalletById(id: string): Promise<Wallet | undefined>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  updateWallet(id: string, updates: Partial<InsertWallet>): Promise<Wallet | undefined>;
  deleteWallet(id: string): Promise<void>;

  getQrCodes(userId: string): Promise<QrCode[]>;
  getQrCodeById(id: string): Promise<QrCode | undefined>;
  createQrCode(qrCode: InsertQrCode): Promise<QrCode>;
  updateQrCode(id: string, updates: Partial<InsertQrCode>): Promise<QrCode | undefined>;
  deleteQrCode(id: string): Promise<void>;

  getApiKeys(userId: string): Promise<ApiKey[]>;
  getApiKeyByValue(key: string): Promise<ApiKey | undefined>;
  createOrResetApiKey(userId: string, mode: "sandbox" | "live", newKey: string): Promise<ApiKey>;
  createInitialApiKeys(userId: string): Promise<ApiKey[]>;
  updateApiKeyStatus(id: string, isActive: boolean): Promise<ApiKey | undefined>;
  updateApiKeyLastUsed(id: string): Promise<void>;
  incrementApiKeyUsage(id: string): Promise<void>;

  getPayments(userId: string, limit?: number): Promise<Payment[]>;
  getPaymentById(id: string): Promise<Payment | undefined>;
  getPaymentByExternalId(externalId: string): Promise<Payment | undefined>;
  getPaymentByIdempotencyKey(key: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, updates: UpdatePayment): Promise<Payment | undefined>;

  getWebhookLogs(paymentId: string): Promise<WebhookLog[]>;
  createWebhookLog(log: InsertWebhookLog): Promise<WebhookLog>;
  updateWebhookLog(id: string, updates: UpdateWebhookLog): Promise<WebhookLog | undefined>;

  getPaymentChannels(): Promise<PaymentChannel[]>;
  getPaymentChannelByCode(code: string): Promise<PaymentChannel | undefined>;
  createPaymentChannel(channel: InsertPaymentChannel): Promise<PaymentChannel>;
  updatePaymentChannel(id: string, updates: UpdatePaymentChannel): Promise<PaymentChannel | undefined>;
  seedPaymentChannels(): Promise<void>;

  getRevenueStats(userId: string, startDate?: Date, endDate?: Date): Promise<{
    total: number;
    success: number;
    pending: number;
    failed: number;
  }>;
  getTransactionStats(userId: string): Promise<{
    total: number;
    success: number;
    pending: number;
    failed: number;
  }>;
}

export class DrizzleStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      ...insertUser,
      role: insertUser.role || "Merchant",
      balance: insertUser.balance || 0,
      avatar: insertUser.avatar || null,
    }).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getTransactions(userId: string, limit: number = 100): Promise<Transaction[]> {
    return db.select().from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit);
  }

  async getTransactionById(id: string): Promise<Transaction | undefined> {
    const result = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
    return result[0];
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values({
      ...transaction,
      status: transaction.status || "pending",
    }).returning();
    return result[0];
  }

  async createTransactionsBatch(transactionsList: InsertTransaction[]): Promise<Transaction[]> {
    const prepared = transactionsList.map(tx => ({
      ...tx,
      status: tx.status || "pending",
    }));
    return db.insert(transactions).values(prepared).returning();
  }

  async updateTransaction(id: string, updates: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    const result = await db.update(transactions).set(updates).where(eq(transactions.id, id)).returning();
    return result[0];
  }

  async getWallets(userId: string): Promise<Wallet[]> {
    return db.select().from(wallets)
      .where(eq(wallets.userId, userId))
      .orderBy(desc(wallets.createdAt));
  }

  async getWalletById(id: string): Promise<Wallet | undefined> {
    const result = await db.select().from(wallets).where(eq(wallets.id, id)).limit(1);
    return result[0];
  }

  async createWallet(wallet: InsertWallet): Promise<Wallet> {
    const result = await db.insert(wallets).values({
      ...wallet,
      isDefault: wallet.isDefault ?? false,
      balance: wallet.balance || 0,
    }).returning();
    return result[0];
  }

  async updateWallet(id: string, updates: Partial<InsertWallet>): Promise<Wallet | undefined> {
    const result = await db.update(wallets).set(updates).where(eq(wallets.id, id)).returning();
    return result[0];
  }

  async deleteWallet(id: string): Promise<void> {
    await db.delete(wallets).where(eq(wallets.id, id));
  }

  async getQrCodes(userId: string): Promise<QrCode[]> {
    return db.select().from(qrCodes)
      .where(eq(qrCodes.userId, userId))
      .orderBy(desc(qrCodes.createdAt));
  }

  async getQrCodeById(id: string): Promise<QrCode | undefined> {
    const result = await db.select().from(qrCodes).where(eq(qrCodes.id, id)).limit(1);
    return result[0];
  }

  async createQrCode(qrCode: InsertQrCode): Promise<QrCode> {
    const result = await db.insert(qrCodes).values({
      ...qrCode,
      isActive: qrCode.isActive ?? true,
    }).returning();
    return result[0];
  }

  async updateQrCode(id: string, updates: Partial<InsertQrCode>): Promise<QrCode | undefined> {
    const result = await db.update(qrCodes).set(updates).where(eq(qrCodes.id, id)).returning();
    return result[0];
  }

  async deleteQrCode(id: string): Promise<void> {
    await db.delete(qrCodes).where(eq(qrCodes.id, id));
  }

  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return db.select().from(apiKeys)
      .where(eq(apiKeys.userId, userId))
      .orderBy(desc(apiKeys.createdAt));
  }

  async getApiKeyByValue(key: string): Promise<ApiKey | undefined> {
    const result = await db.select().from(apiKeys).where(eq(apiKeys.key, key)).limit(1);
    return result[0];
  }

  async createOrResetApiKey(userId: string, mode: "sandbox" | "live", newKey: string): Promise<ApiKey> {
    await db.delete(apiKeys).where(and(eq(apiKeys.userId, userId), eq(apiKeys.mode, mode)));
    
    const name = mode === "sandbox" ? "Sandbox Key" : "Live Key";
    const result = await db.insert(apiKeys).values({
      userId,
      name,
      key: newKey,
      mode,
      isActive: true,
    }).returning();
    return result[0];
  }

  async createInitialApiKeys(userId: string): Promise<ApiKey[]> {
    const sandboxKey = 'sk_sandbox_' + crypto.randomBytes(24).toString('hex');
    const liveKey = 'sk_live_' + crypto.randomBytes(24).toString('hex');
    
    return db.insert(apiKeys).values([
      {
        userId,
        name: "Sandbox Key",
        key: sandboxKey,
        mode: "sandbox",
        isActive: true,
      },
      {
        userId,
        name: "Live Key",
        key: liveKey,
        mode: "live",
        isActive: true,
      }
    ]).returning();
  }

  async updateApiKeyStatus(id: string, isActive: boolean): Promise<ApiKey | undefined> {
    const result = await db.update(apiKeys).set({ isActive }).where(eq(apiKeys.id, id)).returning();
    return result[0];
  }

  async updateApiKeyLastUsed(id: string): Promise<void> {
    await db.update(apiKeys).set({ lastUsed: new Date() }).where(eq(apiKeys.id, id));
  }

  async incrementApiKeyUsage(id: string): Promise<void> {
    await db.update(apiKeys)
      .set({ 
        lastUsed: new Date(),
        requestCount: sql`${apiKeys.requestCount} + 1`
      })
      .where(eq(apiKeys.id, id));
  }

  async getPayments(userId: string, limit: number = 100): Promise<Payment[]> {
    return db.select().from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt))
      .limit(limit);
  }

  async getPaymentById(id: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    return result[0];
  }

  async getPaymentByExternalId(externalId: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.externalId, externalId)).limit(1);
    return result[0];
  }

  async getPaymentByIdempotencyKey(key: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.idempotencyKey, key)).limit(1);
    return result[0];
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values({
      ...payment,
      status: payment.status || "pending",
    }).returning();
    return result[0];
  }

  async updatePayment(id: string, updates: UpdatePayment): Promise<Payment | undefined> {
    const result = await db.update(payments).set(updates).where(eq(payments.id, id)).returning();
    return result[0];
  }

  async getWebhookLogs(paymentId: string): Promise<WebhookLog[]> {
    return db.select().from(webhookLogs)
      .where(eq(webhookLogs.paymentId, paymentId))
      .orderBy(desc(webhookLogs.createdAt));
  }

  async createWebhookLog(log: InsertWebhookLog): Promise<WebhookLog> {
    const result = await db.insert(webhookLogs).values(log).returning();
    return result[0];
  }

  async updateWebhookLog(id: string, updates: UpdateWebhookLog): Promise<WebhookLog | undefined> {
    const result = await db.update(webhookLogs).set(updates).where(eq(webhookLogs.id, id)).returning();
    return result[0];
  }

  async getPaymentChannels(): Promise<PaymentChannel[]> {
    return db.select().from(paymentChannels).orderBy(paymentChannels.code);
  }

  async getPaymentChannelByCode(code: string): Promise<PaymentChannel | undefined> {
    const result = await db.select().from(paymentChannels).where(eq(paymentChannels.code, code)).limit(1);
    return result[0];
  }

  async createPaymentChannel(channel: InsertPaymentChannel): Promise<PaymentChannel> {
    const result = await db.insert(paymentChannels).values({
      ...channel,
      isActive: channel.isActive ?? true,
      feePercentage: channel.feePercentage ?? 0,
      feeFlat: channel.feeFlat ?? 0,
      minAmount: channel.minAmount ?? 1000,
      maxAmount: channel.maxAmount ?? 100000000,
      iconUrl: channel.iconUrl || null,
    }).returning();
    return result[0];
  }

  async updatePaymentChannel(id: string, updates: UpdatePaymentChannel): Promise<PaymentChannel | undefined> {
    const result = await db.update(paymentChannels).set(updates).where(eq(paymentChannels.id, id)).returning();
    return result[0];
  }

  async seedPaymentChannels(): Promise<void> {
    const defaultChannels: InsertPaymentChannel[] = [
      { code: 'QRIS', name: 'QRIS Payment', type: 'qris', isActive: true, feePercentage: 0.7, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
      { code: 'BCAVA', name: 'BCA Virtual Account', type: 'va', isActive: true, feePercentage: 0, feeFlat: 4000, minAmount: 10000, maxAmount: 100000000 },
      { code: 'BRIVA', name: 'BRI Virtual Account', type: 'va', isActive: true, feePercentage: 0, feeFlat: 4000, minAmount: 10000, maxAmount: 100000000 },
      { code: 'BNIVA', name: 'BNI Virtual Account', type: 'va', isActive: true, feePercentage: 0, feeFlat: 4000, minAmount: 10000, maxAmount: 100000000 },
      { code: 'GOPAY', name: 'GoPay', type: 'ewallet', isActive: true, feePercentage: 2, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
      { code: 'DANA', name: 'DANA', type: 'ewallet', isActive: true, feePercentage: 1.5, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
      { code: 'OVO', name: 'OVO', type: 'ewallet', isActive: true, feePercentage: 2, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
    ];

    for (const channel of defaultChannels) {
      const existing = await this.getPaymentChannelByCode(channel.code);
      if (!existing) {
        await this.createPaymentChannel(channel);
      }
    }
  }

  async getRevenueStats(userId: string, startDate?: Date, endDate?: Date): Promise<{
    total: number;
    success: number;
    pending: number;
    failed: number;
  }> {
    const conditions = [eq(transactions.userId, userId)];
    
    if (startDate) {
      conditions.push(gte(transactions.createdAt, startDate));
    }
    if (endDate) {
      conditions.push(lte(transactions.createdAt, endDate));
    }

    const txList = await db.select().from(transactions).where(and(...conditions));
    
    let total = 0, success = 0, pending = 0, failed = 0;
    
    for (const tx of txList) {
      total += tx.amount;
      if (tx.status === 'success') success += tx.amount;
      else if (tx.status === 'pending') pending += tx.amount;
      else if (tx.status === 'failed') failed += tx.amount;
    }

    return { total, success, pending, failed };
  }

  async getTransactionStats(userId: string): Promise<{
    total: number;
    success: number;
    pending: number;
    failed: number;
  }> {
    const txList = await db.select().from(transactions).where(eq(transactions.userId, userId));
    
    let total = 0, success = 0, pending = 0, failed = 0;
    
    for (const tx of txList) {
      total++;
      if (tx.status === 'success') success++;
      else if (tx.status === 'pending') pending++;
      else if (tx.status === 'failed') failed++;
    }

    return { total, success, pending, failed };
  }
}

export const storage = new DrizzleStorage();
