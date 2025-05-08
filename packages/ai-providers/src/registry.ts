import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { xai } from '@ai-sdk/xai'
import { groq } from '@ai-sdk/groq'
import { bedrock } from '@ai-sdk/amazon-bedrock'
import { google } from '@ai-sdk/google'
import { vertex } from '@ai-sdk/google-vertex'
import { perplexity } from '@ai-sdk/perplexity'
import { azure } from '@ai-sdk/azure'
import { fal } from '@ai-sdk/fal'
import { deepinfra } from '@ai-sdk/deepinfra'
import { mistral } from '@ai-sdk/mistral'
import { cohere } from '@ai-sdk/cohere'
import { fireworks } from '@ai-sdk/fireworks'
import { deepseek } from '@ai-sdk/deepseek'
import { cerebras } from '@ai-sdk/cerebras'
import { replicate } from '@ai-sdk/replicate'
import { luma } from '@ai-sdk/luma'
import '@ai-sdk/elevenlabs'
import '@ai-sdk/assemblyai'
import '@ai-sdk/deepgram'
import '@ai-sdk/gladia'
import '@ai-sdk/lmnt'
import '@ai-sdk/hume'
import '@ai-sdk/revai'
import { createProviderRegistry } from 'ai'

export const registry: ReturnType<typeof createProviderRegistry> = createProviderRegistry(
  {
    anthropic,
    openai,
    xai,
    groq,
    bedrock,
    google,
    googleVertex: vertex,
    perplexity,
    azure,
    fal,
    deepinfra,
    mistral,
    cohere,
    fireworks,
    deepseek,
    cerebras,
    replicate,
    luma,
  },
  { separator: '/' }
)

export const languageModel = (modelId: string) => {
  const [providerName, modelName] = modelId.split('/')
  console.log(`Using provider: ${providerName}, model: ${modelName}`)
  
  try {
    const provider = (registry as any)[providerName]
    
    if (!provider) {
      throw new Error(`Provider '${providerName}' not found in registry`)
    }
    
    return {
      complete: async (options: any) => {
        const result = await provider.chat({
          messages: [{ role: 'user', content: options.prompt }],
          model: modelName,
          ...options
        })
        return { text: result.text }
      },
      streamComplete: async (options: any) => {
        const stream = await provider.chatStream({
          messages: [{ role: 'user', content: options.prompt }],
          model: modelName,
          ...options
        })
        return stream
      },
      
      generate: async (options: any) => {
        const result = await provider.chat({
          messages: [{ role: 'user', content: options.prompt }],
          model: modelName,
          ...options
        })
        return { text: result.text }
      },
      stream: async (options: any) => {
        const stream = await provider.chatStream({
          messages: [{ role: 'user', content: options.prompt }],
          model: modelName,
          ...options
        })
        return stream
      }
    }
  } catch (error) {
    console.error(`Error getting provider for ${modelId}:`, error)
    throw new Error(`Failed to initialize provider for ${modelId}`)
  }
}
