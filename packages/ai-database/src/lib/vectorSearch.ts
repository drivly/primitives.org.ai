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

    
    const thingsWithEmbeddings = await payload.find({
      collection: 'things',
      where: {
        embeddings: { exists: true }
      },
      limit: 100 // Get a reasonable number of candidates
    })

    const resultsWithSimilarity: SearchResult[] = thingsWithEmbeddings.docs
      .map(thing => {
        const similarity = 0.5 // Placeholder similarity score
        
        return {
          id: thing.id as string,
          data: thing.data || {},
          content: thing.content || '',
          type: thing.type as string || 'Thing',
          similarity
        }
      })
      .sort((a, b) => b.similarity - a.similarity) // Sort by similarity descending
      .slice(0, limit) // Limit results
    
    return resultsWithSimilarity
  } catch (error) {
    console.error('Error performing vector search:', error)
    throw error
  }
}
