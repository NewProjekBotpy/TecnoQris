import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getAstraDb } from "./astradb";
import {
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
  updateApiKeyStatus(id: string, isActive: number): Promise<ApiKey | undefined>;
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

export class AstraStorage implements IStorage {
  private get db() {
    return getAstraDb();
  }

  private get users() {
    return this.db.collection<User>('users');
  }

  private get transactions() {
    return this.db.collection<Transaction>('transactions');
  }

  private get wallets() {
    return this.db.collection<Wallet>('wallets');
  }

  private get qrCodes() {
    return this.db.collection<QrCode>('qr_codes');
  }

  private get apiKeys() {
    return this.db.collection<ApiKey>('api_keys');
  }

  private get payments() {
    return this.db.collection<Payment>('payments');
  }

  private get webhookLogs() {
    return this.db.collection<WebhookLog>('webhook_logs');
  }

  private get paymentChannels() {
    return this.db.collection<PaymentChannel>('payment_channels');
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.users.findOne({ _id: id });
    return result || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.users.findOne({ username });
    return result || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      _id: uuidv4(),
      ...insertUser,
      role: insertUser.role || "Merchant",
      balance: insertUser.balance || 0,
      avatar: insertUser.avatar || null,
    };
    await this.users.insertOne(user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    await this.users.updateOne({ _id: id }, { $set: updates });
    return this.getUser(id);
  }

  async getTransactions(userId: string, limit: number = 100): Promise<Transaction[]> {
    const cursor = this.transactions.find({ userId }, { limit, sort: { createdAt: -1 } });
    return cursor.toArray();
  }

  async getTransactionById(id: string): Promise<Transaction | undefined> {
    const result = await this.transactions.findOne({ _id: id });
    return result || undefined;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const newTransaction: Transaction = {
      _id: uuidv4(),
      ...transaction,
      status: transaction.status || "pending",
      createdAt: transaction.createdAt || new Date().toISOString(),
    };
    await this.transactions.insertOne(newTransaction);
    return newTransaction;
  }

  async updateTransaction(id: string, updates: Partial<InsertTransaction>): Promise<Transaction | undefined> {
    await this.transactions.updateOne({ _id: id }, { $set: updates });
    return this.getTransactionById(id);
  }

  async getWallets(userId: string): Promise<Wallet[]> {
    const cursor = this.wallets.find({ userId }, { sort: { createdAt: -1 } });
    return cursor.toArray();
  }

  async getWalletById(id: string): Promise<Wallet | undefined> {
    const result = await this.wallets.findOne({ _id: id });
    return result || undefined;
  }

  async createWallet(wallet: InsertWallet): Promise<Wallet> {
    const newWallet: Wallet = {
      _id: uuidv4(),
      ...wallet,
      isDefault: wallet.isDefault || 0,
      balance: wallet.balance || 0,
      createdAt: wallet.createdAt || new Date().toISOString(),
    };
    await this.wallets.insertOne(newWallet);
    return newWallet;
  }

  async updateWallet(id: string, updates: Partial<InsertWallet>): Promise<Wallet | undefined> {
    await this.wallets.updateOne({ _id: id }, { $set: updates });
    return this.getWalletById(id);
  }

  async deleteWallet(id: string): Promise<void> {
    await this.wallets.deleteOne({ _id: id });
  }

  async getQrCodes(userId: string): Promise<QrCode[]> {
    const cursor = this.qrCodes.find({ userId }, { sort: { createdAt: -1 } });
    return cursor.toArray();
  }

  async getQrCodeById(id: string): Promise<QrCode | undefined> {
    const result = await this.qrCodes.findOne({ _id: id });
    return result || undefined;
  }

  async createQrCode(qrCode: InsertQrCode): Promise<QrCode> {
    const newQrCode: QrCode = {
      _id: uuidv4(),
      ...qrCode,
      isActive: qrCode.isActive ?? 1,
      createdAt: qrCode.createdAt || new Date().toISOString(),
    };
    await this.qrCodes.insertOne(newQrCode);
    return newQrCode;
  }

  async updateQrCode(id: string, updates: Partial<InsertQrCode>): Promise<QrCode | undefined> {
    await this.qrCodes.updateOne({ _id: id }, { $set: updates });
    return this.getQrCodeById(id);
  }

  async deleteQrCode(id: string): Promise<void> {
    await this.qrCodes.deleteOne({ _id: id });
  }

  async getApiKeys(userId: string): Promise<ApiKey[]> {
    const cursor = this.apiKeys.find({ userId }, { sort: { createdAt: -1 } });
    return cursor.toArray();
  }

  async createOrResetApiKey(userId: string, mode: "sandbox" | "live", newKey: string): Promise<ApiKey> {
    await this.apiKeys.deleteMany({ userId, mode });
    const name = mode === "sandbox" ? "Sandbox Key" : "Live Key";
    const apiKey: ApiKey = {
      _id: uuidv4(),
      userId,
      name,
      key: newKey,
      mode,
      isActive: 1,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      requestCount: 0,
    };
    await this.apiKeys.insertOne(apiKey);
    return apiKey;
  }

  async createInitialApiKeys(userId: string): Promise<ApiKey[]> {
    const sandboxKey = 'sk_sandbox_' + crypto.randomBytes(24).toString('hex');
    const liveKey = 'sk_live_' + crypto.randomBytes(24).toString('hex');
    
    const keys: ApiKey[] = [
      {
        _id: uuidv4(),
        userId,
        name: "Sandbox Key",
        key: sandboxKey,
        mode: "sandbox",
        isActive: 1,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        requestCount: 0,
      },
      {
        _id: uuidv4(),
        userId,
        name: "Live Key",
        key: liveKey,
        mode: "live",
        isActive: 1,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        requestCount: 0,
      }
    ];
    
    await this.apiKeys.insertMany(keys);
    return keys;
  }

  async updateApiKeyStatus(id: string, isActive: number): Promise<ApiKey | undefined> {
    await this.apiKeys.updateOne({ _id: id }, { $set: { isActive } });
    const result = await this.apiKeys.findOne({ _id: id });
    return result || undefined;
  }

  async updateApiKeyLastUsed(id: string): Promise<void> {
    await this.apiKeys.updateOne({ _id: id }, { $set: { lastUsed: new Date().toISOString() } });
  }

  async getApiKeyByValue(key: string): Promise<ApiKey | undefined> {
    const result = await this.apiKeys.findOne({ key });
    return result || undefined;
  }

  async incrementApiKeyUsage(id: string): Promise<void> {
    const apiKey = await this.apiKeys.findOne({ _id: id });
    if (apiKey) {
      await this.apiKeys.updateOne({ _id: id }, { 
        $set: { 
          lastUsed: new Date().toISOString(),
          requestCount: (apiKey.requestCount || 0) + 1
        }
      });
    }
  }

  async getPayments(userId: string, limit: number = 100): Promise<Payment[]> {
    const cursor = this.payments.find({ userId }, { limit, sort: { createdAt: -1 } });
    return cursor.toArray();
  }

  async getPaymentById(id: string): Promise<Payment | undefined> {
    const result = await this.payments.findOne({ _id: id });
    return result || undefined;
  }

  async getPaymentByExternalId(externalId: string): Promise<Payment | undefined> {
    const result = await this.payments.findOne({ externalId });
    return result || undefined;
  }

  async getPaymentByIdempotencyKey(key: string): Promise<Payment | undefined> {
    const result = await this.payments.findOne({ idempotencyKey: key });
    return result || undefined;
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const newPayment: Payment = {
      _id: uuidv4(),
      ...payment,
      status: payment.status || "pending",
      createdAt: new Date().toISOString(),
      paidAt: null,
    };
    await this.payments.insertOne(newPayment);
    return newPayment;
  }

  async updatePayment(id: string, updates: UpdatePayment): Promise<Payment | undefined> {
    await this.payments.updateOne({ _id: id }, { $set: updates });
    return this.getPaymentById(id);
  }

  async getWebhookLogs(paymentId: string): Promise<WebhookLog[]> {
    const cursor = this.webhookLogs.find({ paymentId }, { sort: { createdAt: -1 } });
    return cursor.toArray();
  }

  async createWebhookLog(log: InsertWebhookLog): Promise<WebhookLog> {
    const newLog: WebhookLog = {
      _id: uuidv4(),
      ...log,
      processedAt: null,
      createdAt: log.createdAt || new Date().toISOString(),
    };
    await this.webhookLogs.insertOne(newLog);
    return newLog;
  }

  async updateWebhookLog(id: string, updates: UpdateWebhookLog): Promise<WebhookLog | undefined> {
    await this.webhookLogs.updateOne({ _id: id }, { $set: updates });
    const result = await this.webhookLogs.findOne({ _id: id });
    return result || undefined;
  }

  async getPaymentChannels(): Promise<PaymentChannel[]> {
    const cursor = this.paymentChannels.find({}, { sort: { code: 1 } });
    return cursor.toArray();
  }

  async getPaymentChannelByCode(code: string): Promise<PaymentChannel | undefined> {
    const result = await this.paymentChannels.findOne({ code });
    return result || undefined;
  }

  async createPaymentChannel(channel: InsertPaymentChannel): Promise<PaymentChannel> {
    const newChannel: PaymentChannel = {
      _id: uuidv4(),
      ...channel,
      isActive: channel.isActive ?? 1,
      feePercentage: channel.feePercentage ?? 0,
      feeFlat: channel.feeFlat ?? 0,
      minAmount: channel.minAmount ?? 1000,
      maxAmount: channel.maxAmount ?? 100000000,
      iconUrl: channel.iconUrl || null,
    };
    await this.paymentChannels.insertOne(newChannel);
    return newChannel;
  }

  async updatePaymentChannel(id: string, updates: UpdatePaymentChannel): Promise<PaymentChannel | undefined> {
    await this.paymentChannels.updateOne({ _id: id }, { $set: updates });
    const result = await this.paymentChannels.findOne({ _id: id });
    return result || undefined;
  }

  async seedPaymentChannels(): Promise<void> {
    const defaultChannels: InsertPaymentChannel[] = [
      { code: 'QRIS', name: 'QRIS Payment', type: 'qris', isActive: 1, feePercentage: 0.7, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
      { code: 'BCAVA', name: 'BCA Virtual Account', type: 'va', isActive: 1, feePercentage: 0, feeFlat: 4000, minAmount: 10000, maxAmount: 100000000 },
      { code: 'BRIVA', name: 'BRI Virtual Account', type: 'va', isActive: 1, feePercentage: 0, feeFlat: 4000, minAmount: 10000, maxAmount: 100000000 },
      { code: 'BNIVA', name: 'BNI Virtual Account', type: 'va', isActive: 1, feePercentage: 0, feeFlat: 4000, minAmount: 10000, maxAmount: 100000000 },
      { code: 'GOPAY', name: 'GoPay', type: 'ewallet', isActive: 1, feePercentage: 2, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
      { code: 'DANA', name: 'DANA', type: 'ewallet', isActive: 1, feePercentage: 1.5, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
      { code: 'OVO', name: 'OVO', type: 'ewallet', isActive: 1, feePercentage: 2, feeFlat: 0, minAmount: 1000, maxAmount: 10000000 },
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
    const filter: any = { userId };
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = startDate.toISOString();
      if (endDate) filter.createdAt.$lte = endDate.toISOString();
    }

    const cursor = this.transactions.find(filter);
    const transactions = await cursor.toArray();
    
    let total = 0, success = 0, pending = 0, failed = 0;
    
    for (const tx of transactions) {
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
    const cursor = this.transactions.find({ userId });
    const transactions = await cursor.toArray();
    
    let total = 0, success = 0, pending = 0, failed = 0;
    
    for (const tx of transactions) {
      total++;
      if (tx.status === 'success') success++;
      else if (tx.status === 'pending') pending++;
      else if (tx.status === 'failed') failed++;
    }

    return { total, success, pending, failed };
  }
}

export const storage = new AstraStorage();
