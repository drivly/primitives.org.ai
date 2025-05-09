import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Admin'
  },
  fields: [
    { name: 'model', type: 'text' },
    { name: 'provider', type: 'text' },
    { name: 'batch', type: 'text' },
    { name: 'batchSize', type: 'number' },
    { name: 'temperature', type: 'number' },
  ],
}
