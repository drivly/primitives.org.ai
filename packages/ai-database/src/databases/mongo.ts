import { mongooseAdapter } from '@payloadcms/db-mongodb'

/**
 * MongoDB adapter with vector storage support
 */
const adapter = mongooseAdapter({
  url: process.env.DATABASE_URI || 'mongodb://localhost/ai-database',
  
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
  
  customizeSchema: ({ collections }) => {
    const { nouns, things } = collections
    
    if (nouns) {
      nouns.schema.add({
        embeddings: {
          type: [Number],
          index: true,
          sparse: true,
        }
      })
      
      nouns.schema.methods.vectorSearch = async function(vector, limit = 10) {
        const collection = this.collection
        
        const result = await collection.aggregate([
          {
            $vectorSearch: {
              queryVector: vector,
              path: 'embeddings',
              numCandidates: limit * 10,
              limit: limit,
              index: 'nouns_embeddings_index',
            }
          }
        ]).toArray()
        
        return result
      }
    }
    
    if (things) {
      things.schema.add({
        embeddings: {
          type: [Number],
          index: true, 
          sparse: true,
        }
      })
      
      things.schema.methods.vectorSearch = async function(vector, limit = 10) {
        const collection = this.collection
        
        const result = await collection.aggregate([
          {
            $vectorSearch: {
              queryVector: vector,
              path: 'embeddings',
              numCandidates: limit * 10,
              limit: limit,
              index: 'things_embeddings_index',
            }
          }
        ]).toArray()
        
        return result
      }
    }
  }
})

export const db = adapter
