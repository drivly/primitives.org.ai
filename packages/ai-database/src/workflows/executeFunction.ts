import { WorkflowConfig } from 'payload'
import { waitUntil } from '@vercel/functions'

export const executeFunction: WorkflowConfig<'executeFunction'> = {
  slug: 'executeFunction',
  handler: async ({ job, tasks, req }) => {
    const { payload } = req


    
  },
}