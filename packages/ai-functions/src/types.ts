import { z } from 'zod'

/**
 * Configuration options for AI functions
 */
export interface AIFunctionConfig {
  /**
   * Model name to use (e.g., 'gpt-4o')
   */
  model?: string
  /**
   * Temperature setting for the model
   */
  temperature?: number
  /**
   * Maximum tokens for the model response
   */
  maxTokens?: number
}

/**
 * Options for AI function calls
 */
export interface AIFunctionOptions extends AIFunctionConfig {
  /**
   * Zod schema for validating the response
   */
  schema?: z.ZodType
  /**
   * Output format
   */
  output?: 'object' | 'array' | 'enum' | 'no-schema'
  /**
   * System prompt for the model
   */
  system?: string
  /**
   * Whether to return an iterator
   */
  iterator?: boolean
  /**
   * Additional options
   */
  [key: string]: any
}

/**
 * Type for function definition
 */
export type FunctionDefinition = Record<string, string | string[] | Record<string, any>>

/**
 * Type for AI function that can be called with input
 */
export type AIFunction<TInput = any, TOutput = any> = {
  (input: TInput, config?: AIFunctionOptions): Promise<TOutput>
}
