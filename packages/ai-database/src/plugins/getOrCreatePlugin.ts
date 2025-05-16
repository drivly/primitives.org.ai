import { Config } from 'payload'
import { Payload, CollectionSlug } from 'payload'

/**
 * Plugin that adds getOrCreate functionality to the database
 */
export const getOrCreatePlugin = () => {
  return (incomingConfig: Config): Config => {
    return {
      ...incomingConfig,
      
      onInit: (payload: Payload) => {
        (payload.db as any).getOrCreate = async function<T = any>({
          collection,
          data,
          where
        }: {
          collection: CollectionSlug,
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
        
        if (incomingConfig.onInit) {
          incomingConfig.onInit(payload);
        }
      },
    };
  };
};
