/**
 * Type definitions for ai-workflows package
 */

/**
 * Represents an AI function that takes an input and returns a promise of an output
 */
export type AIFunction<TInput = any, TOutput = any> = {
  (input: TInput): Promise<TOutput>
}

/**
 * Represents an event handler for AI events
 */
export type AIEventHandler<TEvent = any, TResult = any> = 
  (event: TEvent, context: any) => Promise<TResult>

/**
 * Configuration object for AI functions
 */
export type AIConfig = Record<string, any>

/**
 * Context object passed to event handlers
 */
export type AIContext = {
  ai: Record<string, AIFunction>
  [key: string]: any
}
