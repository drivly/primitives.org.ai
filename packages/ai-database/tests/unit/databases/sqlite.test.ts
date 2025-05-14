import { describe, it, expect, vi, beforeEach } from 'vitest'
import { db } from '@/databases/sqlite'

vi.mock('process', () => ({
  env: {
    DATABASE_URI: 'file:./test.db',
    DATABASE_SYNC_URI: undefined,
    DATABASE_TOKEN: 'test-token',
    TURSO_AUTH_TOKEN: undefined,
  }
}))

describe('SQLite Database Configuration', () => {
  it('should configure SQLite adapter with correct options', () => {
    expect(db).toBeDefined()
    expect(db.adapter).toBe('sqlite')
    expect(db.options).toBeDefined()
    expect(db.options.idType).toBe('uuid')
  })

  it('should use environment variables for database configuration', () => {
    expect(db.options.client).toBeDefined()
    expect(db.options.client.url).toBe('file:./test.db')
    expect(db.options.client.authToken).toBe('test-token')
  })

  it('should configure vector embedding support', () => {
    expect(db.options.afterSchemaInit).toBeDefined()
    expect(db.options.afterSchemaInit).toBeInstanceOf(Array)
    expect(db.options.afterSchemaInit.length).toBeGreaterThan(0)
    
    const mockSchema = {
      tables: {
        nouns: {},
        things: {}
      }
    }
    
    const mockExtendTable = vi.fn((config) => {
      expect(config.table).toBeDefined()
      expect(config.columns).toBeDefined()
      expect(config.columns.embeddings).toBeDefined()
      expect(config.extraConfig).toBeInstanceOf(Function)
      
      const mockTable = {}
      const extraConfig = config.extraConfig(mockTable)
      expect(extraConfig).toBeDefined()
      expect(extraConfig.embeddings_index).toBeDefined()
      
      return config
    })
    
    const result = db.options.afterSchemaInit[0]({ 
      schema: mockSchema, 
      extendTable: mockExtendTable 
    })
    
    expect(result).toBe(mockSchema)
    expect(mockExtendTable).toHaveBeenCalledTimes(2)
  })
})
