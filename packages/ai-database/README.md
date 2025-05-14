# `ai-database`

[![npm version](https://badge.fury.io/js/ai-database.svg)](https://badge.fury.io/js/ai-database)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A database abstraction layer for AI applications built on top of PayloadCMS.

## Installation

```bash
npm install ai-database
```

## Usage

### Standard Methods

```ts
import { db } from 'ai-database'

// Find a record
const user = await db.findOne({
  collection: 'users',
  where: { email: { equals: 'user@example.com' } }
})

// Create a record
const newUser = await db.create({
  collection: 'users',
  data: {
    email: 'user@example.com',
    password: 'password',
  }
})

// Update a record
const updatedUser = await db.update({
  collection: 'users',
  id: 'user-id',
  data: {
    email: 'updated@example.com'
  }
})

// Delete a record
await db.delete({
  collection: 'users',
  id: 'user-id'
})

// Upsert a record
const upsertedUser = await db.upsert({
  collection: 'users',
  data: {
    email: 'user@example.com'
  },
  where: { email: { equals: 'user@example.com' } }
})
```

### Extended Methods

#### getOrCreate

The `getOrCreate` method checks if a record exists in a specified collection using provided criteria. If it exists, it returns the record without modifying it. If it doesn't exist, it creates a new record with the provided data and returns it.

```ts
// Find or create a record
const role = await db.getOrCreate({
  collection: 'roles',
  data: { id: 'admin' },
  where: { id: { equals: 'admin' } }
})
```

## Dependencies

- [@payloadcms/db-sqlite](https://www.npmjs.com/package/@payloadcms/db-sqlite): ^3.33.0
- [payload](https://www.npmjs.com/package/payload): ^3.33.0
