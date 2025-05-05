import { CollectionConfig } from 'payload/types'

export const Relationships: CollectionConfig = {
  slug: 'relationships',
  fields: [
    { name: 'subject', type: 'relationship', relationTo: 'resources' },
    { name: 'verb', type: 'relationship', relationTo: 'verbs' },
    { name: 'object', type: 'relationship', relationTo: 'resources' },
    { name: 'hash', type: 'text' },
  ],
}
