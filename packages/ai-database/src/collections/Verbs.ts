import type { CollectionConfig } from 'payload'

export const Verbs: CollectionConfig = {
  slug: 'verbs',
  admin: {
    group: 'Data'
  },
  versions: true,
  fields: [
    // { name: 'ns', type: 'text', label: 'Namespace' },
    { name: 'id', type: 'text', required: true, label: 'Verb' },
    { name: 'things', type: 'join', collection: 'things', on: 'relationships.predicate' },
  ],
}
