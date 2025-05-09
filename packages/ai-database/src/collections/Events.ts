import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    group: 'Data'
  },
  versions: true,
  fields: [
    { name: 'type', type: 'text' },
    { name: 'data', type: 'json', admin: { editorOptions } },
    { name: 'webhooks', type: 'array', fields: [
      { name: 'webhook', type: 'relationship', relationTo: 'webhooks' },
      { name: 'timestamp', type: 'date', defaultValue: () => new Date().toISOString() },
      { name: 'status', type: 'select', defaultValue: 'Pending', options: ['Pending', 'Success', 'Error'] },
      { name: 'data', type: 'json' },
    ]},
  ],
}
