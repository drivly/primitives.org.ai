# AI Providers

Provider router for AI models including OpenAI, Anthropic, Google, and more.

## Usage

```typescript
import { languageModel } from 'ai-providers'

const model = languageModel('openai/gpt-4')
const response = await model.generate({
  messages: [{ role: 'user', content: 'Hello, world!' }],
})
```

## Available Providers

### Language Models

- OpenAI (`openai/...`)
- Anthropic (`anthropic/...`)
- Google (`google/...`)
- Google Vertex (`googleVertex/...`)
- XAI (`xai/...`)
- Groq (`groq/...`)
- Amazon Bedrock (`bedrock/...`)
- Perplexity (`perplexity/...`)
- Azure OpenAI (`azure/...`)
- Fal (`fal/...`)
- DeepInfra (`deepinfra/...`)
- Mistral AI (`mistral/...`)
- Cohere (`cohere/...`)
- Fireworks (`fireworks/...`)
- DeepSeek (`deepseek/...`)
- Cerebras (`cerebras/...`)
- Replicate (`replicate/...`)
- Luma (`luma/...`)

### Speech and Audio Models

- ElevenLabs (`elevenlabs/...`)
- AssemblyAI (`assemblyai/...`)
- Deepgram (`deepgram/...`)
- Gladia (`gladia/...`)
- LMNT (`lmnt/...`)
- Hume (`hume/...`)
- Rev.ai (`revai/...`)

### Planned Providers

- Together.ai (`together/...`) - Not yet available in npm registry
