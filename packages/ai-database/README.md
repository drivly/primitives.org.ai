# `ai-database`

## Installation

```bash
npm install ai-database
```

## Usage

```ts
import { db } from 'ai-database'

const user = await db.users.findOne({ email: 'user@example.com' })
```

```ts
const user = await db.users.create({
  email: 'user@example.com',
  password: 'password',
})
```
