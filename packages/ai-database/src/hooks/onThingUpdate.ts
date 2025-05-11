import type { CollectionAfterOperationHook } from 'payload'
import { waitUntil } from '@vercel/functions'

export const onThingUpdate: CollectionAfterOperationHook<'things'> = async ({ req, operation, result }) => {
  const { payload } = req

  if (operation !== 'update') return result

  let thingId: string | undefined
  
  if (result.docs && result.docs.length > 0) {
    thingId = result.docs[0].id
  } else if (typeof result === 'object' && result !== null) {
    thingId = (result as any).id || (result as any).doc?.id
  }
  
  if (!thingId) return result

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
      const job = await payload.jobs.queue({ 
        workflow: 'batchEmbeddings', 
        input: { 
          batchSize: 20 
        } 
      })
      waitUntil(payload.jobs.run())
    }
  } catch (error) {
    console.error(`Error processing update for Thing/${thingId}:`, error)
  }

  return result
}
