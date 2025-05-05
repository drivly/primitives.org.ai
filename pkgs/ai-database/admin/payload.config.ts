import path from 'path'
import { buildConfig } from 'payload/config'
import { slateEditor } from '@payloadcms/richtext-slate'
import { getDatabaseAdapter } from './lib/database.js'

export default buildConfig({
  admin: {
    user: 'users',
  },
  editor: slateEditor({}),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'documents',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'embeddings',
          type: 'json',
          admin: {
            description: 'Vector embeddings for this document',
          },
        },
      ],
    },
  ],
  db: getDatabaseAdapter(process.env.DATABASE_URI),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
