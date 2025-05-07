import { buildConfig } from 'payload/config'
import { getDatabaseAdapter } from './lib/database'
import { slateEditor } from '@payloadcms/richtext-slate'

import {
  Completions,
  Functions,
  Executions,
  Batches,
  Evals,
  Experiments,
} from './collections'

/**
 * Payload CMS configuration with dynamic database adapter selection
 */
export default buildConfig({
  collections: [
    Completions,
    Functions,
    Executions,
    Batches,
    Evals,
    Experiments,
  ],
  db: getDatabaseAdapter(process.env.DATABASE_URI),
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- AI Observability',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  typescript: {
    outputFile: 'types.ts',
  },
})
