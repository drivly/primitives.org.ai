import { CollectionConfig } from 'payload/types'

export const Goals: CollectionConfig = {
  slug: 'goals',
  admin: {
    group: 'Business',
    useAsTitle: 'title',
    description: 'Manages objectives and key results for tracking progress',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'objective',
      type: 'text',
      required: true,
      admin: {
        description: 'The objective of this goal',
      },
    },
    {
      name: 'keyResults',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          required: true,
        },
        {
          name: 'kpiRelationship',
          type: 'relationship',
          relationTo: 'kpis',
        },
      ],
    },
  ],
}
