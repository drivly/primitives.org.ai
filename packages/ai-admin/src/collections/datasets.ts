import type { CollectionConfig } from 'payload'

export const Datasets: CollectionConfig = {
  slug: 'datasets',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
    description: 'Manages datasets used for training and evaluating AI models',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'data', type: 'json', admin: { description: 'Dataset content or metadata' } },
  ],
}
