import { WorkflowConfig } from 'payload'
import { embed } from 'ai'
import { createHash } from 'crypto'
import { model } from '../lib/ai'
import type { Thing } from '../payload.types'

type BatchEmbeddingsInput = {
  batchSize?: number;
}

export const batchEmbeddings: WorkflowConfig<'batchEmbeddings'> = {
  slug: 'batchEmbeddings',
  inputSchema: [
    {
      name: 'batchSize',
      type: 'number',
      required: false,
    },
  ],
  handler: async ({ job, tasks, req }: { 
    job: { input: BatchEmbeddingsInput }, 
    tasks: any, 
    req: any 
  }) => {
    const { payload } = req
    const { batchSize = 10 } = job.input

    console.log(`Starting batch embedding job with batch size ${batchSize}`)

    try {
      const thingsToEmbed = await payload.find({
        collection: 'things',
        where: {
          or: [
            { embeddedAt: { exists: false } },
            { embeddingHash: { exists: false } },
          ]
        },
        limit: batchSize,
      })

      console.log(`Found ${thingsToEmbed.docs.length} Things to embed`)

      if (thingsToEmbed.docs.length === 0) {
        console.log('No Things to embed, skipping')
        return { processed: 0 }
      }

      const results = await Promise.all(
        thingsToEmbed.docs.map(async (thing: Thing) => {
          try {
            const contentToEmbed = thing.content || JSON.stringify(thing.data || {})
            const contentHash = createHash('md5').update(contentToEmbed).digest('hex')

            if (thing.embeddingHash === contentHash) {
              return { id: thing.id, skipped: true }
            }

            const { embedding } = await embed({
              model: model.embedding('text-embedding-3-large'),
              value: contentToEmbed,
            })

            const truncatedEmbedding = embedding.slice(0, 256)

            await payload.update({
              collection: 'things',
              id: thing.id,
              data: {
                embeddings: truncatedEmbedding as any,
                embeddedAt: new Date().toISOString(),
                embeddingHash: contentHash,
              },
            })

            return { id: thing.id, embedded: true }
          } catch (error) {
            console.error(`Error embedding Thing/${thing.id}:`, error)
            return { id: thing.id, error: error.message }
          }
        })
      )

      console.log(`Completed batch embedding job, processed ${results.length} Things`)
      return { processed: results.length, results }
    } catch (error) {
      console.error('Error in batch embedding job:', error)
      throw error
    }
  },
}
