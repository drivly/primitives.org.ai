import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  fields: [
    { name: 'name', type: 'text' },
    { name: 'sqid', type: 'text', admin: { readOnly: true }, index: true },
    { name: 'hash', type: 'text', admin: { readOnly: true }, index: true },
    { name: 'type', type: 'relationship', relationTo: ['nouns'] },
    { name: 'data', type: 'json' },
    { name: 'embedding', type: 'json', admin: { hidden: true }, index: false },
    { name: 'content', type: 'richText' },
  ],
}
