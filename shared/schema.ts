import { pgTable, text, integer, boolean, timestamp, real, uuid, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("Merchant"),
  balance: real("balance").notNull().default(0),
  avatar: text("avatar"),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  transactionId: text("transaction_id").notNull(),
  type: text("type").notNull(),
  amount: real("amount").notNull(),
  status: text("status").notNull().default("pending"),
  customer: text("customer").notNull(),
  method: text("method").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const wallets = pgTable("wallets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  accountNumber: text("account_number"),
  bankName: text("bank_name"),
  isDefault: boolean("is_default").notNull().default(false),
  balance: real("balance").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const qrCodes = pgTable("qr_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  amount: real("amount"),
  description: text("description"),
  qrData: text("qr_data").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  key: text("key").notNull().unique(),
  mode: text("mode").notNull().default("live"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastUsed: timestamp("last_used", { withTimezone: true }),
  requestCount: integer("request_count").notNull().default(0),
});

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  externalId: text("external_id").notNull(),
  amount: real("amount").notNull(),
  description: text("description"),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  status: text("status").notNull().default("pending"),
  qrString: text("qr_string").notNull(),
  qrUrl: text("qr_url"),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  paymentMethod: text("payment_method").notNull(),
  providerRef: text("provider_ref"),
  providerStatus: text("provider_status"),
  signatureHash: text("signature_hash"),
  idempotencyKey: text("idempotency_key").unique(),
  callbackUrl: text("callback_url"),
  feeAmount: real("fee_amount").notNull().default(0),
  netAmount: real("net_amount"),
});

export const webhookLogs = pgTable("webhook_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  paymentId: uuid("payment_id").notNull().references(() => payments.id),
  eventType: text("event_type").notNull(),
  payload: text("payload").notNull(),
  signature: text("signature").notNull(),
  verified: boolean("verified").notNull().default(false),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const paymentChannels = pgTable("payment_channels", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  feePercentage: real("fee_percentage").notNull().default(0),
  feeFlat: real("fee_flat").notNull().default(0),
  minAmount: real("min_amount").notNull().default(1000),
  maxAmount: real("max_amount").notNull().default(100000000),
  iconUrl: text("icon_url"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const selectUserSchema = createSelectSchema(users);
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });
export const selectTransactionSchema = createSelectSchema(transactions);
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export const insertWalletSchema = createInsertSchema(wallets).omit({ id: true });
export const selectWalletSchema = createSelectSchema(wallets);
export type Wallet = typeof wallets.$inferSelect;
export type InsertWallet = z.infer<typeof insertWalletSchema>;

export const insertQrCodeSchema = createInsertSchema(qrCodes).omit({ id: true });
export const selectQrCodeSchema = createSelectSchema(qrCodes);
export type QrCode = typeof qrCodes.$inferSelect;
export type InsertQrCode = z.infer<typeof insertQrCodeSchema>;

export const insertApiKeySchema = createInsertSchema(apiKeys).omit({ id: true, lastUsed: true, requestCount: true });
export const selectApiKeySchema = createSelectSchema(apiKeys);
export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;

export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, paidAt: true, createdAt: true });
export const updatePaymentSchema = createInsertSchema(payments).omit({ id: true, createdAt: true }).partial();
export const selectPaymentSchema = createSelectSchema(payments);
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type UpdatePayment = z.infer<typeof updatePaymentSchema>;

export const insertWebhookLogSchema = createInsertSchema(webhookLogs).omit({ id: true, processedAt: true });
export const updateWebhookLogSchema = createInsertSchema(webhookLogs).omit({ id: true, createdAt: true }).partial();
export const selectWebhookLogSchema = createSelectSchema(webhookLogs);
export type WebhookLog = typeof webhookLogs.$inferSelect;
export type InsertWebhookLog = z.infer<typeof insertWebhookLogSchema>;
export type UpdateWebhookLog = z.infer<typeof updateWebhookLogSchema>;

export const insertPaymentChannelSchema = createInsertSchema(paymentChannels).omit({ id: true });
export const updatePaymentChannelSchema = createInsertSchema(paymentChannels).omit({ id: true }).partial();
export const selectPaymentChannelSchema = createSelectSchema(paymentChannels);
export type PaymentChannel = typeof paymentChannels.$inferSelect;
export type InsertPaymentChannel = z.infer<typeof insertPaymentChannelSchema>;
export type UpdatePaymentChannel = z.infer<typeof updatePaymentChannelSchema>;
