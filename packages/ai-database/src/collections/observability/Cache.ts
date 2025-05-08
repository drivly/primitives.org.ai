import type { CollectionConfig } from 'payload/types'

export const Cache: CollectionConfig = {
  slug: 'cache',
  admin: {
    group: 'Observability',
    description: 'Cached responses for AI model requests',
  },
  access: { update: () => false },
  fields: [
    { name: 'key', type: 'text', required: true, index: true },
    { name: 'data', type: 'json' },
    { name: 'chunks', type: 'json' },
    { name: 'chunkCount', type: 'number' },
    { name: 'freshUntil', type: 'date' },
  ],
}
