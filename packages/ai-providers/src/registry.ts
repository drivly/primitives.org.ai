import { anthropic } from '@ai-sdk/anthropic'
import { openai, createOpenAI, OpenAIProvider } from '@ai-sdk/openai'
import { xai } from '@ai-sdk/xai'
import { groq } from '@ai-sdk/groq'
import { bedrock } from '@ai-sdk/amazon-bedrock'
import { google } from '@ai-sdk/google'
import { vertex } from '@ai-sdk/google-vertex'
import { perplexity } from '@ai-sdk/perplexity'

type ProviderMap = {
  [key: string]: any;
  openai: typeof openai;
  anthropic: typeof anthropic;
  xai: typeof xai;
  groq: typeof groq;
  bedrock: typeof bedrock;
  google: typeof google;
  googleVertex: typeof vertex;
  perplexity: typeof perplexity;
}

const providers: ProviderMap = {
  anthropic,
  openai,
  xai,
  groq,
  bedrock,
  google,
  googleVertex: vertex,
  perplexity
}

export const defaultProvider = createOpenAI({
  apiKey: process.env.AI_GATEWAY_TOKEN || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_GATEWAY_URL || 'https://llm.do',
  headers: {
    'HTTP-Referer': 'https://primitives.org.ai',
    'X-Title': 'AI Primitives Tests',
  },
})

export const languageModel = (modelId: string) => {
  if (!modelId.includes('/')) {
    modelId = `openai/${modelId}`
  }
  
  const [providerName, model] = modelId.split('/')
  console.log(`Using provider: ${providerName}, model: ${model}`)
  
  try {
    if (providerName === 'openai') {
      return defaultProvider
    } else if (Object.prototype.hasOwnProperty.call(providers, providerName)) {
      console.warn(`Provider ${providerName} not fully configured, falling back to OpenAI`)
      return defaultProvider
    } else {
      console.warn(`Provider ${providerName} not found, falling back to OpenAI`)
      return defaultProvider
    }
  } catch (error) {
    console.warn(`Error using provider ${providerName}, falling back to OpenAI`, error)
    return defaultProvider
  }
}
