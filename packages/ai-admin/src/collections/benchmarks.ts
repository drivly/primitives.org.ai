import type { CollectionConfig } from 'payload'

export const Benchmarks: CollectionConfig = {
  slug: 'benchmarks',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
    description: 'Tracks performance benchmarks for AI functions and models',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'metrics', type: 'array', fields: [{ name: 'metric', type: 'text' }] },
  ],
}
