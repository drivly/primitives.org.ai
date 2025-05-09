import { WorkflowConfig } from 'payload'

export const seedData: WorkflowConfig<'seed'> = {
  slug: 'seed',
  retries: 5,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req

    const ts = new Date().toISOString()

    await tasks.seedModels(ts, { input: {}})

    
  },
}