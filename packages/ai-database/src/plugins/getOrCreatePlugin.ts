import { Config } from 'payload'

/**
 * Plugin that adds a getOrCreate method to the database interface
 * This method checks if a record exists in a collection using provided criteria
 * If it exists, it returns the record without modifying it
 * If it doesn't exist, it creates a new record with the provided data and returns it
 */
export const getOrCreatePlugin = () => {
  return (incomingConfig: Config): Config => {
    const config = { ...incomingConfig }
    
    const existingOnInit = config.onInit
    
    config.onInit = async (payload) => {
      if (existingOnInit) {
        await existingOnInit(payload)
      }
      
      payload.db.getOrCreate = async function<T = any>({
        collection,
        data,
        where
      }: {
        collection: string,
        data: Record<string, any>,
        where: Record<string, any>
      }): Promise<T> {
        try {
          const existingRecord = await this.findOne({
            collection,
            where
          });
          
          if (existingRecord) {
            return existingRecord as unknown as T;
          }
          
          return await this.create({
            collection,
            data
          }) as unknown as T;
        } catch (error) {
          console.error(`Error in getOrCreate for collection '${collection}':`, error);
          
          throw error;
        }
      };
    }
    
    return config
  }
}
