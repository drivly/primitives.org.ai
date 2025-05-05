import { detectDatabaseType } from '../admin/lib/database.js'

console.log('Testing database detection logic:')
console.log('No URI:', detectDatabaseType())
console.log('MongoDB URI:', detectDatabaseType('mongodb://localhost/test'))
console.log('MongoDB+SRV URI:', detectDatabaseType('mongodb+srv://user:pass@cluster.mongodb.net/test'))
console.log('PostgreSQL URI:', detectDatabaseType('postgresql://postgres:postgres@localhost:5432/test'))
console.log('Postgres URI:', detectDatabaseType('postgres://postgres:postgres@localhost:5432/test'))
console.log('Unknown URI:', detectDatabaseType('mysql://user:pass@localhost:3306/test'))

console.log('\nTesting memory server adapter:')
try {
  console.log('Importing memory server adapter...')
  const { getMemoryAdapter } = await import('../admin/lib/memory-server.js')
  console.log('Memory server adapter imported successfully')
  
  console.log('Initializing memory server...')
  const adapter = await getMemoryAdapter()
  console.log('Memory server initialized successfully')
  
  console.log('Memory server test passed!')
} catch (error) {
  console.error('Memory server test failed:', error)
}
