import { embed, embedMany, generateObject, generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { z } from 'zod'
import { StringValueNode } from 'graphql'
import { Function, Event, Generation, Workflow } from '@/payload.types'
import { ai as aiFunctionsAi } from 'ai-functions'
import { db } from '../databases/sqlite'

export const model = createOpenAI({
  compatibility: 'compatible',
  apiKey: process.env.AI_GATEWAY_TOKEN!,
  baseURL: process.env.AI_GATEWAY_URL!,
  headers: {
    'HTTP-Referer': 'https://workflows.do', // Optional. Site URL for rankings on openrouter.ai.
    'X-Title': 'Workflows.do Business-as-Code', // Optional. Site title for rankings on openrouter.ai.
  },
})

export const getSettings = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'settings' })
})

interface AIOptions {
  function?: string;
  output?: string;
  model?: string;
  system?: string;
  temperature?: number;
  maxTokens?: number;
  [key: string]: any;
}

export const ai = async (prompt: string, options: AIOptions = {}) => {
  const functionName = options.function || 'default'
  let functionRecord = await (db as any).findOne({
    collection: 'functions',
    where: { name: { equals: functionName } }
  }) as Function

  if (!functionRecord) {
    functionRecord = await (db as any).create({
      collection: 'functions',
      data: { 
        name: functionName,
        output: options.output || 'Text',
        model: options.model || 'gpt-4o',
        prompt: prompt,
        system: options.system || '',
        settings: JSON.stringify({
          temperature: options.temperature || 1.0,
          maxTokens: options.maxTokens || undefined
        })
      }
    }) as Function
  }
  
  const result = await aiFunctionsAi`${prompt}`(options as any)
  
  const event = await (db as any).create({
    collection: 'events',
    data: {
      status: 'Success',
      execution: functionRecord.id,
      input: prompt,
      data: result
    }
  }) as Event
  
  const generation = await (db as any).create({
    collection: 'generations',
    data: {
      provider: options.model || 'openai',
      type: 'Realtime',
      request: { prompt, ...options },
      response: { result },
      metadata: {
        model: options.model || 'gpt-4o',
        temperature: options.temperature || 1.0,
        tokens: options.maxTokens || null
      }
    }
  }) as Generation
  
  await (db as any).update({
    collection: 'events',
    id: event.id,
    data: {
      generation: generation.id
    }
  })
  
  return result
}

interface WorkflowDefinition {
  code: string;
  [key: string]: any;
}

type WorkflowFunction = (input: any, options?: Record<string, any>) => Promise<any>;

export function AI(functions: Record<string, any | WorkflowDefinition>) {
  const isWorkflow = Object.entries(functions).some(([_, definition]) => 
    definition && typeof definition === 'object' && 'code' in definition
  )

  if (isWorkflow) {
    const workflows: Record<string, WorkflowFunction> = {}
    
    Object.entries(functions).forEach(async ([name, definition]) => {
      await (db as any).getOrCreate({
        collection: 'workflows',
        data: { 
          name,
          code: (definition as WorkflowDefinition).code || `export default (event, { ai, db }) => {\n  // Default implementation\n}`
        },
        where: { name: { equals: name } }
      }) as Workflow
      
      workflows[name] = async (input: any, options: Record<string, any> = {}) => {
        const result = await (db as any).create({
          collection: 'events',
          data: {
            status: 'Pending',
            input,
            data: options
          }
        })
        
        return result
      }
    })
    
    return workflows
  } else {
    const aiFunctions = require('ai-functions')
    return aiFunctions.AI(functions)
  }
}

