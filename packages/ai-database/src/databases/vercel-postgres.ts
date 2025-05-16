import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

/**
 * PostgreSQL adapter for Vercel deployments
 * This adapter is optimized for use with Vercel Postgres
 * and avoids the cloudflare:sockets import issue
 */
const adapter = vercelPostgresAdapter({
  connectionString: process.env.DATABASE_URI || process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/ai-database',
})

export const db = adapter
