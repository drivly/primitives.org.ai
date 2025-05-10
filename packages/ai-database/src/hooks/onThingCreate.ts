import type { CollectionAfterOperationHook } from 'payload'
import { waitUntil } from '@vercel/functions'
import { createHash } from 'crypto'

export const onThingCreate: CollectionAfterOperationHook<'things'> = async ({ req, operation, result }) => {
  const { payload } = req

  if (operation !== 'create') return result

  const job = await payload.jobs.queue({ workflow: 'generateThing', input: result })
  
  const contentToEmbed = result.content || JSON.stringify(result.data || {})
  const contentHash = createHash('md5').update(contentToEmbed).digest('hex')
  
  const embeddingJob = await payload.jobs.queue({ 
    workflow: 'generateEmbeddings', 
    input: { 
      id: result.id, 
      contentHash 
    } 
  })
  
  waitUntil(payload.jobs.run())

  return result
}
