import type { CollectionConfig } from 'payload'
import { editorOptions, loggedIn } from '@/lib/collections'

export const Generations: CollectionConfig = {
  slug: 'generations',
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
    { type: 'row', fields: [
      { name: 'provider', type: 'text' },
      { name: 'batch', type: 'text' },
    ]},
    { name: 'metadata', type: 'json', admin: { editorOptions } },
    { name: 'request', type: 'json', admin: { editorOptions } },
    { name: 'response', type: 'json', admin: { editorOptions } },
  ],
}
