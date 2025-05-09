import { mongooseAdapter } from '@payloadcms/db-mongodb'

/**
 * Default configuration for the Payload CMS instance
 */
export const defaultConfig = {
  admin: {
    meta: {
      title: 'AI Primitives Admin',
      description: 'Admin interface for AI primitives',
    },
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  typescript: {
    outputFile: 'payload-types.ts',
  },
  graphQL: {
    schemaOutputFile: 'generated-schema.graphql',
  },
  secret: process.env.PAYLOAD_SECRET || 'default-secret-key',
}
