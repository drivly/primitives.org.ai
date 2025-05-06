import { Agent, Human, Workflow } from './types'
import { BusinessConfig, BusinessInstance, PermissionLevel, Task, BusinessEvent } from './types'

export { Agent, Human, Workflow }
export type { BusinessConfig, BusinessInstance, PermissionLevel, Task, BusinessEvent }

/**
 * Creates a business representation for human-AI collaboration
 *
 * @param config The business configuration
 * @returns A business instance with methods for event handling, scheduling, and task management
 */
export function Business(config: BusinessConfig): BusinessInstance {
  const eventHandlers: Record<string, Function[]> = {}

  const scheduledOperations: Record<string, Function[]> = {}

  const tasks: Task[] = []

  const metrics: Record<string, any[]> = {}

  const business: BusinessInstance = {
    ...config,

    on: (event: string, handler: Function) => {
      if (!eventHandlers[event]) {
        eventHandlers[event] = []
      }
      eventHandlers[event].push(handler)

      return business // For chaining
    },

    every: (schedule: string, operation: Function) => {
      if (!scheduledOperations[schedule]) {
        scheduledOperations[schedule] = []
      }
      scheduledOperations[schedule].push(operation)

      return business // For chaining
    },

    assign: (taskTitle: string, to: Human | Agent) => {
      const task: Task = {
        id: `task_${Date.now()}`,
        title: taskTitle,
        assignee: to,
        status: 'pending',
        timestamp: new Date(),
      }

      tasks.push(task)

      if (to instanceof Agent) {
        task.status = 'in_progress'
      } else {
      }

      return task // Return task for reference
    },

    track: (metric: string, value: any) => {
      if (!metrics[metric]) {
        metrics[metric] = []
      }

      metrics[metric].push({
        value,
        timestamp: new Date(),
      })

      return business // For chaining
    },
  }

  return business
}
