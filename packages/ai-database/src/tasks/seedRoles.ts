import { TaskConfig } from 'payload'

export const seedRoles: TaskConfig<'seedRoles'> = {
  slug: 'seedRoles',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req

    await payload.db.upsert({
      collection: 'roles',
      data: {
        id: 'admin',
      },
      where: { id: { equals: 'admin' } },
    })
    
    return {
      output: {},
      state: 'succeeded'
    }
  },  
}