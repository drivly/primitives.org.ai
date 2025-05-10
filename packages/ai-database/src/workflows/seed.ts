import { WorkflowConfig } from 'payload'

export const seed: WorkflowConfig<'seed'> = {
  slug: 'seed',
  retries: 5,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req

    const ts = new Date().toISOString()

    await tasks.seedFunctions(ts, { input: {}})
    await tasks.seedModels(ts, { input: {}})
    await tasks.seedRoles(ts, { input: {}})
    await tasks.seedSchema(ts, { input: {}})

    
  },
}