export class Agent {}
export class Human {}
export class Workflow {}

/**
 * Business configuration interface
 */
export interface BusinessConfig {
  name: string
  url?: string
  vision?: string
  goals?: Array<{
    objective: string
    keyResults?: string[]
  }>
  roles?: Record<string, Human>
  agents?: Record<string, Agent>
  departments?: Record<
    string,
    {
      name: string
      lead: Human | Agent
      members?: Array<Human | Agent>
    }
  >
  processes?: Record<string, Workflow>
}

/**
 * Business instance returned by the Business function
 */
export interface BusinessInstance {
  name: string
  url?: string
  vision?: string
  goals?: Array<{
    objective: string
    keyResults?: string[]
  }>
  roles?: Record<string, Human>
  agents?: Record<string, Agent>
  departments?: Record<
    string,
    {
      name: string
      lead: Human | Agent
      members?: Array<Human | Agent>
    }
  >
  processes?: Record<string, Workflow>

  on: (event: string, handler: Function) => void

  every: (schedule: string, operation: Function) => void

  assign: (task: string, to: Human | Agent) => void

  track: (metric: string, value: any) => void
}

/**
 * Permission level enum for human-AI collaboration
 */
export enum PermissionLevel {
  VIEW = 'view',
  SUGGEST = 'suggest',
  EXECUTE = 'execute',
  APPROVE = 'approve',
  ADMIN = 'admin',
}

/**
 * Task assignment interface
 */
export interface Task {
  id: string
  title: string
  description?: string
  assignee?: Human | Agent
  dueDate?: Date
  status?: 'pending' | 'in_progress' | 'completed' | 'blocked'
  priority?: 'low' | 'medium' | 'high' | 'critical'
  requiredPermission?: PermissionLevel
  dependencies?: string[]
  timestamp?: Date
}

/**
 * Event interface for business events
 */
export interface BusinessEvent {
  type: string
  data: any
  source?: string
  timestamp: Date
  requiredApproval?: Human[]
}
