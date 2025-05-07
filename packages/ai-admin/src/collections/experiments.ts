import type { CollectionConfig } from 'payload'

export const Experiments: CollectionConfig = {
  slug: 'experiments',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
    description: 'Feature flags and A/B testing experiments with real-world user feedback metrics',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique name for the experiment (used as the feature flag key)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this experiment is testing',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        description: 'Current status of the experiment',
      },
    },
    {
      name: 'variants',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Different variations to test in this experiment',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique identifier for this variant',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Description of this variant',
          },
        },
        {
          name: 'isControl',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Whether this is the control/baseline variant',
          },
        },
        {
          name: 'config',
          type: 'json',
          required: true,
          admin: {
            description: 'Configuration values for this variant',
          },
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      admin: {
        description: 'Metrics to track for this experiment',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the metric',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Description of what this metric measures',
          },
        },
        {
          name: 'higherIsBetter',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Whether higher values for this metric are better',
          },
        },
      ],
    },
    {
      name: 'duration',
      type: 'group',
      admin: {
        description: 'Duration of the experiment',
      },
      fields: [
        {
          name: 'startDate',
          type: 'date',
          admin: {
            description: 'When the experiment starts',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'When the experiment ends',
          },
        },
      ],
    },
    {
      name: 'results',
      type: 'json',
      admin: {
        description: 'Aggregated results of the experiment (updated periodically)',
        readOnly: true,
      },
    },
  ],
}
