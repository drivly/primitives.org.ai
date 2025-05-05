# AI Providers

Provider router for AI models including OpenAI, Anthropic, Google, and more.

## Usage

```typescript
import { languageModel } from 'ai-providers'

const model = languageModel('openai/gpt-4')
const response = await model.generate({
  messages: [{ role: 'user', content: 'Hello, world!' }]
})
```

## Available Providers

- OpenAI (`openai/...`)
- Anthropic (`anthropic/...`)
- Google (`google/...`)
- Google Vertex (`googleVertex/...`)
- XAI (`xai/...`)
- Groq (`groq/...`)
- Amazon Bedrock (`bedrock/...`)
- Perplexity (`perplexity/...`)
- ElevenLabs (`elevenlabs/...`)
