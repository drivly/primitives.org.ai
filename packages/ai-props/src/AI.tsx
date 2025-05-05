import { FC, ReactNode, useState, useEffect } from 'react'
import { model } from 'ai-providers'
import { z } from 'zod'

interface AIProps {
  model: string | any
  schema: Record<string, any>
  prompt: string
  stream?: boolean
  children: (props: any, meta: { isStreaming: boolean }) => ReactNode
  temperature?: number
  maxTokens?: number
  system?: string
  [key: string]: any
}

/**
 * Generate an object using the AI model with synchronous response
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

  const response = await model.complete({
    prompt,
    ...rest,
  })

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

/**
 * Stream an object using the AI model with incrementally updated response
 */
const streamObject = async (options: { 
  model: any
  prompt: string
  schema?: z.ZodType<any>
  temperature?: number
  maxTokens?: number
  onUpdate: (data: any) => void
  [key: string]: any 
}) => {
  const { model, prompt, schema, onUpdate, ...rest } = options

  const stream = await model.streamComplete({
    prompt,
    ...rest,
  })

  let buffer = ''

  for await (const chunk of stream) {
    buffer += chunk.text

    try {
      const jsonResponse = JSON.parse(buffer)
      
      if (schema && schema.parse) {
        onUpdate(schema.parse(jsonResponse))
      } else {
        onUpdate(jsonResponse)
      }
    } catch (e) {
    }
  }

  try {
    const finalResponse = JSON.parse(buffer)
    
    if (schema && schema.parse) {
      return { object: schema.parse(finalResponse) }
    }
    
    return { object: finalResponse }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to parse final AI response as JSON: ${errorMessage}`)
  }
}

/**
 * Convert a schema object to a Zod schema
 */
const createSchemaFromObject = (schemaObj: Record<string, any>): z.ZodType<any> => {
  const zodSchema: Record<string, z.ZodType<any>> = {}
  
  Object.entries(schemaObj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      if (value.includes('|')) {
        const options = value.split('|').map(opt => opt.trim())
        zodSchema[key] = z.enum(options as [string, ...string[]]).describe(value)
      } else {
        zodSchema[key] = z.string().describe(value)
      }
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'string') {
        zodSchema[key] = z.array(z.string()).describe(JSON.stringify(value))
      } else {
        zodSchema[key] = z.array(z.any()).describe(JSON.stringify(value))
      }
    } else if (typeof value === 'object' && value !== null) {
      zodSchema[key] = createSchemaFromObject(value)
    } else {
      zodSchema[key] = z.any().describe(String(value))
    }
  })
  
  return z.object(zodSchema)
}

export const AI: FC<AIProps> = ({ 
  model: modelInput, 
  schema, 
  prompt, 
  stream = false,
  children,
  temperature,
  maxTokens,
  ...rest
}) => {
  const [data, setData] = useState<any>({})
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    const modelObj = typeof modelInput === 'string' ? model(modelInput) : modelInput
    
    let isMounted = true
    
    if (stream) {
      setIsStreaming(true)
      
      streamObject({
        model: modelObj,
        prompt,
        schema: schema ? createSchemaFromObject(schema) : undefined,
        temperature,
        maxTokens,
        onUpdate: (result) => {
          if (isMounted) {
            setData(result)
          }
        },
        ...rest
      })
      .then(result => {
        if (isMounted) {
          setData(result.object)
          setIsStreaming(false)
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err)
          setIsStreaming(false)
        }
      })
    } else {
      setIsStreaming(true)
      
      generateObject({
        model: modelObj,
        prompt,
        schema: schema ? createSchemaFromObject(schema) : undefined,
        temperature,
        maxTokens,
        ...rest
      })
      .then(result => {
        if (isMounted) {
          setData(result.object)
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsStreaming(false)
        }
      })
    }
    
    return () => {
      isMounted = false
    }
  }, [modelInput, schema, prompt, stream, temperature, maxTokens, ...Object.values(rest)])
  
  if (error) {
    console.error('AI component error:', error)
  }
  
  return children(data, { isStreaming })
}
