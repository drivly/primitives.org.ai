import type { HumanFunction, HumanTaskRequest, TeamsConfig } from '../../core/types'

/**
 * Teams-specific response option
 */
export interface TeamsResponseOption {
  value: string
  label: string
}

/**
 * Create a Teams message with the given options
 */
export async function createTeamsMessage<TInput, TOutput>(
  taskId: string,
  input: TInput,
  config: TeamsConfig & { 
    title: string, 
    description: string, 
    options?: string[] | TeamsResponseOption[],
    freeText?: boolean
  }
): Promise<{ messageId: string }> {
  console.log(`Creating Teams message for task ${taskId}`)
  console.log(`Title: ${config.title}`)
  console.log(`Description: ${config.description}`)
  
  
  return { messageId: `teams-${taskId}-${Date.now()}` }
}

/**
 * Get the response for a Teams task
 */
export async function getTeamsResponse<TOutput>(taskId: string): Promise<TOutput | null> {
  console.log(`Getting response for Teams task ${taskId}`)
  
  return null
}

/**
 * Implementation of HumanFunction for Microsoft Teams
 */
export class TeamsHumanFunction<TInput, TOutput> implements HumanFunction<TInput, TOutput> {
  private config: TeamsConfig & { 
    title: string, 
    description: string, 
    options?: string[] | TeamsResponseOption[],
    freeText?: boolean
  }
  
  constructor(config: TeamsConfig & { 
    title: string, 
    description: string, 
    options?: string[] | TeamsResponseOption[],
    freeText?: boolean
  }) {
    this.config = config
  }
  
  async request(input: TInput): Promise<HumanTaskRequest> {
    const taskId = `task-${Date.now()}`
    const { messageId } = await createTeamsMessage<TInput, TOutput>(
      taskId,
      input,
      this.config
    )
    
    return {
      taskId,
      status: 'pending',
      messageId: {
        slack: '',
        teams: messageId,
        react: '',
        email: ''
      }
    }
  }
  
  async getResponse(taskId: string): Promise<TOutput | null> {
    return getTeamsResponse<TOutput>(taskId)
  }
}
