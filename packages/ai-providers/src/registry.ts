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
import { together } from '@ai-sdk/together'
import { cohere } from '@ai-sdk/cohere'
import { fireworks } from '@ai-sdk/fireworks'
import { deepseek } from '@ai-sdk/deepseek'
import { cerebras } from '@ai-sdk/cerebras'
import { replicate } from '@ai-sdk/replicate'
import { luma } from '@ai-sdk/luma'
import { assemblyai } from '@ai-sdk/assemblyai'
import { deepgram } from '@ai-sdk/deepgram'
import { gladia } from '@ai-sdk/gladia'
import { lmnt } from '@ai-sdk/lmnt'
import { hume } from '@ai-sdk/hume'
import { revai } from '@ai-sdk/revai'
import { createProviderRegistry } from 'ai'

export const registry = createProviderRegistry(
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
    together,
    cohere,
    fireworks,
    deepseek,
    cerebras,
    replicate,
    luma,
    assemblyai,
    deepgram,
    gladia,
    lmnt,
    hume,
    revai
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
