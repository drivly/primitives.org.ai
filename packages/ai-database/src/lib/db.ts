import { db as adapter } from '../databases/sqlite'
import { z } from 'zod'
import { Noun, Thing } from '@/payload.types'

interface NounDefinition {
  id: string;
  schema?: z.ZodType<any>;
  generate?: string | null;
  context?: string;
  [key: string]: any;
}

interface NounQuery {
  [key: string]: any;
}

/**
 * DB function for defining Nouns, especially schemas for generation
 * @param nounDefinition Definition of the noun including schema
 * @returns Object with methods for interacting with this noun
 */
export function DB(nounDefinition: NounDefinition) {
  if (!nounDefinition || typeof nounDefinition !== 'object') {
    throw new Error('Noun definition must be an object')
  }

  const { id, schema, generate, context } = nounDefinition

  if (!id || typeof id !== 'string') {
    throw new Error('Noun definition must include an id string')
  }

  const createOrUpdateNoun = async () => {
    return await (adapter as any).getOrCreate({
      collection: 'nouns',
      data: {
        id,
        context: context || '',
        generate: generate || null,
      },
      where: { id: { equals: id } }
    }) as Noun
  }

  createOrUpdateNoun()

  return {
    /**
     * Create a new instance of this noun (Thing)
     * @param data Data for the Thing
     * @returns Created Thing
     */
    create: async (data: any) => {
      if (schema && typeof schema.parse === 'function') {
        schema.parse(data)
      }

      return await (adapter as any).create({
        collection: 'things',
        data: {
          id: `${id}-${Date.now()}`,
          type: id,
          data
        }
      }) as Thing
    },

    /**
     * Find instances of this noun
     * @param query Query parameters
     * @returns Array of Things
     */
    find: async (query: NounQuery = {}) => {
      return await (adapter as any).find({
        collection: 'things',
        where: {
          type: { equals: id },
          ...query
        }
      }) as Thing[]
    },

    /**
     * Find one instance of this noun
     * @param query Query parameters
     * @returns Thing or null
     */
    findOne: async (query: NounQuery = {}) => {
      return await (adapter as any).findOne({
        collection: 'things',
        where: {
          type: { equals: id },
          ...query
        }
      }) as Thing | null
    },

    /**
     * Update an instance of this noun
     * @param id Thing ID
     * @param data New data
     * @returns Updated Thing
     */
    update: async (thingId: string, data: any) => {
      return await (adapter as any).update({
        collection: 'things',
        id: thingId,
        data: { data }
      }) as Thing
    },

    /**
     * Delete an instance of this noun
     * @param id Thing ID
     */
    delete: async (thingId: string) => {
      return await (adapter as any).delete({
        collection: 'things',
        id: thingId
      })
    }
  }
}

/**
 * db function for comprehensive search and CRUD operations on all entities
 * @returns Object with methods for searching and CRUD operations
 */
export const db = adapter;
