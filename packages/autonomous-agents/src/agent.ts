import { AgentConfig, AutonomousAgent } from './types'
import { createAgentProxy, createEventHandler } from './utils'

/**
 * Creates an autonomous agent with the provided configuration
 * @param config The agent configuration
 * @returns An autonomous agent instance
 */
export function Agent(config: AgentConfig): AutonomousAgent {
  const state: Record<string, any> = {}

  const eventHandlers = config.triggers.reduce(
    (handlers, trigger) => {
      handlers[trigger] = createEventHandler(trigger, config)
      return handlers
    },
    {} as Record<string, Function>
  )

  const agent: AutonomousAgent = {
    config,

    async execute(input: Record<string, any>, options?: any): Promise<any> {
      try {
        const startTime = Date.now()

        const result = {
          data: 'executed',
          input,
          options,
          agent: config.name,
          timestamp: new Date().toISOString(),
        }

        const executionTime = Date.now() - startTime

        state.lastExecution = {
          timestamp: new Date().toISOString(),
          executionTime,
          input,
          result,
        }

        return result
      } catch (error) {
        console.error(`Error executing agent ${config.name}:`, error)
        throw error
      }
    },

    do: createAgentProxy(config, state),
  }

  for (const trigger of config.triggers) {
    if (eventHandlers[trigger]) {
      agent[trigger] = eventHandlers[trigger]
    }
  }

  return agent
}
