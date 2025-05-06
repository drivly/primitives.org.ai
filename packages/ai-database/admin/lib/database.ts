/**
 * This file is a placeholder for database functionality.
 * The Payload CMS integration has been removed for a simplified admin app.
 */

export type DatabaseType = 'mongodb' | 'memory'

/**
 * Detects the database type from a connection URI
 * @param uri - Database connection URI
 * @returns The detected database type
 */
export const detectDatabaseType = (uri?: string): DatabaseType => {
  if (!uri) return 'memory'

  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    return 'mongodb'
  }

  return 'mongodb'
}

let memoryServerUri: string | null = null

/**
 * Placeholder for initializing a database connection
 * @returns A connection string
 */
export const initMemoryServer = async (): Promise<string> => {
  memoryServerUri = 'mongodb://localhost:27017/test'
  console.log(`Using database at ${memoryServerUri}`)
  return memoryServerUri
}

/**
 * Placeholder for getting a database adapter
 * @returns A mock database adapter
 */
export const getMemoryAdapter = () => {
  if (!memoryServerUri) {
    throw new Error('Database not initialized. Call initMemoryServer first.')
  }

  return {
    url: memoryServerUri,
  }
}

/**
 * Placeholder for getting a database adapter
 * @param uri - Database connection URI
 * @returns A mock database adapter
 */
export const getDatabaseAdapter = (uri?: string) => {
  const type = detectDatabaseType(uri)

  if (type === 'memory') {
    if (!memoryServerUri) {
      throw new Error('Database not initialized. Call initMemoryServer first.')
    }
    return getMemoryAdapter()
  }

  return {
    url: uri || '',
  }
}

/**
 * Placeholder for stopping a database connection
 */
export const stopMemoryServer = async () => {
  memoryServerUri = null
}
