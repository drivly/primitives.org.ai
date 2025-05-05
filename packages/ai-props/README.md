# ai-props

[![npm version](https://img.shields.io/npm/v/ai-props.svg)](https://www.npmjs.com/package/ai-props)
[![License](https://img.shields.io/npm/l/ai-props.svg)](https://github.com/drivly/primitives.org.ai/blob/main/LICENSE)

React component for AI primitives using the render props pattern.

## Installation

```bash
npm install ai-props
# or
yarn add ai-props
# or
pnpm add ai-props
```

## Usage

The `AI` component uses a render prop pattern to provide AI-generated content to its children.

```jsx
import { AI } from 'ai-props'

// Define a schema for the AI-generated content
const heroSchema = {
  title: 'A catchy title for the hero section',
  subtitle: 'A brief subtitle explaining the value proposition',
  cta: 'Call to action button text'
}

// Use the AI component with a string model
function HeroSection() {
  return (
    <AI
      model='gpt-4.1'
      schema={heroSchema}
      prompt='Create a hero section for a SaaS product that helps developers build AI-powered applications'
      stream={true}
    >
      {(props, { isStreaming }) => (
        <div className='hero-section'>
          <h1>{props.title || (isStreaming ? 'Generating title...' : 'Title')}</h1>
          <h2>{props.subtitle || (isStreaming ? 'Generating subtitle...' : 'Subtitle')}</h2>
          <button>{props.cta || (isStreaming ? 'Generating...' : 'Click me')}</button>
          {isStreaming && <div className='loading-indicator'>Generating content...</div>}
        </div>
      )}
    </AI>
  )
}

// Use the AI component with a provider-specific model object
import { openai } from 'ai-providers'

function ProductDescription() {
  const modelObj = openai('gpt-4.1')
  
  return (
    <AI
      model={modelObj}
      schema={{
        name: 'Product name',
        description: 'Detailed product description',
        features: ['List of key features']
      }}
      prompt='Generate a product description for an AI-powered code assistant'
      temperature={0.7}
      maxTokens={500}
    >
      {(props, { isStreaming }) => (
        <div className='product'>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <ul>
            {props.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </AI>
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `model` | `string \| object` | Either a string model name or a provider-specific model object |
| `schema` | `object` | Schema defining the structure of the generated content |
| `prompt` | `string` | Prompt to send to the AI model |
| `stream` | `boolean` | Whether to stream the response (default: `false`) |
| `children` | `function` | Render prop function that receives the generated data and metadata |
| `temperature` | `number` | Temperature parameter for the AI model |
| `maxTokens` | `number` | Maximum number of tokens to generate |
| `system` | `string` | System message for the AI model |

## Dependencies

- [ai-providers](https://npmjs.com/package/ai-providers)
- [ai-functions](https://npmjs.com/package/ai-functions)
- [React](https://reactjs.org/) 18 or higher (peer dependency)
