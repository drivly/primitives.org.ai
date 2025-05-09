# ai-admin

[![npm version](https://img.shields.io/npm/v/ai-admin.svg)](https://www.npmjs.com/package/ai-admin)
[![License](https://img.shields.io/npm/l/ai-admin.svg)](https://github.com/drivly/primitives.org.ai/blob/main/packages/ai-admin/LICENSE)

Pre-configured Payload CMS instance for managing AI primitives.

## Features

- Ready-to-use Payload CMS configurations for AI-related data
- Pre-configured collections for Functions, Workflows, Models, and more
- Simple integration with extensible configuration
- Support for MongoDB database

## Installation

```bash
npm install ai-admin
# or
yarn add ai-admin
# or
pnpm add ai-admin
```

## Usage

### Quick Start

```typescript
// Create a Payload CMS configuration
import { createAdminConfig } from 'ai-admin'

const config = createAdminConfig({
  // Your custom options here
  admin: {
    user: 'users',
  }
})

export default config
```

### Collection Access

You can import specific collections:

```typescript
import { Functions, Workflows, Models } from 'ai-admin'
```

### Custom Configuration

Extend the default configuration with your own options:

```typescript
import { createAdminConfig } from 'ai-admin'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

const config = createAdminConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- My Admin',
    },
  },
  db: mongooseAdapter({
    url: process.env.CUSTOM_DATABASE_URI,
  }),
})
```

## Dependencies

- [Payload CMS](https://payloadcms.com/) - Headless CMS
- [MongoDB](https://www.mongodb.com/) - Database
