// @ts-expect-error - Type declarations provided in custom types folder
import { postgresAdapter } from '@payloadcms/db-postgres'
// @ts-expect-error - Type declarations provided in custom types folder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { getMemoryAdapter } from './memory-server.js'

export const detectDatabaseType = (uri?: string) => {
  if (!uri) return 'memory'
  
  if (uri.startsWith('postgres://') || uri.startsWith('postgresql://')) {
    return 'postgres'
  }
  
  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    return 'mongodb'
  }
  
  return 'mongodb'
}

export const getDatabaseAdapter = (uri?: string) => {
  const type = detectDatabaseType(uri)
  
  if (type === 'memory') {
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
