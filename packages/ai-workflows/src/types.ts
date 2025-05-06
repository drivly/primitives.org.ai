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
export type AIEventHandler<TEvent = any, TResult = any> = (event: TEvent, context: any) => Promise<TResult>

/**
 * Configuration object for AI functions with preserved types
 */
export type AIWorkflowConfig<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? T[K]
    : T[K] extends object
      ? T[K] // Schema object
      : never
}

/**
 * Context object passed to event handlers with preserved types
 */
export type AIContext<T extends Record<string, any> = Record<string, any>> = {
  ai: {
    [K in keyof T]: T[K] extends (...args: infer Args) => infer Return ? (...args: Args) => Return : T[K] extends object ? (input: any) => Promise<T[K]> : never
  }
  [key: string]: any
}

/**
 * Legacy configuration object for AI functions
 * @deprecated Use AIWorkflowConfig instead
 */
export type AIConfig = Record<string, any>
