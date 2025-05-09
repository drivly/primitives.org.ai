import type { CollectionConfig } from 'payload'

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
    { name: 'request', type: 'json', admin: { editorOptions: { padding: { top: 20, bottom: 20 } } } },
    { name: 'response', type: 'json', admin: { editorOptions: { padding: { top: 20, bottom: 20 } } } },
  ],
}
