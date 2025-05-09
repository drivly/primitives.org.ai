import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Types: CollectionConfig = {
  slug: 'types',
  admin: {
    group: 'Schema.org'
  },
  fields: [
    { name: 'id', type: 'text', required: true },
    { name: 'data', type: 'code', admin: { language: 'mdx', editorOptions } },
    { name: 'subClassOf', type: 'relationship', relationTo: 'types' },
    { name: 'subClasses', type: 'join', collection: 'types', on: 'subClassOf' },
  ],
}
