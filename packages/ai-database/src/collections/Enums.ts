import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Enums: CollectionConfig = {
  slug: 'enums',
  admin: {
    group: 'Schema.org'
  },
  fields: [
    { name: 'id', type: 'text', required: true },
    { name: 'type', type: 'relationship', relationTo: 'nouns', required: true },
    { name: 'data', type: 'code', admin: { language: 'mdx', editorOptions } },
  ],
}
