import {
  runAdmin
} from "./chunk-5VJNKVUH.js";

// src/index.ts
var createDatabase = (config) => {
  return {
    collection: (name) => ({
      store: async (document) => {
      },
      search: async (query) => []
    })
  };
};
var tools = {
  vectorSearch: (config) => ({
    name: "vectorSearch",
    description: "Search for documents using vector search",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" }
      },
      required: ["query"]
    },
    execute: async ({ query }) => []
  })
};
export {
  createDatabase,
  runAdmin,
  tools
};
