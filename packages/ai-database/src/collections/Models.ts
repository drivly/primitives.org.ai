import type { CollectionConfig } from 'payload'

export const Models: CollectionConfig = {
  slug: 'models',
  admin: {
    group: 'Admin'
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'id', type: 'text', required: true, label: 'Name' },
    { name: 'description', type: 'code', admin: { language: 'mdx' } },
  ],
}