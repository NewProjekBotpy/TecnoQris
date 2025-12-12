import postgres from 'postgres';

export default async function handler(req, res) {
  const startTime = Date.now();
  const results = {
    timestamp: new Date().toISOString(),
    checks: {}
  };
  
  // Check 1: Environment variables
  results.checks.env = {
    DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
    SESSION_SECRET: process.env.SESSION_SECRET ? "set" : "missing",
    VERCEL: process.env.VERCEL || "not set",
    VERCEL_ENV: process.env.VERCEL_ENV || "not set"
  };
  
  // Check 2: Database connection
  if (process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL, {
        prepare: false,
        max: 1,
        idle_timeout: 5,
        connect_timeout: 5,
        ssl: 'require',
      });
      
      const dbStart = Date.now();
      const result = await client`SELECT NOW() as now`;
      const dbTime = Date.now() - dbStart;
      
      results.checks.database = {
        status: "connected",
        time_ms: dbTime,
        server_time: result[0]?.now
      };
      
      await client.end();
    } catch (error) {
      results.checks.database = {
        status: "error",
        error: error.message,
        code: error.code
      };
    }
  } else {
    results.checks.database = {
      status: "skipped",
      reason: "DATABASE_URL not set"
    };
  }
  
  results.total_time_ms = Date.now() - startTime;
  results.status = results.checks.database?.status === "connected" ? "ok" : "degraded";
  
  res.json(results);
}
