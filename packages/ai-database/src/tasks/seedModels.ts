import { TaskConfig } from 'payload'

export const seedModels: TaskConfig<'seedModels'> = {
  slug: 'seedModels',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req

    const { data } = await fetch('https://openrouter.ai/api/frontend/models/find').then(res => res.json())

    for (const model of data.models) {
      const [ creator, id ] = model.slug.split('/')
      if (id.endsWith(':free')) continue
      await payload.db.upsert({
        collection: 'models',
        data: { id, data: model },
        where: { id: { equals: id } },
      })
    }
    
    return {
      output: {},
      state: 'succeeded'
    }
  },
}