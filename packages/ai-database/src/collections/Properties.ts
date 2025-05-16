import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    group: 'Schema.org',
  },
  fields: [
    { name: 'id', type: 'text', required: true },
    { name: 'domainIncludes', type: 'relationship', relationTo: 'types' },
    { name: 'data', type: 'code', admin: { language: 'mdx', editorOptions } },
  ],
}
