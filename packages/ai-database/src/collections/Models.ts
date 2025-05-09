import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'
import { loggedIn } from '@/lib/collections'

export const Models: CollectionConfig = {
  slug: 'models',
  admin: {
    group: 'AI'
  },
  // timestamps: false,
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: loggedIn,
  },
  fields: [
    { name: 'id', type: 'text', label: 'ID' },
    { name: 'data', type: 'json', admin: { editorOptions } },
  ],
}