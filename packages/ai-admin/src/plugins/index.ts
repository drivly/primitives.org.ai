import { mongooseAdapter } from '@payloadcms/db-mongodb'

/**
 * Default plugins for the Payload CMS instance
 */
export const defaultPlugins = [
  mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
]
