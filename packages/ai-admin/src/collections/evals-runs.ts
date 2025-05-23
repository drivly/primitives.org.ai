import type { CollectionConfig } from 'payload'

export const EvalsRuns: CollectionConfig = {
  slug: 'evalRuns',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
    description: 'Records of evaluation test runs and their results',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'testIds',
      type: 'array',
      fields: [
        {
          name: 'test',
          type: 'relationship',
          relationTo: 'evals',
          required: true,
        },
      ],
      admin: {
        description: 'References to evaluation tests included in this run',
      },
    },
    {
      name: 'results',
      type: 'array',
      fields: [
        {
          name: 'result',
          type: 'relationship',
          relationTo: 'evalResults',
        },
      ],
      admin: {
        description: 'References to evaluation results for this run',
      },
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: {
        description: 'When the evaluation run started',
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: {
        description: 'When the evaluation run completed',
      },
    },
  ],
}
