import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Generations: CollectionConfig = {
  slug: 'generations',
  admin: {
    group: 'Admin'
  },
  fields: [
    { type: 'row', fields: [
      { name: 'provider', type: 'text' },
      { name: 'batch', type: 'text' },
    ]},
    { name: 'request', type: 'json', admin: { editorOptions } },
    { name: 'response', type: 'json', admin: { editorOptions } },
  ],
}
