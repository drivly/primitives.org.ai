import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { sql } from '@payloadcms/db-sqlite/drizzle'
import { integer, sqliteTable, customType } from '@payloadcms/db-sqlite/drizzle/sqlite-core'

const float32Array = customType<{
  data: number[];
  config: { dimensions: number };
  configRequired: true;
  driverData: Buffer;
}>({
  dataType(config) {
    return `F32_BLOB(${config.dimensions})`;
  },
  fromDriver(value: Buffer) {
    return Array.from(new Float32Array(value.buffer));
  },
  toDriver(value: number[]) {
    return sql`vector32(${JSON.stringify(value)})`;
  },
});

export const vectorTable = sqliteTable("vector_table", {
  id: integer("id").primaryKey(),
  vector: float32Array("vector", { dimensions: 3 }),
})

export const db = sqliteAdapter({
  client: {
    url: process.env.DATABASE_URI || 'file:./ai.db',
  },
  beforeSchemaInit: [
    // ({ schema, adapter }) => {
    ({ schema, extendTable }) => {
      extendTable({ table: ''})
      return {
        ...schema,
        tables: {
          ...schema.tables,
          vectorTable: sqliteTable("vector_table", {
            id: integer("id").primaryKey(),
            vector: float32Array("vector", { dimensions: 3 }),
          })
        },
      }
    },
  ],
  afterSchemaInit: [
    (args) => {
      const { schema } = args
      adapter.db.schema
      return schema
    },
  ]
})