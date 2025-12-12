import { DataAPIClient, Db } from '@datastax/astra-db-ts';

let client: DataAPIClient | null = null;
let db: Db | null = null;

function getToken(): string {
  const token = process.env.ASTRA_DB_TOKEN;
  if (!token) {
    throw new Error("ASTRA_DB_TOKEN environment variable is required");
  }
  return token;
}

function getEndpoint(): string {
  const endpoint = process.env.ASTRA_DB_ENDPOINT;
  if (!endpoint) {
    throw new Error("ASTRA_DB_ENDPOINT environment variable is required");
  }
  return endpoint;
}

export function getAstraClient(): DataAPIClient {
  if (!client) {
    const token = getToken();
    client = new DataAPIClient(token);
  }
  return client;
}

export function getAstraDb(): Db {
  if (!db) {
    const endpoint = getEndpoint();
    const astraClient = getAstraClient();
    db = astraClient.db(endpoint);
  }
  return db;
}

export function checkAstraDbConfig(): { configured: boolean; error?: string } {
  try {
    getToken();
    getEndpoint();
    return { configured: true };
  } catch (error: any) {
    return { configured: false, error: error.message };
  }
}

export async function initializeCollections() {
  const database = getAstraDb();
  
  const collections = ['users', 'transactions', 'wallets', 'qr_codes', 'api_keys', 'payments', 'webhook_logs', 'payment_channels'];
  
  for (const collectionName of collections) {
    try {
      await database.createCollection(collectionName);
      console.log(`Collection '${collectionName}' created or already exists`);
    } catch (error: any) {
      if (error?.message?.includes('already exists')) {
        console.log(`Collection '${collectionName}' already exists`);
      } else {
        console.error(`Error creating collection '${collectionName}':`, error);
      }
    }
  }
}

export { DataAPIClient, Db };
