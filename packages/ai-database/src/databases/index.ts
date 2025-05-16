/**
 * Database type detection and adapter selection
 */

import type { DatabaseAdapter } from 'payload'
import { db as sqliteAdapter } from './sqlite'
import { db as mongoAdapter } from './mongo'
import { db as postgresAdapter } from './postgres'

/**
 * Detects the database type from a connection URI
 * @param uri - Database connection URI
 * @returns The detected database type
 */
export const detectDatabaseType = (uri?: string): 'sqlite' | 'mongodb' | 'postgres' => {
  if (!uri) return 'sqlite' // Default to SQLite if no URI provided
  
  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    return 'mongodb'
  }
  
  if (process.env.VERCEL === '1' || process.env.VERCEL_ENV) {
    console.log('Running on Vercel, using SQLite adapter to avoid cloudflare:sockets import issues')
    return 'sqlite'
  }
  
  if (uri.startsWith('postgres://') || uri.startsWith('postgresql://')) {
    return 'postgres'
  }
  
  return 'sqlite' // Default fallback
}

/**
 * Get the appropriate database adapter based on the connection URI
 */
const uri = process.env.DATABASE_URI || process.env.POSTGRES_URL
const dbType = detectDatabaseType(uri)

let db: any // Using any type to avoid type conflicts between adapters
switch (dbType) {
  case 'mongodb':
    db = mongoAdapter
    break
  case 'postgres':
    db = postgresAdapter
    break
  default:
    db = sqliteAdapter
}

export { db }
