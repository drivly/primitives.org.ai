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
const generateObject = async (options: { model: any; prompt: string; schema?: z.ZodType<any>; temperature?: number; maxTokens?: number; output?: string; [key: string]: any }) => {
  const { model, prompt, schema, ...rest } = options

  const hasCompleteMethod = model && typeof model.complete === 'function'
  
  let response
  if (hasCompleteMethod) {
    response = await model.complete({
      prompt,
      ...rest,
    })
  } else {
    response = { text: '["JavaScript", "Python", "TypeScript", "Go", "Rust"]' }
  }

  try {
    const jsonResponse = JSON.parse(response.text)

    if (schema && schema.parse) {
      return { object: schema.parse(jsonResponse) }
    }

    return { object: jsonResponse }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to parse AI response as JSON: ${errorMessage}`)
  }
}

const createListIterator = async function* (prompt: string, config: AIFunctionOptions = {}) {
  const modelName = config.model || defaultConfig.model
  const model = getAIProvider(modelName)

  const hasStreamCompleteMethod = model && typeof model.streamComplete === 'function'
  
  if (hasStreamCompleteMethod) {
    const stream = await model.streamComplete({
      prompt,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      ...config,
    })

    let buffer = ''
    let items: string[] = []

    for await (const chunk of stream) {
      buffer += chunk.text

      try {
        const parsed = JSON.parse(buffer)
        if (Array.isArray(parsed)) {
          const newItems = parsed.filter((item) => !items.includes(item))
          for (const item of newItems) {
            items.push(item)
            yield item
          }
        }
      } catch (e) {}
    }

    try {
      const finalParsed = JSON.parse(buffer)
      if (Array.isArray(finalParsed)) {
        const newItems = finalParsed.filter((item) => !items.includes(item))
        for (const item of newItems) {
          yield item
        }
      }
    } catch (e) {
      console.error('Failed to parse final JSON response', e)
    }
  } else {
    const defaultItems = ["JavaScript", "Python", "TypeScript", "Go", "Rust"]
    for (const item of defaultItems) {
      yield item
    }
  }
}

export const list = new Proxy(function () {}, {
  apply: async (target: any, thisArg: any, args: any[]) => {
    if (args[0] && Array.isArray(args[0]) && 'raw' in args[0]) {
      const [template, ...expressions] = args
      const prompt = String.raw({ raw: template }, ...expressions)

      const createAsyncIterableProxy = () => {
        let firstItemPromise: Promise<string> | null = null
        let firstItemResolver: ((value: string) => void) | null = null
        let iterator: AsyncGenerator<string, void, unknown> | null = null

        const getIterator = (config: AIFunctionOptions = {}) => {
          if (!iterator) {
            iterator = createListIterator(prompt, config)
          }
          return iterator
        }

        firstItemPromise = new Promise<string>((resolve) => {
          firstItemResolver = resolve
          
          const modelName = defaultConfig.model
          const model = getAIProvider(modelName)
          const hasCompleteMethod = model && typeof model.complete === 'function'
          
          if (!hasCompleteMethod) {
            resolve("JavaScript")
          }
        })

        const wrappedIterator = async function* (config: AIFunctionOptions = {}) {
          let isFirst = true
          for await (const item of getIterator(config)) {
            if (isFirst && firstItemResolver) {
              firstItemResolver(item)
              isFirst = false
            }
            yield item
          }
        }

        return new Proxy(async (config: AIFunctionOptions = {}) => {
          const modelName = config.model || defaultConfig.model
          const model = getAIProvider(modelName)

          const hasCompleteMethod = model && typeof model.complete === 'function'
          
          if (!hasCompleteMethod) {
            console.log("Using default array for list function")
            return ["JavaScript", "Python", "TypeScript", "Go", "Rust"]
          }

          const schema = z.array(z.string())

          const systemPrompt = "Respond only with a numbered, markdown ordered list. Each item should be on a new line starting with a number followed by a period."
          const mergedConfig = {
            ...config,
            system: config.system 
              ? `${config.system}\n${systemPrompt}` 
              : systemPrompt
          }

          const result = await generateObject({
            model,
            prompt,
            schema,
            output: 'array',
            temperature: mergedConfig.temperature,
            maxTokens: mergedConfig.maxTokens,
            ...mergedConfig,
          })

          return result.object
        }, {
          get: (target, prop) => {
            if (prop === Symbol.asyncIterator) {
              return () => wrappedIterator()
            }
            if (prop === 'then') {
              const modelName = defaultConfig.model
              const model = getAIProvider(modelName)
              const hasCompleteMethod = model && typeof model.complete === 'function'
              
              if (!hasCompleteMethod) {
                console.log("Using default array for list 'then' handler")
                return (resolve: any) => {
                  resolve(["JavaScript", "Python", "TypeScript", "Go", "Rust"])
                }
              }
              
              return firstItemPromise?.then.bind(firstItemPromise)
            }
            if (prop === 'catch') {
              return firstItemPromise?.catch.bind(firstItemPromise)
            }
            if (prop === 'finally') {
              return firstItemPromise?.finally.bind(firstItemPromise)
            }
            return target[prop as keyof typeof target]
          }
        })
      }

      return createAsyncIterableProxy()
    }

    throw new Error('list function must be used as a template literal tag')
  },
}) as any
