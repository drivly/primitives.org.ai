import type { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    group: 'Admin'
  },
  fields: [
    { name: 'id', type: 'text', required: true, label: 'Name' },
    { name: 'users', type: 'join', collection: 'users', on: 'roles' },
  ],
}
