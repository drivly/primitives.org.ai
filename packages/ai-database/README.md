# `ai-database`

[![npm version](https://img.shields.io/npm/v/ai-database.svg)](https://www.npmjs.com/package/ai-database)
[![License](https://img.shields.io/npm/l/ai-database.svg)](https://github.com/ai-primitives/primitives.org.ai/blob/main/packages/ai-database/LICENSE)

A minimalistic package that exports Payload CMS collections and Next.js API route handlers. This package provides a self-contained Payload CMS with a standalone Next.js admin app and SQLite as the default database.

## Features

- Payload CMS 3.0 integration
- Next.js standalone build for the admin app
- Multi-database support (SQLite, MongoDB, PostgreSQL)
- SQLite as the default database (no configuration required)
- Pre-integrated collections for AI data

## Installation

```bash
npm install ai-database
```

## Usage

### Starting the Admin Interface

After installation, you can start the Payload CMS admin interface with:

```bash
npx ai-database
```

This will start the admin interface at http://localhost:3000/admin.

```ts
import { db } from 'ai-database'
```

### Using Collections in Your Code

```ts
import { getPayload } from 'payload'
import { collections } from 'ai-database'

// Initialize Payload with the collections
const payload = await getPayload({
  // Your config here
  collections: collections,
})

// Use Payload's local API to access data
const user = await payload.find({
  collection: 'users',
  where: {
    email: {
      equals: 'user@example.com',
    },
  },
})
```

```ts
// Legacy API (for backward compatibility)
const user = await db.users.create({
  email: 'user@example.com',
  password: 'password',
})
```

### Environment Variables

You can configure the database connection using environment variables:

- `DATABASE_URI`: Connection URI for your database (defaults to SQLite)
- `PAYLOAD_SECRET`: Secret key for Payload CMS (auto-generated if not provided)
- `PORT`: Port to run the admin interface (defaults to 3000)

## Database Support

This package supports multiple database types:

- SQLite (default, no configuration required)
- MongoDB (requires `@payloadcms/db-mongodb` to be installed)
- PostgreSQL (requires `@payloadcms/db-postgres` to be installed)

The database type is automatically detected from the `DATABASE_URI` environment variable.

## Dependencies

- Payload CMS 3.0
- Next.js 14.0+
- SQLite adapter (included)
