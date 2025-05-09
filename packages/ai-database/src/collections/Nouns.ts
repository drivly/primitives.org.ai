import type { CollectionConfig } from 'payload'
import dedent from 'dedent'
import { editorOptions } from '@/lib/collections'

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
  fields: [
    { type: 'row', fields: [
      { name: 'id', type: 'text', required: true, label: 'Noun' },
      { name: 'is', type: 'relationship', relationTo: 'nouns', label: 'is' },
    ]},
    { name: 'schema', type: 'code', defaultValue, admin: { language: 'mdx', editorOptions } },
    { name: 'things', type: 'join', collection: 'things', on: 'is' },
  ],
}
