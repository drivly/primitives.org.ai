#!/usr/bin/env tsx

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface OpenRouterModel {
  id: string
  name: string
  context_length: number
  max_output_tokens?: number
  capabilities?: string[]
}

interface OpenRouterResponse {
  data: OpenRouterModel[]
}

async function fetchModels() {
  console.log('Fetching language models from OpenRouter API...')
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`)
    }
    
    const data: OpenRouterResponse = await response.json()
    
    const models = data.data.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.id.split('/')[0],
      contextLength: model.context_length,
      maxTokens: model.max_output_tokens || Math.floor(model.context_length / 4),
      capabilities: model.capabilities || []
    }))
    
    models.sort((a, b) => {
      if (a.provider !== b.provider) {
        return a.provider.localeCompare(b.provider)
      }
      return a.name.localeCompare(b.name)
    })
    
    const modelsFilePath = resolve(__dirname, '../src/models.ts')
    
    const fileContent = `export interface LanguageModel {
  id: string
  name: string
  provider: string
  contextLength: number
  maxTokens: number
  capabilities: string[]
}

export const models: LanguageModel[] = ${JSON.stringify(models, null, 2)}
`
    
    writeFileSync(modelsFilePath, fileContent)
    console.log(`Updated ${models.length} language models in src/models.ts`)
    
    return true
  } catch (error) {
    console.error('Error fetching models:', error)
    return false
  }
}

fetchModels()
