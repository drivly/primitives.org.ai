import { embed } from 'ai'
import { model } from './ai'
import { getPayload } from 'payload'
import config from '../payload.config'
import { sql } from '@payloadcms/db-sqlite/drizzle'

interface SearchResult {
  id: string;
  data: any;
  content: string;
  type: string;
  distance: number;
}

/**
 * Performs a vector search on the Things collection using SQLite's vector_top_k function
 * @param query The search query to find similar Things
 * @param limit Maximum number of results to return (default: 10)
 * @returns Array of Things ordered by similarity to the query
 */
export async function vectorSearch(query: string, limit: number = 10): Promise<SearchResult[]> {
  try {
    const { embedding } = await embed({
      model: model.embedding('text-embedding-3-large'),
      value: query,
    })

    const truncatedEmbedding = embedding.slice(0, 256)

    const payload = await getPayload({ config })
    const db = payload.db as any // Cast to any to access raw method

    const topResults = await db.raw({
      query: sql`
        SELECT id, distance
        FROM vector_top_k('things_embeddings_idx', vector32(${JSON.stringify(truncatedEmbedding)}), ${limit})
      `,
    })

    if (!topResults || topResults.length === 0) {
      return []
    }

    const thingIds = topResults.map((result: any) => result.id)
    
    const things = await payload.find({
      collection: 'things',
      where: {
        id: {
          in: thingIds,
        },
      },
    })

    return topResults.map((result: any) => {
      const thing = things.docs.find((t: any) => t.id === result.id)
      return {
        id: result.id,
        data: thing ? (thing.data || {}) : {},
        content: thing ? (thing.content || '') : '',
        type: thing ? (thing.type || 'Thing') : 'Thing',
        distance: result.distance
      }
    })
  } catch (error) {
    console.error('Error performing vector search:', error)
    throw error
  }
}
