export { runAdmin } from './cli.js';

interface DatabaseConfig {
    namespace: string;
    vectorSearch?: boolean;
}
interface Document {
    [key: string]: any;
}
interface SearchQuery {
    query?: string;
    vector?: number[];
    threshold?: number;
}
interface SearchResult {
    [key: string]: any;
}
declare const createDatabase: (config: DatabaseConfig) => {
    collection: (name: string) => {
        store: (document: Document) => Promise<void>;
        search: (query: SearchQuery) => Promise<SearchResult[]>;
    };
};
declare const tools: {
    vectorSearch: (config: {
        collection: string;
        namespace: string;
    }) => {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                query: {
                    type: string;
                };
            };
            required: string[];
        };
        execute: ({ query }: {
            query: string;
        }) => Promise<SearchResult[]>;
    };
};

export { createDatabase, tools };
