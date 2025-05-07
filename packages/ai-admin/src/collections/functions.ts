import type { CollectionConfig } from 'payload'

export const Functions: CollectionConfig = {
  slug: 'functions',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
    description: 'Reusable AI capabilities with typed inputs and outputs',
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { position: 'sidebar' } },
    {
      name: 'type',
      type: 'select',
      options: ['Generation', 'Code', 'Human', 'Agent'],
      defaultValue: 'Generation',
      admin: { position: 'sidebar' },
    },
    {
      name: 'public',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Make this function available to other users',
      },
    },
    {
      name: 'format',
      type: 'select',
      options: ['Object', 'ObjectArray', 'Text', 'TextArray', 'Markdown', 'Code', 'Video'],
      defaultValue: 'Object',
      admin: {
        position: 'sidebar',
        condition: (data: { type?: string }) => data?.type === 'Generation',
      },
    },
    {
      name: 'shape',
      type: 'json',
      admin: {
        condition: (data: { type?: string; format?: string }) => (data?.type === 'Generation' && ['Object', 'ObjectArray'].includes(data?.format || '')) || ['Human', 'Agent'].includes(data?.type || ''),
      },
    },
    {
      name: 'code',
      type: 'code',
      admin: {
        language: 'typescript',
        condition: (data: { type?: string }) => data?.type === 'Code',
      },
    },
    {
      name: 'prompt',
      type: 'text', // Changed from relationship to text for testing
      admin: {
        position: 'sidebar',
        description: 'Prompt text or identifier',
        condition: (data: { type?: string }) => data?.type === 'Generation',
      },
    },
    {
      name: 'examples',
      type: 'array',
      fields: [
        {
          name: 'example',
          type: 'json',
          admin: {
            description: 'Example arguments for this function',
          },
        },
      ],
    }
  ],
}
