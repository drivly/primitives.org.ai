import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { xai } from '@ai-sdk/xai'
import { groq } from '@ai-sdk/groq'
import { bedrock } from '@ai-sdk/amazon-bedrock'
import { google } from '@ai-sdk/google'
import { perplexity } from '@ai-sdk/perplexity'
import { createProviderRegistry } from 'ai'

export const registry = createProviderRegistry(
  {
    anthropic,
    openai,
    xai,
    groq,
    bedrock,
    google,
    perplexity
  },
  { separator: '/' },
)

export const languageModel = (modelId: string) => {
  const [provider, model] = modelId.split('/')
  console.log(`Using provider: ${provider}, model: ${model}`)
  
  return {
    generate: async (options: any) => {
      return { text: `Response from ${modelId}` }
    },
    stream: async (options: any) => {
      return { text: `Streaming response from ${modelId}` }
    }
  }
}
