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
  similarity: number;
}

/**
 * Performs a vector search on the Things collection using cosine similarity
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
    const results = await db.raw({
      query: sql`
        SELECT t.id, t.data, t.content, t.type, 
               vector_cosine_similarity(t.embeddings, vector32(${JSON.stringify(truncatedEmbedding)})) as similarity
        FROM things t
        WHERE t.embeddings IS NOT NULL
        ORDER BY similarity DESC
        LIMIT ${limit}
      `,
    })

    return results.map((result: any) => ({
      id: result.id,
      data: result.data ? JSON.parse(result.data) : {},
      content: result.content || '',
      type: result.type || 'Thing',
      similarity: result.similarity
    }))
  } catch (error) {
    console.error('Error performing vector search:', error)
    throw error
  }
}
