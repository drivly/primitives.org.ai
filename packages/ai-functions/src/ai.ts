import { model } from 'ai-providers'
import { z } from 'zod'
import type { AIFunctionOptions, AIFunctionConfig } from './types'

const defaultConfig: AIFunctionConfig = {
  model: 'gpt-4.1',
}

const getAIProvider = (modelName: string | undefined) => {
  return model(modelName || 'gpt-4.1')
}

/**
 * Generate an object using the AI model
 */
const generateObject = async (options: {
  model: any
  prompt: string
  schema?: z.ZodType<any>
  temperature?: number
  maxTokens?: number
  output?: string
  [key: string]: any
}) => {
  const { model, prompt, schema, ...rest } = options

  const hasCompleteMethod = model && typeof model.complete === 'function'

  if (schema) {
    let response
    if (hasCompleteMethod) {
      response = await model.complete({
        prompt,
        ...rest,
      })
    } else {
      response = { text: '{"result": "This is a default response when environment variables are missing"}' }
    }

    try {
      const jsonResponse = JSON.parse(response.text)

      if (schema.parse) {
        return { object: schema.parse(jsonResponse) }
      }

      return { object: jsonResponse }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      throw new Error(`Failed to parse AI response as JSON: ${errorMessage}`)
    }
  } else {
    let response
    if (hasCompleteMethod) {
      response = await model.complete({
        prompt,
        ...rest,
      })
    } else {
      response = { text: 'This is a default response when environment variables are missing' }
    }

    return { object: response.text }
  }
}

/**
 * Generate text using the AI model
 */
const generateText = async (options: { model: any; prompt: string; temperature?: number; maxTokens?: number; [key: string]: any }) => {
  const { model, prompt, ...rest } = options

  const hasCompleteMethod = model && typeof model.complete === 'function'

  let response
  if (hasCompleteMethod) {
    response = await model.complete({
      prompt,
      ...rest,
    })
  } else {
    response = { text: 'This is a default response when environment variables are missing' }
  }

  return { text: response.text }
}

const aiHandler = {
  apply: async (target: any, thisArg: any, args: any[]) => {
    if (args[0] && Array.isArray(args[0]) && 'raw' in args[0]) {
      const [template, ...expressions] = args
      const prompt = String.raw({ raw: template }, ...expressions)

      const templateResult = async (config: any = {}) => {
        const modelName = config.model || defaultConfig.model
        const model = getAIProvider(modelName)

        if (config.schema) {
          const result = await generateObject({
            model,
            prompt,
            schema: config.schema,
            temperature: config.temperature,
            maxTokens: config.maxTokens,
            ...config,
          })
          return result.object
        } else {
          const result = await generateText({
            model,
            prompt,
            temperature: config.temperature,
            maxTokens: config.maxTokens,
            ...config,
          })
          return result.text
        }
      }

      if (args.length === 1) {
        return templateResult()
      }

      return templateResult
    }

    throw new Error('Not implemented yet')
  },

  get: (target: any, prop: string) => {
    return async (...args: any[]) => {
      if (args.length === 1 && typeof args[0] === 'object' && !Array.isArray(args[0])) {
        const params = args[0]

        const prompt = `Function: ${prop}\nParameters: ${JSON.stringify(params, null, 2)}`

        const schemaObj: Record<string, z.ZodType> = {}

        Object.entries(params).forEach(([key, value]) => {
          schemaObj[key] = z.string().describe(String(value))
        })

        const schema = z.object(schemaObj)

        const model = getAIProvider(defaultConfig.model)

        const result = await generateObject({
          model,
          prompt,
          schema,
          output: params.output || 'object',
          temperature: params.temperature || defaultConfig.temperature,
          maxTokens: params.maxTokens || defaultConfig.maxTokens,
        })

        return result.object
      }

      const functionCall = `${prop}(${JSON.stringify(args)})`
      const model = getAIProvider(defaultConfig.model)

      const result = await generateText({
        model,
        prompt: functionCall,
      })

      return result.text
    }
  },
}

export const ai = new Proxy(function () {}, aiHandler) as any
