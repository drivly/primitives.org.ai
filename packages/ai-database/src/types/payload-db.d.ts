import 'payload'

declare module 'payload' {
  export interface DatabaseAdapter {
    getOrCreate<T = any>({
      collection,
      data,
      where
    }: {
      collection: string,
      data: Record<string, any>,
      where: Record<string, any>
    }): Promise<T>;
  }
}
