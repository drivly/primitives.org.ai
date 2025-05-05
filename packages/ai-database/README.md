# ai-database

[![npm version](https://img.shields.io/npm/v/ai-database.svg)](https://www.npmjs.com/package/ai-database)
[![License](https://img.shields.io/npm/l/ai-database.svg)](https://github.com/drivly/primitives.org.ai/blob/main/packages/ai-database/LICENSE)

Minimalistic package that exports Payload CMS collection configurations and Next.js API route handlers to simplify database operations in AI applications.

## Features

- Pre-configured Payload CMS collections for Nouns, Verbs, Resources, and Relationships
- Ready-to-use Next.js API route handlers for all HTTP methods
- Support for List/Search + CRUD operations in the format of `/api/[type]/[id]`
- Simple integration with just one import statement

## Installation

```bash
npm install ai-database
# or
yarn add ai-database
# or
pnpm add ai-database
```

## Usage

### Quick Start

The simplest way to use this package is to export everything in your Next.js API route file:

```typescript
// app/api/[[...path]]/route.ts
export * from 'ai-database'
```

This single line gives you working API endpoints for all your collections with full CRUD support.

### Collection Access

Access your collections through the API endpoints:

- `GET /api/nouns` - List all nouns
- `GET /api/nouns/123` - Get a specific noun
- `POST /api/nouns` - Create a new noun
- `PATCH /api/nouns/123` - Update a noun
- `DELETE /api/nouns/123` - Delete a noun

The same pattern works for all collections: `verbs`, `resources`, and `relationships`.

### Filtering and Pagination

The API supports filtering and pagination through query parameters:

```
GET /api/nouns?limit=20&page=2&name=User
```

### Custom Implementation

If you need more control, you can import and use the individual components:

```typescript
// Import collections
import { Nouns, Verbs, Resources, Relationships } from 'ai-database'

// Import database client
import { createPayloadDB, initializePayloadDB } from 'ai-database'

// Import API wrapper
import { API } from 'ai-database'

// Create a custom API handler
export const GET = API(async (request, { db }) => {
  // Your custom implementation
})
```

## Configuration

### Payload CMS Configuration

To initialize the database client with your Payload config:

```typescript
import { initializePayloadDB } from 'ai-database'
import config from '../payload.config'

const db = await initializePayloadDB(config)
```

### Collection Customization

You can extend or modify the default collections:

```typescript
import { Nouns } from 'ai-database'
import type { CollectionConfig } from 'payload'

// Extend the Nouns collection
const CustomNouns: CollectionConfig = {
  ...Nouns,
  fields: [
    ...Nouns.fields,
    { name: 'customField', type: 'text' }
  ]
}
```

## API Reference

### Collections

- `Nouns` - Collection for noun entities
- `Verbs` - Collection for verb actions
- `Resources` - Collection for structured data resources
- `Relationships` - Collection for semantic relationships

### Database Client

- `createPayloadDB(payload)` - Creates a database client from a Payload instance
- `initializePayloadDB(config)` - Initializes a Payload client from a config

### API Wrapper

- `API(handler)` - Creates an API handler with enhanced context

### Route Handlers

- `GET` - Handler for retrieving resources
- `POST` - Handler for creating resources
- `PATCH` - Handler for updating resources
- `DELETE` - Handler for deleting resources

## Dependencies

- [Payload CMS](https://payloadcms.com/) - Headless CMS
- [Next.js](https://nextjs.org/) - React framework
