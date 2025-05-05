# ai-props

[![npm version](https://img.shields.io/npm/v/ai-props.svg)](https://www.npmjs.com/package/ai-props)
[![License](https://img.shields.io/npm/l/ai-props.svg)](https://github.com/drivly/primitives.org.ai/blob/main/packages/ai-props/LICENSE)

A React component that uses render props to provide AI-generated content to children.

## Installation

```bash
npm install ai-props
# or
pnpm add ai-props
# or
yarn add ai-props
```

## Usage

```jsx
import { AI } from 'ai-props';
import { z } from 'zod';

// Define a schema for the AI to generate
const schema = z.object({
  name: z.string(),
  description: z.string(),
  features: z.array(z.string())
});

// Use the AI component with a render prop
function ProductDisplay() {
  return (
    <AI
      model='gpt-4o'
      schema={schema}
      prompt='Generate a product description for a new AI-powered smartphone'
    >
      {(data, { isStreaming }) => (
        <div>
          {isStreaming && <div>Loading...</div>}
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <ul>
            {data.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </AI>
  );
}
```

## API

### `<AI>` Component

| Prop | Type | Description |
|------|------|-------------|
| `model` | `string \| object` | OpenAI model ID string (e.g. 'gpt-4o') or model object |
| `schema` | `Record<string, any>` | Schema to define the structure of generated content |
| `prompt` | `string` | Prompt to send to the AI model |
| `stream` | `boolean` | Whether to stream the response (default: false) |
| `children` | `Function` | Render prop function receiving generated data and metadata |

### Dependencies

- React
- ai-providers
