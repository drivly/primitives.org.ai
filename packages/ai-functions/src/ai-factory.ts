import { model } from 'ai-providers'
import { z } from 'zod'
import type { AIFunctionOptions, FunctionDefinition } from './types'

const defaultConfig = {
  model: 'gpt-4.1',
}

const getAIProvider = (modelName: string | undefined) => {
  return model(modelName || defaultConfig.model)
}

/**
 * Convert a simple schema definition to a Zod schema
 */
const createZodSchema = (schema: any): z.ZodType<any> => {
  if (typeof schema === 'string') {
    switch (schema) {
      case 'string':
        return z.string()
      case 'number':
        return z.number()
      case 'boolean':
        return z.boolean()
      default:
        return z.string()
    }
  } else if (Array.isArray(schema)) {
    if (schema.length > 0) {
      return z.array(createZodSchema(schema[0]))
    }
    return z.array(z.string())
  } else if (typeof schema === 'object') {
    const shape: Record<string, z.ZodType<any>> = {}
    Object.entries(schema).forEach(([key, value]) => {
      shape[key] = createZodSchema(value)
    })
    return z.object(shape)
  }
  
  return z.any()
}

/**
 * Process the AI response to ensure correct types
 */
const processResponse = (response: any, schema: any): any => {
  if (!response || typeof response !== 'object') {
    return response
  }
  
  const result = { ...response }
  
  Object.entries(schema).forEach(([key, schemaType]) => {
    if (key in result) {
      if (schemaType === 'number' && typeof result[key] === 'string') {
        const num = Number(result[key])
        if (!isNaN(num)) {
          result[key] = num
        }
      } else if (schemaType === 'boolean' && typeof result[key] === 'string') {
        result[key] = result[key].toLowerCase() === 'true'
      } else if (Array.isArray(schemaType) && Array.isArray(result[key])) {
      } else if (typeof schemaType === 'object' && typeof result[key] === 'object') {
        result[key] = processResponse(result[key], schemaType)
      }
    }
  })
  
  return result
}

/**
 * AI factory function for creating strongly-typed functions
 * @param functions Object containing function definitions
 * @returns Object with typed methods
 */
export const AI = <T extends Record<string, FunctionDefinition>>(functions: T) => {
  const result = {} as Record<string, any>

  Object.entries(functions).forEach(([name, schema]) => {
    result[name] = async (input: any, config: AIFunctionOptions = {}) => {
      const prompt = `Function: ${name}\nParameters: ${JSON.stringify(input, null, 2)}\nSchema: ${JSON.stringify(schema, null, 2)}`
      
      const modelName = config.model || defaultConfig.model
      const model = getAIProvider(modelName)
      
      const hasCompleteMethod = model && typeof model.complete === 'function'
      
      if (!hasCompleteMethod) {
        console.log(`Using default response for ${name} function`)
        const defaultResponse: Record<string, any> = {}
        Object.entries(schema).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            defaultResponse[key] = ['Example item']
          } else if (typeof value === 'object') {
            const nestedDefault: Record<string, any> = {}
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              if (typeof nestedValue === 'object' && !Array.isArray(nestedValue)) {
                const deepNestedDefault: Record<string, any> = {}
                Object.entries(nestedValue).forEach(([deepKey, deepValue]) => {
                  if (deepValue === 'number') {
                    deepNestedDefault[deepKey] = 0
                  } else if (deepValue === 'boolean') {
                    deepNestedDefault[deepKey] = false
                  } else {
                    deepNestedDefault[deepKey] = `Example ${deepValue}`
                  }
                })
                nestedDefault[nestedKey] = deepNestedDefault
              } else if (nestedValue === 'number') {
                nestedDefault[nestedKey] = 0
              } else if (nestedValue === 'boolean') {
                nestedDefault[nestedKey] = false
              } else {
                nestedDefault[nestedKey] = `Example ${nestedValue}`
              }
            })
            defaultResponse[key] = nestedDefault
          } else if (value === 'number') {
            defaultResponse[key] = 0
          } else if (value === 'boolean') {
            defaultResponse[key] = false
          } else {
            defaultResponse[key] = `Example ${value}`
          }
        })
        return defaultResponse
      }
      
      const zodSchema = createZodSchema(schema)
      
      const systemPrompt = config.system || ''
      const enhancedSystemPrompt = `${systemPrompt}\nRespond with valid JSON that matches the requested structure.`
      
      try {
        const response = await model.complete({
          prompt: `${prompt}\n\nRespond with a valid JSON object that matches the schema.`,
          system: enhancedSystemPrompt,
          ...config,
        })
        
        let jsonText = response.text.trim()
        
        const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
        if (codeBlockMatch && codeBlockMatch[1]) {
          jsonText = codeBlockMatch[1].trim()
        }
        
        if (!jsonText.startsWith('{') && !jsonText.startsWith('[')) {
          const possibleJson = jsonText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
          if (possibleJson && possibleJson[1]) {
            jsonText = possibleJson[1]
          }
        }
        
        let jsonResponse
        try {
          jsonResponse = JSON.parse(jsonText)
        } catch (parseError) {
          jsonResponse = {}
        }
        
        const processedResponse = processResponse(jsonResponse, schema)
        
        try {
          const validatedResponse = zodSchema.parse(processedResponse)
          return validatedResponse
        } catch (validationError) {
          return processedResponse
        }
      } catch (error) {
        console.error(`Error in AI function ${name}:`, error)
        throw new Error(`Failed to execute AI function ${name}`)
      }
    }
  })

  return result
}
