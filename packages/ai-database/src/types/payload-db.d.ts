import 'payload'
import { Config } from '../payload.types'

declare module 'payload' {
  export type CollectionSlug = keyof Config['collections']
  
  export interface DatabaseAdapter {
    getOrCreate<T = any>({
      collection,
      data,
      where
    }: {
      collection: CollectionSlug,
      data: Record<string, any>,
      where: Record<string, any>
    }): Promise<T>;
  }
}
