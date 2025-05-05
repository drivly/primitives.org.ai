import { describe, it, expect } from 'vitest'
import { detectDatabaseType } from '../admin/lib/database'
import { getMemoryAdapter } from '../admin/lib/memory-server'

describe('Database Detection', () => {
  it('should detect memory database when no URI is provided', () => {
    expect(detectDatabaseType()).toBe('memory')
  })

  it('should detect MongoDB database from URI', () => {
    expect(detectDatabaseType('mongodb://localhost/test')).toBe('mongodb')
    expect(detectDatabaseType('mongodb+srv://user:pass@cluster.mongodb.net/test')).toBe('mongodb')
  })

  it('should detect PostgreSQL database from URI', () => {
    expect(detectDatabaseType('postgresql://postgres:postgres@localhost:5432/test')).toBe('postgres')
    expect(detectDatabaseType('postgres://postgres:postgres@localhost:5432/test')).toBe('postgres')
  })

  it('should default to MongoDB for unknown URI formats', () => {
    expect(detectDatabaseType('mysql://user:pass@localhost:3306/test')).toBe('mongodb')
  })
})

describe('Memory Server', () => {
  it('should initialize memory server adapter', async () => {
    const adapter = await getMemoryAdapter()
    expect(adapter).toBeDefined()
  })
})
