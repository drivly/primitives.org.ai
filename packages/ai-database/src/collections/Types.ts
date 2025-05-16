import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'
import { isLoggedIn } from '@/lib/collections'

export const Types: CollectionConfig = {
  slug: 'types',
  admin: {
    group: 'Schema.org',
  },
  access: {
    read: isLoggedIn,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'id', type: 'text', required: true },
    { name: 'data', type: 'code', admin: { language: 'mdx', editorOptions } },
    { name: 'subClassOf', type: 'relationship', relationTo: 'types' },
    { name: 'subClasses', type: 'join', collection: 'types', on: 'subClassOf' },
    { name: 'properties', type: 'join', collection: 'properties', on: 'domainIncludes' },
    { name: 'enums', type: 'join', collection: 'enums', on: 'type' },
  ],
}
