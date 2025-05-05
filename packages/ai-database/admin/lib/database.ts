import { CollectionConfig } from 'payload/types'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

export type DatabaseType = 'postgres' | 'mongodb' | 'memory'

/**
 * Detects the database type from a connection URI
 * @param uri - Database connection URI
 * @returns The detected database type
 */
export const detectDatabaseType = (uri?: string): DatabaseType => {
  if (!uri) return 'memory'
  
  if (uri.startsWith('postgres://') || uri.startsWith('postgresql://')) {
    return 'postgres'
  }
  
  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    return 'mongodb'
  }
  
  return 'mongodb'
}

let memoryServer: MongoMemoryServer | null = null

/**
 * Gets a MongoDB adapter using an in-memory MongoDB server
 * @returns MongoDB adapter configured with the memory server
 */
export const getMemoryAdapter = async () => {
  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create()
    const uri = memoryServer.getUri()
    console.log(`Using in-memory MongoDB server at ${uri}`)
    return mongooseAdapter({
      url: uri,
    })
  }
  
  return mongooseAdapter({
    url: memoryServer.getUri(),
  })
}

/**
 * Gets the appropriate database adapter based on the connection URI
 * @param uri - Database connection URI
 * @returns Database adapter for Payload CMS
 */
export const getDatabaseAdapter = async (uri?: string) => {
  const type = detectDatabaseType(uri)
  
  if (type === 'memory') {
    return await getMemoryAdapter()
  }
  
  if (type === 'postgres') {
    return postgresAdapter({
      pool: { connectionString: uri },
    })
  }
  
  return mongooseAdapter({
    url: uri || '',
  })
}

/**
 * Stops the in-memory MongoDB server
 */
export const stopMemoryServer = async () => {
  if (memoryServer) {
    await memoryServer.stop()
    memoryServer = null
  }
}
