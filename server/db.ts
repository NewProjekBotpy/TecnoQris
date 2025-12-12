import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

let poolInstance: pg.Pool | null = null;
let dbInstance: NodePgDatabase<typeof schema> | null = null;
let initializationError: Error | null = null;
let isInitialized = false;

export interface DatabaseInitResult {
  success: boolean;
  error?: string;
  pool?: pg.Pool;
  db?: NodePgDatabase<typeof schema>;
}

export function isDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

export function getInitializationError(): Error | null {
  return initializationError;
}

export async function initializeDatabase(): Promise<DatabaseInitResult> {
  if (isInitialized && dbInstance) {
    return { success: true, pool: poolInstance!, db: dbInstance };
  }

  if (initializationError) {
    return { success: false, error: initializationError.message };
  }

  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    initializationError = new Error("DATABASE_URL must be set. Please configure the DATABASE_URL environment variable in Vercel.");
    console.error('[DB] DATABASE_URL is not set');
    return { success: false, error: initializationError.message };
  }

  try {
    const poolConfig: pg.PoolConfig = {
      connectionString,
      max: isVercel ? 1 : 10,
      idleTimeoutMillis: isVercel ? 10000 : 30000,
      connectionTimeoutMillis: 10000,
    };

    if (isProduction || connectionString.includes('neon.tech') || connectionString.includes('supabase')) {
      poolConfig.ssl = {
        rejectUnauthorized: false
      };
    }

    poolInstance = new Pool(poolConfig);

    poolInstance.on('error', (err) => {
      console.error('[DB] Unexpected pool error:', err);
    });

    poolInstance.on('connect', () => {
      console.log('[DB] New client connected to PostgreSQL');
    });

    dbInstance = drizzle(poolInstance, { schema });
    isInitialized = true;

    console.log('[DB] Database initialized successfully');
    return { success: true, pool: poolInstance, db: dbInstance };
  } catch (error: any) {
    initializationError = error;
    console.error('[DB] Failed to initialize database:', error?.message);
    return { success: false, error: error?.message };
  }
}

export function getDb(): NodePgDatabase<typeof schema> | null {
  return dbInstance;
}

export function getPool(): pg.Pool | null {
  return poolInstance;
}

export const pool: pg.Pool = new Proxy({} as pg.Pool, {
  get(target, prop) {
    if (!poolInstance) {
      throw new Error('Database pool not initialized. Call initializeDatabase() first.');
    }
    return (poolInstance as any)[prop];
  }
});

export const db: NodePgDatabase<typeof schema> = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(target, prop) {
    if (!dbInstance) {
      throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    return (dbInstance as any)[prop];
  }
});
