import type { CollectionConfig } from 'payload'

export const Databases: CollectionConfig = {
  slug: 'databases',
  admin: {
    group: 'Admin'
  },
  versions: true,
  fields: [
    { name: 'id', type: 'text', required: true, label: 'Domain' },
    { name: 'name', type: 'text' },
    // { name: 'domain', type: 'text' },
  ],
}
