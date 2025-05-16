import { postgresAdapter } from '@payloadcms/db-postgres'
import { customType, index } from '@payloadcms/db-postgres/drizzle/pg-core'

/**
 * PostgreSQL adapter with vector storage support
 */
const pgVector = customType<{
  data: number[];
  config: { dimensions: number };
  configRequired: true;
}>({
  dataType(config) {
    return `vector(${config.dimensions})`;
  },
  fromDriver(value: unknown) {
    if (typeof value === 'string') {
      return value.replace(/[()]/g, '').split(',').map(Number);
    }
    return [];
  },
  toDriver(value: number[]) {
    return `[${value.join(',')}]`;
  },
});

const adapter = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/ai-database',
  },
  
  afterSchemaInit: [
    ({ schema, extendTable }) => {
      extendTable({
        table: schema.tables.nouns,
        columns: {
          embeddings: pgVector('embeddings', { dimensions: 256 }),
        },
        extraConfig: (table) => ({
          embeddings_index: index('nouns_embeddings_index').on(table.embeddings),
        }),
      })
      
      extendTable({
        table: schema.tables.things,
        columns: {
          embeddings: pgVector('embeddings', { dimensions: 256 }),
        },
        extraConfig: (table) => ({
          embeddings_index: index('things_embeddings_index').on(table.embeddings),
        }),
      })
      
      return schema
    },
  ]
})

export const db = adapter
