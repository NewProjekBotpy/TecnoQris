import { drizzle as drizzlePg, NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import pg from "pg";
import postgres from "postgres";
import * as schema from "../shared/schema";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

let poolInstance: pg.Pool | null = null;
let dbInstance: any = null;
let initializationError: Error | null = null;
let isInitialized = false;

export interface DatabaseInitResult {
  success: boolean;
  error?: string;
  pool?: pg.Pool;
  db?: any;
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
    const isPgBouncer = connectionString.includes('pgbouncer=true') || connectionString.includes('pooler.supabase.com');
    
    console.log('[DB] Initializing database...', { 
      isPgBouncer,
      isVercel,
      isProduction
    });

    if (isPgBouncer || isVercel) {
      // Use postgres.js driver with prepare: false for PgBouncer/serverless
      console.log('[DB] Using postgres.js driver with prepare: false for PgBouncer compatibility');
      
      const client = postgres(connectionString, {
        prepare: false,  // CRITICAL: Disable prepared statements for PgBouncer
        max: 1,
        idle_timeout: 20,
        connect_timeout: 10,
        ssl: 'require',
      });

      // Test connection
      console.log('[DB] Testing database connection...');
      const result = await client`SELECT NOW() as now`;
      console.log('[DB] Connection test successful:', result[0]?.now);

      dbInstance = drizzlePostgres(client, { schema });
      isInitialized = true;

      console.log('[DB] Database initialized successfully with postgres.js driver');
      return { success: true, db: dbInstance };
    } else {
      // Use node-postgres for local development (supports prepared statements)
      console.log('[DB] Using node-postgres driver for local development');
      
      const poolConfig: pg.PoolConfig = {
        connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
        statement_timeout: 60000,
      };

      if (connectionString.includes('neon.tech') || connectionString.includes('supabase')) {
        poolConfig.ssl = { rejectUnauthorized: false };
      }

      poolInstance = new Pool(poolConfig);

      poolInstance.on('error', (err) => {
        console.error('[DB] Unexpected pool error:', err);
      });

      // Test connection
      console.log('[DB] Testing database connection...');
      const client = await poolInstance.connect();
      try {
        const result = await client.query('SELECT NOW() as now');
        console.log('[DB] Connection test successful:', result.rows[0]?.now);
      } finally {
        client.release();
      }

      dbInstance = drizzlePg(poolInstance, { schema });
      isInitialized = true;

      console.log('[DB] Database initialized successfully with node-postgres driver');
      return { success: true, pool: poolInstance, db: dbInstance };
    }
  } catch (error: any) {
    initializationError = error;
    console.error('[DB] Failed to initialize database:', error?.message);
    console.error('[DB] Error stack:', error?.stack);
    return { success: false, error: error?.message };
  }
}

export function getDb(): any {
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

export const db: any = new Proxy({} as any, {
  get(target, prop) {
    if (!dbInstance) {
      throw new Error('Database not initialized. Call initializeDatabase() first.');
    }
    return (dbInstance as any)[prop];
  }
});
