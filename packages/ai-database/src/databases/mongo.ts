import { mongooseAdapter } from '@payloadcms/db-mongodb'

/**
 * MongoDB adapter with vector storage support
 * 
 * Note: Vector search functionality is temporarily disabled
 * due to API changes in @payloadcms/db-mongodb v3.38.0
 */
const adapter = mongooseAdapter({
  url: process.env.DATABASE_URI || 'mongodb://localhost/ai-database',
})

export const db = adapter
