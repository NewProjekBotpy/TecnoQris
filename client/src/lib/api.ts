import { apiRequest } from "./queryClient";
import type { User, Transaction, Wallet, QrCode, ApiKey } from "@shared/schema";

export const api = {
  auth: {
    register: async (data: {
      username: string;
      password: string;
      name: string;
      email: string;
    }, options?: { signal?: AbortSignal }): Promise<User> => {
      const res = await apiRequest("POST", "/api/auth/register", data, { 
        signal: options?.signal,
        timeout: 10000
      });
      return res.json();
    },
    
    login: async (data: { username: string; password: string }, options?: { signal?: AbortSignal }): Promise<User> => {
      const res = await apiRequest("POST", "/api/auth/login", data, {
        signal: options?.signal,
        timeout: 8000
      });
      return res.json();
    },
    
    logout: async (): Promise<void> => {
      await apiRequest("POST", "/api/auth/logout");
    },
    
    getMe: async (): Promise<User | null> => {
      try {
        const res = await apiRequest("GET", "/api/auth/me");
        return res.json();
      } catch (error) {
        return null;
      }
    },
  },
  
  transactions: {
    getAll: async (limit?: number): Promise<Transaction[]> => {
      const url = limit ? `/api/transactions?limit=${limit}` : "/api/transactions";
      const res = await apiRequest("GET", url);
      return res.json();
    },
    
    getById: async (id: string): Promise<Transaction> => {
      const res = await apiRequest("GET", `/api/transactions/${id}`);
      return res.json();
    },
    
    create: async (data: {
      transactionId: string;
      type: string;
      amount: number;
      customer: string;
      method: string;
      status?: string;
    }): Promise<Transaction> => {
      const res = await apiRequest("POST", "/api/transactions", data);
      return res.json();
    },
    
    update: async (id: string, data: Partial<{
      type: string;
      amount: number;
      status: string;
      customer: string;
      method: string;
    }>): Promise<Transaction> => {
      const res = await apiRequest("PUT", `/api/transactions/${id}`, data);
      return res.json();
    },
  },
  
  wallets: {
    getAll: async (): Promise<Wallet[]> => {
      const res = await apiRequest("GET", "/api/wallets");
      return res.json();
    },
    
    getById: async (id: string): Promise<Wallet> => {
      const res = await apiRequest("GET", `/api/wallets/${id}`);
      return res.json();
    },
    
    create: async (data: {
      name: string;
      type: string;
      accountNumber?: string;
      bankName?: string;
      isDefault?: number;
      balance?: number;
    }): Promise<Wallet> => {
      const res = await apiRequest("POST", "/api/wallets", data);
      return res.json();
    },
    
    update: async (id: string, data: Partial<{
      name: string;
      type: string;
      accountNumber: string;
      bankName: string;
      isDefault: number;
      balance: number;
    }>): Promise<Wallet> => {
      const res = await apiRequest("PUT", `/api/wallets/${id}`, data);
      return res.json();
    },
    
    delete: async (id: string): Promise<void> => {
      await apiRequest("DELETE", `/api/wallets/${id}`);
    },
  },
  
  qrCodes: {
    getAll: async (): Promise<QrCode[]> => {
      const res = await apiRequest("GET", "/api/qr-codes");
      return res.json();
    },
    
    getById: async (id: string): Promise<QrCode> => {
      const res = await apiRequest("GET", `/api/qr-codes/${id}`);
      return res.json();
    },
    
    create: async (data: {
      name: string;
      amount?: number;
      description?: string;
      qrData: string;
      isActive?: number;
    }): Promise<QrCode> => {
      const res = await apiRequest("POST", "/api/qr-codes", data);
      return res.json();
    },
    
    update: async (id: string, data: Partial<{
      name: string;
      amount: number;
      description: string;
      qrData: string;
      isActive: number;
    }>): Promise<QrCode> => {
      const res = await apiRequest("PUT", `/api/qr-codes/${id}`, data);
      return res.json();
    },
    
    delete: async (id: string): Promise<void> => {
      await apiRequest("DELETE", `/api/qr-codes/${id}`);
    },
  },
  
  apiKeys: {
    getAll: async (): Promise<ApiKey[]> => {
      const res = await apiRequest("GET", "/api/api-keys");
      return res.json();
    },
    
    resetKey: async (mode: "sandbox" | "live"): Promise<ApiKey> => {
      const res = await apiRequest("POST", "/api/api-keys", { mode });
      return res.json();
    },
    
    updateStatus: async (id: string, isActive: number): Promise<ApiKey> => {
      const res = await apiRequest("PATCH", `/api/api-keys/${id}/status`, { isActive });
      return res.json();
    },
  },
  
  analytics: {
    getRevenue: async (startDate?: string, endDate?: string): Promise<{
      total: number;
      success: number;
      pending: number;
      failed: number;
    }> => {
      let url = "/api/analytics/revenue";
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (params.toString()) url += `?${params.toString()}`;
      
      const res = await apiRequest("GET", url);
      return res.json();
    },
    
    getStats: async (): Promise<{
      total: number;
      success: number;
      pending: number;
      failed: number;
    }> => {
      const res = await apiRequest("GET", "/api/analytics/stats");
      return res.json();
    },
  },
  
};
