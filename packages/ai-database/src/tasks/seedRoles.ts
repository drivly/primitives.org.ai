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

    await payload.db.upsert({
      collection: 'roles',
      data: {
        id: 'user',
      },
      where: { id: { equals: 'user' } },
    })

    if (process.env.AUTOLOGIN_EMAIL) {
      await payload.db.upsert({
        collection: 'users',
        data: {
          email: process.env.AUTOLOGIN_EMAIL,
          password: process.env.AUTOLOGIN_PASSWORD,
          role: 'admin',
        },
        where: { email: { equals: process.env.AUTOLOGIN_EMAIL } },
      })
    }
    
    return {
      output: {},
      state: 'succeeded'
    }
  },  
}