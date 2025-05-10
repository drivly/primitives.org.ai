import type { CollectionConfig } from 'payload'
import dedent from 'dedent'
import { editorOptions } from '@/lib/collections'
import matter from 'gray-matter'

const defaultValue = dedent`
---
$id: 
$type: 
name: 
image: 
description: 
sameAs: 
subjectOf:
url: 
---

# {name}

{description}

`

export const Nouns: CollectionConfig = {
  slug: 'nouns',
  admin: {
    group: 'Data'
  },
  versions: true,
  fields: [
    { type: 'row', fields: [
      { name: 'ns', type: 'text', label: 'Namespace' },
      { name: 'id', type: 'text', required: true, label: 'Noun' },
      { name: 'type', type: 'relationship', relationTo: 'nouns', hasMany: true },
      { name: 'format', type: 'select', defaultValue: 'Object', options: ['Object', 'Markdown'] },
    ]},
    { name: 'schema', type: 'code', defaultValue, admin: { language: 'mdx', editorOptions } },
    { name: 'things', type: 'join', collection: 'things', on: 'type' },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const { content } = matter(data.schema)
        data.content = content
        return data
      },
    ],
  }
}
