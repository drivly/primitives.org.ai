import { createOpenAI } from '@ai-sdk/openai'

export const model = createOpenAI({
  compatibility: 'compatible',
  apiKey: process.env.DO_TOKEN || process.env.DO_API_KEY || process.env.AI_GATEWAY_TOKEN || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_BASE_URL || 'https://api.llm.do',
  headers: {
    'HTTP-Referer': 'https://workflows.do',
    'X-Title': 'Workflows.do Business-as-Code',
  },
})