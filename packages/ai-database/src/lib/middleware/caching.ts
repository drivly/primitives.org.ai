import { PayloadDB } from '../db'

// Define the options for the caching middleware
export interface PayloadCacheOptions {
  ttl?: number // Time to live in seconds
  maxChunkSize?: number // Maximum size for a single chunk in bytes
  collection?: string // Collection name in PayloadDB
}

const createCacheKey = (params: Record<string, any>): string => {
  return Buffer.from(JSON.stringify(params)).toString('base64')
}

/**
 * Create a caching middleware for AI model responses using PayloadDB
 * @param db PayloadDB instance
 * @param options Configuration options for the cache
 */
export const createPayloadCache = (db: PayloadDB, options: PayloadCacheOptions = {}) => {
  const ttl = options.ttl || 86400 // Default 1 day
  const maxChunkSize = options.maxChunkSize || 100 * 1024 // Default 100KB
  const collection = options.collection || 'cache'

  /**
   * Get a cached response from PayloadDB
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  const getCachedResponse = async (key: string): Promise<any | null> => {
    try {
      const cached = await db[collection]?.findOne({ key })

      if (cached && cached.freshUntil && new Date(cached.freshUntil) > new Date()) {
        if (cached.data) {
          return cached.data
        }

        if (cached.chunks && cached.chunkCount) {
          let assembledData: Record<string, any> = {}

          for (let i = 0; i < cached.chunkCount; i++) {
            const chunk = cached.chunks[i]
            if (chunk) {
              assembledData = { ...assembledData, ...chunk }
            }
          }

          return assembledData
        }
      }

      return null
    } catch (error) {
      console.error('Error retrieving cached response:', error)
      return null
    }
  }

  /**
   * Store a response in the cache
   * @param key Cache key
   * @param result Data to cache
   */
  const storeResponse = async (key: string, result: any): Promise<void> => {
    try {
      const freshUntil = new Date(Date.now() + ttl * 1000)

      const dataStr = JSON.stringify(result)

      if (dataStr.length <= maxChunkSize) {
        await db[collection]?.upsert(key, {
          key,
          data: result,
          freshUntil,
        })
      } else {
        const chunks: Record<number, any> = {}
        const chunksNeeded = Math.ceil(dataStr.length / maxChunkSize)

        const entries = Object.entries(result)
        const entriesPerChunk = Math.ceil(entries.length / chunksNeeded)

        for (let i = 0; i < chunksNeeded; i++) {
          const chunkEntries = entries.slice(i * entriesPerChunk, (i + 1) * entriesPerChunk)

          chunks[i] = Object.fromEntries(chunkEntries)
        }

        await db[collection]?.upsert(key, {
          key,
          chunks,
          chunkCount: chunksNeeded,
          freshUntil,
        })
      }
    } catch (error) {
      console.error('Error storing response in cache:', error)
    }
  }

  /**
   * Get a cached response or generate a new one
   * @param params Request parameters
   * @param generateFn Function to generate the response if not cached
   * @returns Response data
   */
  const getOrGenerate = async <T>(params: Record<string, any>, generateFn: () => Promise<T>): Promise<T> => {
    const key = createCacheKey(params)

    const cachedResponse = await getCachedResponse(key)

    if (cachedResponse) {
      return cachedResponse as T
    }

    const result = await generateFn()

    await storeResponse(key, result)

    return result
  }

  return {
    getOrGenerate,
    getCachedResponse,
    storeResponse,
  }
}
