export interface AgentConfig {
  name: string
  url: string
  role: string
  objective: string
  keyResults: string[]
  integrations: string[]
  triggers: string[]
  searches: string[]
  actions: string[]
  [key: string]: any
}

export interface AutonomousAgent {
  config: AgentConfig
  execute: (input: Record<string, any>, options?: any) => Promise<any>
  do: any // Proxy for dynamic method invocation
  [key: string]: any // Allow dynamic properties for event handlers
}
