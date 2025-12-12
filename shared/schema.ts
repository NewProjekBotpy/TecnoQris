import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string().default("Merchant"),
  balance: z.number().default(0),
  avatar: z.string().nullable().optional(),
});

export const transactionSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  transactionId: z.string(),
  type: z.string(),
  amount: z.number(),
  status: z.string().default("pending"),
  customer: z.string(),
  method: z.string(),
  createdAt: z.string(),
});

export const walletSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: z.string(),
  accountNumber: z.string().nullable().optional(),
  bankName: z.string().nullable().optional(),
  isDefault: z.number().default(0),
  balance: z.number().default(0),
  createdAt: z.string(),
});

export const qrCodeSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  amount: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  qrData: z.string(),
  isActive: z.number().default(1),
  createdAt: z.string(),
});

export const apiKeySchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  key: z.string(),
  mode: z.string().default("live"),
  isActive: z.number().default(1),
  createdAt: z.string(),
  lastUsed: z.string().nullable().optional(),
  requestCount: z.number().default(0),
});

export const paymentSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  externalId: z.string(),
  amount: z.number(),
  description: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
  customerEmail: z.string().nullable().optional(),
  status: z.string().default("pending"),
  qrString: z.string(),
  expiresAt: z.string(),
  paidAt: z.string().nullable().optional(),
  createdAt: z.string(),
  paymentMethod: z.string(),
  providerRef: z.string().nullable().optional(),
  providerStatus: z.string().nullable().optional(),
  signatureHash: z.string().nullable().optional(),
  idempotencyKey: z.string().nullable().optional(),
  callbackUrl: z.string().nullable().optional(),
  feeAmount: z.number().default(0),
  netAmount: z.number().nullable().optional(),
});

export const webhookLogSchema = z.object({
  _id: z.string(),
  paymentId: z.string(),
  eventType: z.string(),
  payload: z.string(),
  signature: z.string(),
  verified: z.number(),
  processedAt: z.string().nullable().optional(),
  createdAt: z.string(),
});

export const paymentChannelSchema = z.object({
  _id: z.string(),
  code: z.string(),
  name: z.string(),
  type: z.string(),
  isActive: z.number().default(1),
  feePercentage: z.number().default(0),
  feeFlat: z.number().default(0),
  minAmount: z.number().default(1000),
  maxAmount: z.number().default(100000000),
  iconUrl: z.string().nullable().optional(),
});

export const insertUserSchema = userSchema.omit({ _id: true });
export const insertTransactionSchema = transactionSchema.omit({ _id: true });
export const insertWalletSchema = walletSchema.omit({ _id: true });
export const insertQrCodeSchema = qrCodeSchema.omit({ _id: true });
export const insertApiKeySchema = apiKeySchema.omit({ _id: true, lastUsed: true, requestCount: true });
export const insertPaymentSchema = paymentSchema.omit({ _id: true, paidAt: true, createdAt: true });
export const updatePaymentSchema = paymentSchema.omit({ _id: true, createdAt: true }).partial();
export const insertWebhookLogSchema = webhookLogSchema.omit({ _id: true, processedAt: true });
export const updateWebhookLogSchema = webhookLogSchema.omit({ _id: true, createdAt: true }).partial();
export const insertPaymentChannelSchema = paymentChannelSchema.omit({ _id: true });
export const updatePaymentChannelSchema = paymentChannelSchema.omit({ _id: true }).partial();

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Transaction = z.infer<typeof transactionSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Wallet = z.infer<typeof walletSchema>;
export type InsertWallet = z.infer<typeof insertWalletSchema>;

export type QrCode = z.infer<typeof qrCodeSchema>;
export type InsertQrCode = z.infer<typeof insertQrCodeSchema>;

export type ApiKey = z.infer<typeof apiKeySchema>;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;

export type Payment = z.infer<typeof paymentSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type UpdatePayment = z.infer<typeof updatePaymentSchema>;

export type WebhookLog = z.infer<typeof webhookLogSchema>;
export type InsertWebhookLog = z.infer<typeof insertWebhookLogSchema>;
export type UpdateWebhookLog = z.infer<typeof updateWebhookLogSchema>;

export type PaymentChannel = z.infer<typeof paymentChannelSchema>;
export type InsertPaymentChannel = z.infer<typeof insertPaymentChannelSchema>;
export type UpdatePaymentChannel = z.infer<typeof updatePaymentChannelSchema>;
