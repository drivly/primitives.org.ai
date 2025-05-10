import type { CollectionAfterOperationHook } from 'payload'
import { waitUntil } from '@vercel/functions'
import { createHash } from 'crypto'
import type { Thing } from '@/payload.types'

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
    const thing = await payload.findByID({
      collection: 'things',
      id: thingId,
    }) as Thing

    const contentToEmbed = thing.content || JSON.stringify(thing.data || {})
    const contentHash = createHash('md5').update(contentToEmbed).digest('hex')

    const existingHash = (thing as any).embeddingHash
    if (contentHash === existingHash) {
      return result
    }

    const existingJobs = await payload.find({
      collection: 'payload-jobs',
      where: {
        and: [
          { workflowSlug: { equals: 'generateEmbeddings' } },
          { 'input.id': { equals: thingId } },
          { hasError: { equals: false } },
          { completedAt: { exists: false } },
        ],
      },
    })

    if (existingJobs.docs.length === 0) {
      const job = await payload.jobs.queue({ 
        workflow: 'generateEmbeddings', 
        input: { 
          id: thingId, 
          contentHash 
        } 
      })
      waitUntil(payload.jobs.run())
    }
  } catch (error) {
    console.error(`Error processing update for Thing/${thingId}:`, error)
  }

  return result
}
