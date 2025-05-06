import { BusinessConfig, Goal } from './types'
import { Service } from './Service'

/**
 * Business class for managing a collection of services
 */
export class Business {
  private services: Map<string, Service> = new Map()
  private eventHandlers: Map<string, Function[]> = new Map()
  private periodicHandlers: Map<string, { interval: number; handler: Function; timerId?: NodeJS.Timeout }> = new Map()
  
  public name: string
  public url: string
  public vision: string
  public goals: Goal[]
  public metadata: Record<string, any>
  
  /**
   * Create a new business instance
   */
  constructor(config: BusinessConfig) {
    this.name = config.name
    this.url = config.url
    this.vision = config.vision
    this.goals = config.goals
    this.metadata = config.metadata || {}
    
    if (config.services) {
      config.services.forEach(service => this.addService(service))
    }
  }
  
  /**
   * Add a service to the business
   */
  addService(service: Service): Business {
    service.register().then(registeredService => {
      this.services.set(registeredService.id, service)
    })
    return this
  }
  
  /**
   * Remove a service from the business
   */
  removeService(serviceId: string): Business {
    this.services.delete(serviceId)
    return this
  }
  
  /**
   * Get a service by ID
   */
  getService(serviceId: string): Service | undefined {
    return this.services.get(serviceId)
  }
  
  /**
   * Get all services in the business
   */
  getAllServices(): Service[] {
    return Array.from(this.services.values())
  }
  
  /**
   * Track business progress by aggregating progress from all services
   */
  trackBusinessProgress(): Record<string, any> {
    const progress: Record<string, any> = {
      businessName: this.name,
      goals: this.goals.map(goal => ({
        objective: goal.objective,
        keyResults: Array.isArray(goal.keyResults) ? goal.keyResults : [],
        achieved: false // Will be updated below if applicable
      })),
      services: []
    }
    
    Array.from(this.services.entries()).forEach(([serviceId, service]) => {
      const isAchieved = service.isObjectiveAchieved()
      progress.services.push({
        serviceId,
        objectiveAchieved: isAchieved
      })
    })
    
    return progress
  }
  
  /**
   * Register an event handler
   */
  on(eventName: string, handler: Function): Business {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, [])
    }
    this.eventHandlers.get(eventName)?.push(handler)
    return this
  }
  
  /**
   * Trigger an event
   */
  trigger(eventName: string, data: any): void {
    const handlers = this.eventHandlers.get(eventName)
    if (handlers) {
      for (const handler of handlers) {
        handler(data)
      }
    }
  }
  
  /**
   * Register a periodic handler
   */
  every(interval: string, handler: Function): Business {
    const parsedInterval = this.parseInterval(interval)
    const handlerId = Math.random().toString(36).substring(2, 15)
    
    this.periodicHandlers.set(handlerId, {
      interval: parsedInterval,
      handler
    })
    
    this.startPeriodicHandler(handlerId)
    
    return this
  }
  
  /**
   * Start a periodic handler
   */
  private startPeriodicHandler(handlerId: string): void {
    const handler = this.periodicHandlers.get(handlerId)
    if (handler) {
      handler.timerId = setInterval(() => {
        handler.handler()
      }, handler.interval)
    }
  }
  
  /**
   * Stop a periodic handler
   */
  private stopPeriodicHandler(handlerId: string): void {
    const handler = this.periodicHandlers.get(handlerId)
    if (handler && handler.timerId) {
      clearInterval(handler.timerId)
      handler.timerId = undefined
    }
  }
  
  /**
   * Parse an interval string into milliseconds
   */
  private parseInterval(interval: string): number {
    const units: Record<string, number> = {
      ms: 1,
      second: 1000,
      seconds: 1000,
      minute: 60 * 1000,
      minutes: 60 * 1000,
      hour: 60 * 60 * 1000,
      hours: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      weeks: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      months: 30 * 24 * 60 * 60 * 1000
    }
    
    const match = interval.match(/^(\d+)\s*([a-z]+)$/)
    if (match) {
      const value = parseInt(match[1], 10)
      const unit = match[2].toLowerCase()
      
      if (units[unit]) {
        return value * units[unit]
      }
    }
    
    return 60 * 60 * 1000
  }
}

/**
 * Factory function to create a Business instance
 */
export default function(config: BusinessConfig): Business {
  return new Business(config)
}
