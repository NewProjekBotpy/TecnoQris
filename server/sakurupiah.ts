import { createHmac } from 'crypto';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface SakurupiahConfig {
  apiId: string;
  apiKey: string;
  mode: 'sandbox' | 'production';
  baseUrl: string;
}

export interface CreateTransactionRequest {
  method: string;
  merchant_ref: string;
  amount: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  callback_url?: string;
  return_url?: string;
  expired_time?: number;
}

export interface CreateTransactionResponse {
  status: string;
  message: string;
  data: {
    reference: string;
    merchant_ref: string;
    amount: number;
    fee: number;
    total: number;
    pay_code?: string;
    pay_url?: string;
    qr_string?: string;
    qr_url?: string;
    expired_time: string;
  };
}

export interface CheckStatusRequest {
  reference: string;
}

export interface CheckStatusResponse {
  status: string;
  message: string;
  data: {
    status: string;
    reference: string;
    merchant_ref: string;
    amount: number;
    paid_at?: string;
  };
}

export interface PaymentChannel {
  code: string;
  name: string;
  type: string;
  fee_flat: number;
  fee_percent: number;
  min_amount: number;
  max_amount: number;
}

export interface ListPaymentChannelsResponse {
  status: string;
  message: string;
  data: PaymentChannel[];
}

export interface WebhookPayload {
  reference: string;
  merchant_ref: string;
  amount: number;
  status: string;
  paid_at?: string;
  [key: string]: unknown;
}

// ============================================================================
// Custom Errors
// ============================================================================

export class SakurupiahError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly response?: unknown
  ) {
    super(message);
    this.name = 'SakurupiahError';
  }
}

export class SakurupiahConfigError extends SakurupiahError {
  constructor(message: string) {
    super(message, 'CONFIG_ERROR');
    this.name = 'SakurupiahConfigError';
  }
}

export class SakurupiahNetworkError extends SakurupiahError {
  constructor(message: string, public readonly originalError?: Error) {
    super(message, 'NETWORK_ERROR');
    this.name = 'SakurupiahNetworkError';
  }
}

export class SakurupiahTimeoutError extends SakurupiahError {
  constructor(message: string = 'Request timed out') {
    super(message, 'TIMEOUT_ERROR');
    this.name = 'SakurupiahTimeoutError';
  }
}

export class SakurupiahApiError extends SakurupiahError {
  constructor(message: string, statusCode: number, response?: unknown) {
    super(message, 'API_ERROR', statusCode, response);
    this.name = 'SakurupiahApiError';
  }
}

export class SakurupiahSignatureError extends SakurupiahError {
  constructor(message: string = 'Invalid webhook signature') {
    super(message, 'SIGNATURE_ERROR');
    this.name = 'SakurupiahSignatureError';
  }
}

// ============================================================================
// Logger
// ============================================================================

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: unknown;
}

class Logger {
  private prefix = '[Sakurupiah]';

  private formatLog(level: LogEntry['level'], message: string, data?: unknown): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message: `${this.prefix} ${message}`,
      data,
    };
  }

  info(message: string, data?: unknown): void {
    const log = this.formatLog('info', message, data);
    console.log(log.timestamp, log.message, data ? JSON.stringify(data) : '');
  }

  warn(message: string, data?: unknown): void {
    const log = this.formatLog('warn', message, data);
    console.warn(log.timestamp, log.message, data ? JSON.stringify(data) : '');
  }

  error(message: string, data?: unknown): void {
    const log = this.formatLog('error', message, data);
    console.error(log.timestamp, log.message, data ? JSON.stringify(data) : '');
  }

  debug(message: string, data?: unknown): void {
    if (process.env.NODE_ENV === 'development' || process.env.SAKURUPIAH_DEBUG === 'true') {
      const log = this.formatLog('debug', message, data);
      console.debug(log.timestamp, log.message, data ? JSON.stringify(data) : '');
    }
  }
}

// ============================================================================
// Sakurupiah Service
// ============================================================================

export class SakurupiahService {
  private config: SakurupiahConfig;
  private logger: Logger;
  private readonly MAX_RETRIES = 3;
  private readonly REQUEST_TIMEOUT = 30000;
  private readonly RETRY_BASE_DELAY = 1000;

  constructor() {
    this.logger = new Logger();
    this.config = this.loadConfig();
    this.logger.info('Service initialized', { mode: this.config.mode, baseUrl: this.config.baseUrl });
  }

  private loadConfig(): SakurupiahConfig {
    const apiId = process.env.SAKURUPIAH_API_ID;
    const apiKey = process.env.SAKURUPIAH_API_KEY;
    const mode = (process.env.SAKURUPIAH_MODE || 'sandbox') as 'sandbox' | 'production';

    if (!apiId) {
      throw new SakurupiahConfigError('SAKURUPIAH_API_ID environment variable is required');
    }

    if (!apiKey) {
      throw new SakurupiahConfigError('SAKURUPIAH_API_KEY environment variable is required');
    }

    if (mode !== 'sandbox' && mode !== 'production') {
      throw new SakurupiahConfigError('SAKURUPIAH_MODE must be either "sandbox" or "production"');
    }

    const baseUrl = mode === 'production'
      ? 'https://sakurupiah.id/api/'
      : 'https://sakurupiah.id/api-sanbox/';

    return { apiId, apiKey, mode, baseUrl };
  }

  getConfig(): Readonly<Omit<SakurupiahConfig, 'apiKey'>> {
    return {
      apiId: this.config.apiId,
      mode: this.config.mode,
      baseUrl: this.config.baseUrl,
    };
  }

  generateSignature(method: string, merchantRef: string, amount: number): string {
    const data = `${this.config.apiId}${method}${merchantRef}${amount}`;
    const signature = createHmac('sha256', this.config.apiKey)
      .update(data)
      .digest('hex');
    
    this.logger.debug('Generated signature', { 
      method, 
      merchantRef, 
      amount,
      signaturePreview: signature.substring(0, 16) + '...'
    });
    
    return signature;
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!payload || !signature) {
      this.logger.warn('Missing payload or signature for verification');
      return false;
    }

    try {
      const expectedSignature = createHmac('sha256', this.config.apiKey)
        .update(payload)
        .digest('hex');

      const isValid = expectedSignature === signature;
      
      this.logger.debug('Webhook signature verification', { 
        isValid,
        receivedSignaturePreview: signature.substring(0, 16) + '...',
        expectedSignaturePreview: expectedSignature.substring(0, 16) + '...'
      });

      return isValid;
    } catch (error) {
      this.logger.error('Error verifying webhook signature', { error });
      return false;
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest<T>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

      try {
        this.logger.info(`Request attempt ${attempt}/${this.MAX_RETRIES}`, {
          requestId,
          endpoint,
          attempt,
        });

        this.logger.debug('Request details', {
          requestId,
          url,
          body: { ...body, signature: body.signature ? '[REDACTED]' : undefined },
        });

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'SakurupiahService/1.0',
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const responseData = await response.json();

        this.logger.debug('Response received', {
          requestId,
          status: response.status,
          data: responseData,
        });

        if (!response.ok) {
          throw new SakurupiahApiError(
            responseData.message || `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            responseData
          );
        }

        if (responseData.status === 'error' || responseData.status === 'failed') {
          throw new SakurupiahApiError(
            responseData.message || 'API returned error status',
            response.status,
            responseData
          );
        }

        this.logger.info('Request successful', {
          requestId,
          endpoint,
          attempt,
        });

        return responseData as T;

      } catch (error) {
        clearTimeout(timeoutId);
        lastError = error as Error;

        if (error instanceof SakurupiahApiError) {
          if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
            this.logger.error('Client error - not retrying', {
              requestId,
              error: error.message,
              statusCode: error.statusCode,
            });
            throw error;
          }
        }

        if ((error as Error).name === 'AbortError') {
          lastError = new SakurupiahTimeoutError(
            `Request timed out after ${this.REQUEST_TIMEOUT}ms`
          );
        }

        if (attempt < this.MAX_RETRIES) {
          const delay = this.RETRY_BASE_DELAY * Math.pow(2, attempt - 1);
          this.logger.warn(`Request failed, retrying in ${delay}ms`, {
            requestId,
            attempt,
            error: lastError.message,
            nextRetryIn: delay,
          });
          await this.sleep(delay);
        }
      }
    }

    this.logger.error('All retry attempts exhausted', {
      requestId,
      endpoint,
      error: lastError?.message,
    });

    if (lastError instanceof SakurupiahError) {
      throw lastError;
    }

    throw new SakurupiahNetworkError(
      `Request failed after ${this.MAX_RETRIES} attempts: ${lastError?.message}`,
      lastError as Error
    );
  }

  async listPaymentChannels(): Promise<ListPaymentChannelsResponse> {
    this.logger.info('Fetching payment channels');

    const body = {
      api_id: this.config.apiId,
    };

    try {
      const response = await this.makeRequest<ListPaymentChannelsResponse>(
        'payment-channels',
        body
      );
      
      this.logger.info('Payment channels fetched', {
        count: response.data?.length || 0,
      });
      
      return response;
    } catch (error) {
      this.logger.error('Failed to fetch payment channels', { error });
      throw error;
    }
  }

  async createTransaction(
    request: CreateTransactionRequest
  ): Promise<CreateTransactionResponse> {
    this.logger.info('Creating transaction', {
      method: request.method,
      merchantRef: request.merchant_ref,
      amount: request.amount,
    });

    if (!request.method) {
      throw new SakurupiahError('Payment method is required', 'VALIDATION_ERROR');
    }

    if (!request.merchant_ref) {
      throw new SakurupiahError('Merchant reference is required', 'VALIDATION_ERROR');
    }

    if (!request.amount || request.amount <= 0) {
      throw new SakurupiahError('Valid amount is required', 'VALIDATION_ERROR');
    }

    const signature = this.generateSignature(
      request.method,
      request.merchant_ref,
      request.amount
    );

    const body: Record<string, unknown> = {
      api_id: this.config.apiId,
      method: request.method,
      merchant_ref: request.merchant_ref,
      amount: request.amount,
      signature,
    };

    if (request.customer_name) body.customer_name = request.customer_name;
    if (request.customer_email) body.customer_email = request.customer_email;
    if (request.customer_phone) body.customer_phone = request.customer_phone;
    if (request.callback_url) body.callback_url = request.callback_url;
    if (request.return_url) body.return_url = request.return_url;
    if (request.expired_time) body.expired_time = request.expired_time;

    try {
      const response = await this.makeRequest<CreateTransactionResponse>(
        'create-transaction',
        body
      );

      this.logger.info('Transaction created successfully', {
        reference: response.data?.reference,
        merchantRef: response.data?.merchant_ref,
        amount: response.data?.amount,
        total: response.data?.total,
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to create transaction', {
        merchantRef: request.merchant_ref,
        error,
      });
      throw error;
    }
  }

  async checkTransactionStatus(reference: string): Promise<CheckStatusResponse> {
    this.logger.info('Checking transaction status', { reference });

    if (!reference) {
      throw new SakurupiahError('Transaction reference is required', 'VALIDATION_ERROR');
    }

    const body = {
      api_id: this.config.apiId,
      reference,
    };

    try {
      const response = await this.makeRequest<CheckStatusResponse>(
        'check-status',
        body
      );

      this.logger.info('Transaction status retrieved', {
        reference: response.data?.reference,
        status: response.data?.status,
      });

      return response;
    } catch (error) {
      this.logger.error('Failed to check transaction status', {
        reference,
        error,
      });
      throw error;
    }
  }

  parseWebhookPayload(payload: string): WebhookPayload {
    try {
      return JSON.parse(payload) as WebhookPayload;
    } catch (error) {
      throw new SakurupiahError(
        'Failed to parse webhook payload',
        'PARSE_ERROR'
      );
    }
  }

  validateAndParseWebhook(
    payload: string,
    signature: string
  ): { isValid: boolean; data: WebhookPayload | null } {
    const isValid = this.verifyWebhookSignature(payload, signature);
    
    if (!isValid) {
      this.logger.warn('Invalid webhook signature received');
      return { isValid: false, data: null };
    }

    try {
      const data = this.parseWebhookPayload(payload);
      this.logger.info('Webhook validated and parsed', {
        reference: data.reference,
        status: data.status,
      });
      return { isValid: true, data };
    } catch (error) {
      this.logger.error('Failed to parse webhook payload after validation', { error });
      return { isValid: false, data: null };
    }
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let serviceInstance: SakurupiahService | null = null;

export function getSakurupiahService(): SakurupiahService {
  if (!serviceInstance) {
    serviceInstance = new SakurupiahService();
  }
  return serviceInstance;
}

export function resetSakurupiahService(): void {
  serviceInstance = null;
}

export default getSakurupiahService;
