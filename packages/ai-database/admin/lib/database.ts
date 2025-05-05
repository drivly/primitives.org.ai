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
let memoryServerUri: string | null = null

/**
 * Initializes the in-memory MongoDB server
 * @returns The URI of the in-memory MongoDB server
 */
export const initMemoryServer = async (): Promise<string> => {
  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create()
    memoryServerUri = memoryServer.getUri()
    console.log(`Using in-memory MongoDB server at ${memoryServerUri}`)
  }
  
  return memoryServerUri as string
}

/**
 * Gets a MongoDB adapter using an in-memory MongoDB server
 * @returns MongoDB adapter configured with the memory server
 */
export const getMemoryAdapter = () => {
  if (!memoryServerUri) {
    throw new Error('Memory server not initialized. Call initMemoryServer first.')
  }
  
  return mongooseAdapter({
    url: memoryServerUri,
  })
}

/**
 * Gets the appropriate database adapter based on the connection URI
 * @param uri - Database connection URI
 * @returns Database adapter for Payload CMS
 */
export const getDatabaseAdapter = (uri?: string) => {
  const type = detectDatabaseType(uri)
  
  if (type === 'memory') {
    if (!memoryServerUri) {
      throw new Error('Memory server not initialized. Call initMemoryServer first.')
    }
    return getMemoryAdapter()
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
    memoryServerUri = null
  }
}
