# AI Observability

A Payload CMS instance for observability of AI operations with support for multiple database types.

## Features

- Multiple database support (MongoDB, PostgreSQL, SQLite)
- Collections for tracking AI operations:
  - Completions - Records of AI model completion requests and responses
  - Functions - AI function definitions
  - Executions - Records of function executions
  - Batches - Batches of completions
  - Evals - Evaluation metrics
  - Experiments - A/B testing experiments

## Installation

```bash
npm install ai-observability
# or
yarn add ai-observability
# or
pnpm add ai-observability
```

## Usage

```typescript
import { initializePayload, createDatabase } from 'ai-observability'

// Initialize Payload CMS with default configuration
const payload = await initializePayload()

// Create a database client
const db = createDatabase(payload)

// Use the database client to interact with collections
const completions = await db.completions.find({ status: 'success' })
```

## Database Configuration

By default, ai-observability uses SQLite. You can configure the database connection using the `DATABASE_URI` environment variable:

```
# MongoDB
DATABASE_URI=mongodb://username:password@localhost:27017/database

# PostgreSQL
DATABASE_URI=postgresql://username:password@localhost:5432/database

# SQLite (default)
DATABASE_URI=sqlite://.data/ai-observability.db
```

## Collections

### Completions

Records of AI model completion requests and responses.

### Functions

AI function definitions.

### Executions

Records of function executions.

### Batches

Batches of completions.

### Evals

Evaluation metrics for AI operations.

### Experiments

A/B testing experiments for AI operations.

## License

MIT
