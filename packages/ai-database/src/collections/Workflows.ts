import type { CollectionConfig } from 'payload'
import { editorOptions } from '@/lib/collections'

editorOptions.language = 'ts'

const defaultValue = `
export default (event, { ai, db }) => {
  const { data } = event
}
`.trim()

export const Workflows: CollectionConfig = {
  slug: 'workflows',
  admin: {
    group: 'AI',
    useAsTitle: 'name',
  },
  versions: true,
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'code', type: 'code', defaultValue, admin: { editorOptions } },
  ],
}