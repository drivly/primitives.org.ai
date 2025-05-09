import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Actions: CollectionConfig = {
  slug: 'actions',
  admin: {
    group: 'Schema.org'
  },
  fields: [
    { name: 'id', type: 'text', required: true },
    { name: 'data', type: 'code', admin: { language: 'mdx', editorOptions } },
  ],
}
