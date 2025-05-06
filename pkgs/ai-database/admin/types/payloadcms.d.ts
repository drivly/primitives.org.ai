declare module '@payloadcms/db-postgres' {
  export interface PostgresAdapterOptions {
    pool: {
      connectionString?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
  
  export function postgresAdapter(options: PostgresAdapterOptions): any;
}

declare module '@payloadcms/db-mongodb' {
  export interface MongooseAdapterOptions {
    url: string;
    [key: string]: any;
  }
  
  export function mongooseAdapter(options: MongooseAdapterOptions): any;
}
