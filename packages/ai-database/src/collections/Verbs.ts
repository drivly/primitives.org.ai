import type { CollectionConfig } from 'payload'

export const Verbs: CollectionConfig = {
  slug: 'verbs',
  admin: {
    group: 'Data'
  },
  versions: true,
  fields: [
    { name: 'id', type: 'text', required: true, label: 'Verb' },
    { name: 'things', type: 'join', collection: 'things', on: 'relationships.verb' },
  ],
}
