import { MongoMemoryServer } from 'mongodb-memory-server'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

let mongod: MongoMemoryServer | null = null

export const getMemoryAdapter = async () => {
  if (!mongod) {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    console.log(`MongoDB Memory Server running at ${uri}`)
    
    process.on('SIGINT', async () => {
      if (mongod) {
        await mongod.stop()
        console.log('MongoDB Memory Server stopped')
      }
      process.exit(0)
    })
    
    return mongooseAdapter({
      url: uri,
    })
  }
  
  return mongooseAdapter({
    url: mongod.getUri(),
  })
}
