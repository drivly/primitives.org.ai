import type { CollectionConfig } from 'payload'

export const Databases: CollectionConfig = {
  slug: 'databases',
  admin: {
    group: 'Data'
  },
  versions: true,
  fields: [
    { name: 'id', type: 'text', required: true, label: 'Namespace' },
    { name: 'name', type: 'text' },
    { name: 'domain', type: 'text' },
  ],
}
