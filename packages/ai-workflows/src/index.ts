import type { AIFunction, AIEventHandler, AIConfig, AIContext } from './types';

/**
 * AI function that creates an instance with typed methods
 * @param config Configuration object for AI functions
 * @returns An object with AI functions
 */
export function AI(config: AIConfig) {
  const instance: Record<string, AIFunction> = {};
  
  for (const key in config) {
    const value = config[key];
    
    if (typeof value === 'function') {
      instance[key] = async (event: any) => {
        try {
          return await value(event, { ai: instance });
        } catch (error) {
          console.error(`Error executing workflow function ${key}:`, error);
          throw error;
        }
      };
    } else if (typeof value === 'object') {
      instance[key] = async (input: any) => {
        try {
          const model = input.model || 'gemini-2.5-flash';
          console.log(`Executing AI function ${key} with schema using model: ${model}`);
          return { result: `Response for ${input.prompt || 'default prompt'}`, model };
        } catch (error) {
          console.error(`Error executing AI function ${key}:`, error);
          throw error;
        }
      };
    }
  }
  
  return instance;
}

/**
 * Event handler for events
 * @param eventName Name of the event to handle
 * @param handler Function to handle the event
 */
export function on(eventName: string, handler: AIEventHandler): void {
  console.log(`Registered handler for event: ${eventName}`);
}

/**
 * Scheduled execution
 * @param cronExpression Cron expression for scheduling
 * @param handler Function to execute on schedule
 */
export function every(cronExpression: string, handler: AIEventHandler): void {
  console.log(`Scheduled handler with cron: ${cronExpression}`);
}

export type { AIFunction, AIEventHandler };
