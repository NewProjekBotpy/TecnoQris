import { DataAPIClient, Db } from '@datastax/astra-db-ts';

const token = process.env.ASTRA_DB_TOKEN;
const endpoint = process.env.ASTRA_DB_ENDPOINT;

if (!token || !endpoint) {
  console.warn("ASTRA_DB_TOKEN or ASTRA_DB_ENDPOINT not set - Astra DB will not be available");
}

let client: DataAPIClient | null = null;
let db: Db | null = null;

export function getAstraClient(): DataAPIClient {
  if (!client) {
    if (!token) {
      throw new Error("ASTRA_DB_TOKEN environment variable is required");
    }
    client = new DataAPIClient(token);
  }
  return client;
}

export function getAstraDb(): Db {
  if (!db) {
    if (!endpoint) {
      throw new Error("ASTRA_DB_ENDPOINT environment variable is required");
    }
    const astraClient = getAstraClient();
    db = astraClient.db(endpoint);
  }
  return db;
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
