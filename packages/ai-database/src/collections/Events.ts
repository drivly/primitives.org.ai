import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'
import { isLoggedIn } from '@/lib/collections'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    group: 'Data'
  },
  versions: true,
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: isLoggedIn,
  },
  fields: [
    { name: 'type', type: 'text' },
    { name: 'data', type: 'json', admin: { editorOptions } },
    { name: 'execution', type: 'relationship', relationTo: 'functions' },
    { name: 'generation', type: 'relationship', relationTo: 'generations' },
    { name: 'webhooks', type: 'array', fields: [
      { name: 'webhook', type: 'relationship', relationTo: 'webhooks' },
      { name: 'timestamp', type: 'date', defaultValue: () => new Date().toISOString() },
      { name: 'status', type: 'select', defaultValue: 'Pending', options: ['Pending', 'Success', 'Error'] },
      { name: 'data', type: 'json' },
    ]},
  ],
}
