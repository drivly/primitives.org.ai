import { Payload, CollectionSlug } from 'payload'

export const extendDatabase = (payload: Payload): void => {
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
}
