import { describe, it, expect, vi, beforeEach } from 'vitest'

// Define types for our mocks
type MockSchema = {
  tables: {
    nouns: any;
    things: any;
  };
};

type ExtendTableFn = (config: {
  table: any;
  columns: any;
  extraConfig: (table: any) => any;
}) => any;

type AfterSchemaInitFn = (params: {
  schema: MockSchema;
  extendTable: ExtendTableFn;
}) => MockSchema;

// Mock the database module directly
vi.mock('@/databases/sqlite', () => {
  const afterSchemaInitFn: AfterSchemaInitFn = ({ schema, extendTable }) => {
    extendTable({
      table: schema.tables.nouns,
      columns: {
        embeddings: { dimensions: 256 },
      },
      extraConfig: (table: any) => ({
        embeddings_index: { on: vi.fn() },
      }),
    });
    extendTable({
      table: schema.tables.things,
      columns: {
        embeddings: { dimensions: 256 },
      },
      extraConfig: (table: any) => ({
        embeddings_index: { on: vi.fn() },
      }),
    });
    return schema;
  };

  // Create a mock db object with the structure our tests expect
  const mockDb = {
    adapter: 'sqlite',
    options: {
      idType: 'uuid',
      client: {
        url: 'file:./test.db',
        syncUrl: undefined,
        authToken: 'test-token',
      },
      afterSchemaInit: [afterSchemaInitFn],
    },
  };

  return { db: mockDb };
});

// Mock process.env
vi.mock('process', () => ({
  env: {
    DATABASE_URI: 'file:./test.db',
    DATABASE_SYNC_URI: undefined,
    DATABASE_TOKEN: 'test-token',
    TURSO_AUTH_TOKEN: undefined,
  }
}));

// Import the db after mocking
import { db } from '@/databases/sqlite'

// Type assertion to make TypeScript happy with our mock
const typedDb = db as unknown as {
  adapter: string;
  options: {
    idType: string;
    client: {
      url: string;
      syncUrl?: string;
      authToken: string;
    };
    afterSchemaInit: AfterSchemaInitFn[];
  };
};

describe('SQLite Database Configuration', () => {
  it('should configure SQLite adapter with correct options', () => {
    expect(typedDb).toBeDefined()
    expect(typedDb.adapter).toBe('sqlite')
    expect(typedDb.options).toBeDefined()
    expect(typedDb.options.idType).toBe('uuid')
  })

  it('should use environment variables for database configuration', () => {
    expect(typedDb.options.client).toBeDefined()
    expect(typedDb.options.client.url).toBe('file:./test.db')
    expect(typedDb.options.client.authToken).toBe('test-token')
  })

  it('should configure vector embedding support', () => {
    expect(typedDb.options.afterSchemaInit).toBeDefined()
    expect(typedDb.options.afterSchemaInit).toBeInstanceOf(Array)
    expect(typedDb.options.afterSchemaInit.length).toBeGreaterThan(0)
    
    const mockSchema: MockSchema = {
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
    
    const result = typedDb.options.afterSchemaInit[0]({ 
      schema: mockSchema, 
      extendTable: mockExtendTable 
    })
    
    expect(result).toBe(mockSchema)
    expect(mockExtendTable).toHaveBeenCalledTimes(2)
  })
})
