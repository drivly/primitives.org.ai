import { Payload } from 'payload'

type PayloadRequest = {
  payload: Payload
}

export const setupScheduledJobs = async (req: PayloadRequest) => {
  const { payload } = req

  setInterval(async () => {
    try {
      const existingJobs = await payload.find({
        collection: 'payload-jobs',
        where: {
          and: [
            { workflowSlug: { equals: 'batchEmbeddings' } },
            { hasError: { equals: false } },
            { completedAt: { exists: false } },
          ],
        },
      })

      if (existingJobs.docs.length === 0) {
        await payload.jobs.queue({ 
          workflow: 'batchEmbeddings', 
          input: { 
            batchSize: 50 
          } 
        })
        
        await payload.jobs.run()
      }
    } catch (error) {
      console.error('Error scheduling batch embedding job:', error)
    }
  }, 60 * 60 * 1000) // Run every hour
}
