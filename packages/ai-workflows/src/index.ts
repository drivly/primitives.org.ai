import type { AIFunction, AIEventHandler, AIConfig, AIContext, AIWorkflowConfig } from './types'

/**
 * AI function that creates an instance with typed methods
 * @param config Configuration object for AI functions
 * @returns An object with AI functions that preserve type information
 */
export function AI<T extends Record<string, any>>(
  config: T
): {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Return
    ? (...args: Parameters<T[K]>) => Return
    : T[K] extends object
      ? (input: any) => Promise<T[K]>
      : never
} {
  const instance = {} as any

  for (const key in config) {
    const value = config[key]

    if (typeof value === 'function') {
      instance[key] = async (event: any) => {
        try {
          return await value(event, { ai: instance } as AIContext<T>)
        } catch (error) {
          console.error(`Error executing workflow function ${key}:`, error)
          throw error
        }
      }
    } else if (typeof value === 'object') {
      instance[key] = async (input: any) => {
        try {
          const model = input.model || 'gemini-2.5-flash'
          console.log(`Executing AI function ${key} with schema using model: ${model}`)
          return { ...value, model } as T[typeof key]
        } catch (error) {
          console.error(`Error executing AI function ${key}:`, error)
          throw error
        }
      }
    }
  }

  return instance
}

/**
 * Event handler for events
 * @param eventName Name of the event to handle
 * @param handler Function to handle the event
 */
export function on(eventName: string, handler: AIEventHandler): void {
  console.log(`Registered handler for event: ${eventName}`)
}

/**
 * Scheduled execution
 * @param cronExpression Cron expression for scheduling
 * @param handler Function to execute on schedule
 */
export function every(cronExpression: string, handler: AIEventHandler): void {
  console.log(`Scheduled handler with cron: ${cronExpression}`)
}

export type { AIFunction, AIEventHandler }
