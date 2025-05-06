/**
 * Creates a proxy for dynamic method invocation on an agent
 * @param config The agent configuration
 * @param state The agent state
 * @returns A proxy function for dynamic method invocation
 */
export function createAgentProxy(config: any, state: Record<string, any>) {
  return new Proxy(function doMethod() {}, {
    apply: async (target: any, thisArg: any, args: any[]) => {
      const [action, ...params] = args
      
      if (!config.actions.includes(action)) {
        throw new Error(`Action '${action}' is not defined for agent ${config.name}`)
      }
      
      const startTime = Date.now()
      
      try {
        const result = {
          action,
          params,
          agent: config.name,
          timestamp: new Date().toISOString(),
          success: true
        }
        
        const executionTime = Date.now() - startTime
        
        if (!state.actions) {
          state.actions = []
        }
        
        state.actions.push({
          action,
          params,
          timestamp: new Date().toISOString(),
          executionTime,
          result
        })
        
        return result
      } catch (error) {
        console.error(`Error executing action ${action} for agent ${config.name}:`, error)
        throw error
      }
    }
  })
}

/**
 * Creates an event handler for a trigger
 * @param trigger The trigger name
 * @param config The agent configuration
 * @returns An event handler function
 */
export function createEventHandler(trigger: string, config: any) {
  return async function eventHandler(...args: any[]) {
    const startTime = Date.now()
    
    try {
      const result = {
        trigger,
        args,
        agent: config.name,
        timestamp: new Date().toISOString(),
        processed: true
      }
      
      const executionTime = Date.now() - startTime
      
      return {
        ...result,
        executionTime
      }
    } catch (error) {
      console.error(`Error handling event ${trigger} for agent ${config.name}:`, error)
      throw error
    }
  }
}

/**
 * Monitors key results for an agent
 * @param keyResult The key result to monitor
 * @param value The value to record
 * @param state The agent state
 */
export function monitorKeyResult(keyResult: string, value: any, state: Record<string, any>) {
  if (!state.keyResults) {
    state.keyResults = {}
  }
  
  if (!state.keyResults[keyResult]) {
    state.keyResults[keyResult] = []
  }
  
  state.keyResults[keyResult].push({
    value,
    timestamp: new Date().toISOString()
  })
}

/**
 * Integrates with an external service
 * @param integration The integration name
 * @param method The method to call
 * @param params The parameters to pass
 * @returns The result of the integration
 */
export function callIntegration(integration: string, method: string, ...params: any[]) {
  return {
    integration,
    method,
    params,
    timestamp: new Date().toISOString(),
    success: true
  }
}

/**
 * Performs a search using the agent's search capabilities
 * @param searchType The type of search to perform
 * @param query The search query
 * @returns The search results
 */
export function performSearch(searchType: string, query: string) {
  return {
    searchType,
    query,
    timestamp: new Date().toISOString(),
    results: []
  }
}
