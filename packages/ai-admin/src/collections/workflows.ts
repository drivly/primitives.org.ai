import type { CollectionConfig } from 'payload'

export const Workflows: CollectionConfig = {
  slug: 'workflows',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
    description: 'Orchestrates functions into reusable business processes',
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'type', type: 'code', admin: { language: 'typescript' } },
    { name: 'code', type: 'code', admin: { language: 'typescript' } },
    { name: 'functions', type: 'relationship', relationTo: 'functions' },
    {
      name: 'public',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Make this workflow available to other users',
      },
    },
  ],
}
