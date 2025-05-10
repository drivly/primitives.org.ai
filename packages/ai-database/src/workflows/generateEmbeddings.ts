import { WorkflowConfig } from 'payload'
import { embed } from 'ai'
import { z } from 'zod'
import { model } from '../lib/ai'
import type { Thing } from '../payload.types'

type GenerateEmbeddingsInput = {
  id: string;
  contentHash: string;
}

export const generateEmbeddings: WorkflowConfig<'generateEmbeddings'> = {
  slug: 'generateEmbeddings',
  inputSchema: [
    {
      name: 'id',
      type: 'text',
      required: true,
    },
    {
      name: 'contentHash',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({ job, tasks, req }: { 
    job: { input: GenerateEmbeddingsInput }, 
    tasks: any, 
    req: any 
  }) => {
    const { payload } = req
    const { id, contentHash } = job.input

    console.log(`Generating embeddings for Thing/${id}`)

    try {
      const thing = await payload.findByID({
        collection: 'things',
        id: id,
      }) as Thing

      const contentToEmbed = thing.content || JSON.stringify(thing.data || {})

      const { embedding } = await embed({
        model: model.embedding('text-embedding-3-large'),
        value: contentToEmbed,
      })

      const truncatedEmbedding = embedding.slice(0, 256)

      const updatedThing = await payload.update({
        collection: 'things',
        id: id,
        data: {
          embeddings: truncatedEmbedding as any,
          embeddedAt: new Date().toISOString(),
          embeddingHash: contentHash,
        },
      })

      console.log(`Successfully embedded Thing/${id}`)
      return updatedThing
    } catch (error) {
      console.error(`Error embedding Thing/${id}:`, error)
      throw error
    }
  },
}
