import { CollectionConfig } from 'payload/types';
import { NextRequest, NextResponse } from 'next/server';
export { runAdmin } from './cli.mjs';
import 'child_process';

declare const Nouns: CollectionConfig;

declare const Verbs: CollectionConfig;

declare const Resources: CollectionConfig;

declare const Relationships: CollectionConfig;

/**
 * Types for payload database operations
 */
type CollectionQuery = Record<string, any>;
type CollectionData = Record<string, any>;
interface PayloadDBCollection {
    find: (query?: CollectionQuery) => Promise<any>;
    findOne: (query?: CollectionQuery) => Promise<any>;
    get: (id: string, query?: CollectionQuery) => Promise<any>;
    create: (data: CollectionData, query?: CollectionQuery) => Promise<any>;
    update: (id: string, data: CollectionData, query?: CollectionQuery) => Promise<any>;
    upsert: (id: string, data: CollectionData, query?: CollectionQuery) => Promise<any>;
    set: (id: string, data: CollectionData, query?: CollectionQuery) => Promise<any>;
    delete: (id: string, query?: CollectionQuery) => Promise<any>;
}
type PayloadDB = Record<string, PayloadDBCollection>;
/**
 * Creates a database client from a Payload CMS instance
 * @param payload - Payload CMS instance
 * @returns PayloadDB instance with collection proxies
 */
declare const createPayloadDB: (payload: any) => PayloadDB;
/**
 * Initialize a payload client from a config
 */
declare const initializePayloadDB: (config: any) => Promise<PayloadDB>;

/**
 * Context object passed to API handlers
 */
type ApiContext = {
    params: Record<string, string | string[]>;
    url: URL;
    path: string;
    domain: string;
    origin: string;
    db: PayloadDB;
    req: NextRequest;
};
type ApiHandler<T = any> = (req: NextRequest, ctx: ApiContext) => Promise<T> | T;
/**
 * Creates an API handler with enhanced context
 * @param handler - Function to handle the API request
 * @returns Next.js API handler function
 */
declare const API: (handler: ApiHandler) => (req: NextRequest, context: {
    params: Record<string, string | string[]>;
}) => Promise<NextResponse<any>>;

export { API, type ApiContext, type ApiHandler, type CollectionData, type CollectionQuery, Nouns, type PayloadDB, type PayloadDBCollection, Relationships, Resources, Verbs, createPayloadDB, initializePayloadDB };
