import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

export const Functions: CollectionConfig = {
  slug: 'functions',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
  },
  versions: true,
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'description', type: 'code', admin: { language: 'mdx', editorOptions } },
  ],
}