import type { CollectionConfig } from 'payload'
import { loggedIn } from '@/lib/collections'

export const Models: CollectionConfig = {
  slug: 'models',
  admin: {
    group: 'AI'
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: loggedIn,
  },
  fields: [
    { name: 'id', type: 'text', required: true, label: 'Name' },
    { name: 'description', type: 'code', admin: { language: 'mdx' } },
  ],
}