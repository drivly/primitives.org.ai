import type { CollectionConfig } from 'payload'

export const Things: CollectionConfig = {
  slug: 'things',
  admin: {
    group: 'Data'
  },
  versions: true,
  fields: [
    { type: 'row', fields: [
      { name: 'id', type: 'text', required: true, label: 'ID' },
      { name: 'is', type: 'relationship', relationTo: 'nouns', label: 'is' },
      { name: 'generation', type: 'relationship', relationTo: 'generations', admin: { readOnly: true } },
    ]},
    { name: 'data', type: 'json', admin: { editorOptions: { padding: { top: 20, bottom: 20 } } } },
    { name: 'content', type: 'code', admin: { language: 'mdx', editorOptions: { padding: { top: 20, bottom: 20 } } } },
    { name: 'relationships', type: 'array', fields: [
      { name: 'verb', type: 'relationship', relationTo: 'verbs' },
      { name: 'thing', type: 'relationship', relationTo: ['nouns', 'things'] },
    ]},
  ],
}
