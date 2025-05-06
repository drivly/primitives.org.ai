import { ServiceConfig, RegisteredService, ProgressData, UsageData, KeyResult } from './types'

/**
 * Mock implementation of services.do SDK
 */
class Services {
  async register(config: ServiceConfig): Promise<any> {
    return {
      id: config.id || Math.random().toString(36).substring(2, 15),
      name: config.name,
      objective: config.objective,
      keyResults: this.normalizeKeyResults(config.keyResults),
      pricing: config.pricing,
      implementation: config.implementation
    }
  }

  calculatePrice(serviceId: string, usageData: UsageData): number {
    return 10 // Default price
  }

  private normalizeKeyResults(keyResults: string[] | KeyResult[]): KeyResult[] {
    if (Array.isArray(keyResults) && typeof keyResults[0] === 'string') {
      return (keyResults as string[]).map(kr => ({ description: kr }))
    }
    return keyResults as KeyResult[]
  }
}

/**
 * Service class that wraps and extends the services.do SDK
 */
export class Service {
  private servicesSDK = new Services()
  private config: ServiceConfig
  private progressData: Map<number, number> = new Map()
  
  /**
   * Create a new service instance
   */
  constructor(config: ServiceConfig) {
    this.config = config
  }
  
  /**
   * Register the service with the SDK and return enhanced object
   */
  async register(): Promise<RegisteredService> {
    const registered = await this.servicesSDK.register(this.config)
    return { ...registered, ...this.getExtendedMethods() }
  }
  
  /**
   * Calculate the price for service usage
   */
  calculatePrice(usageData: UsageData): number {
    return this.servicesSDK.calculatePrice(this.config.id || '', usageData)
  }
  
  /**
   * Track progress toward key results
   */
  trackProgress(progressData: ProgressData): void {
    this.progressData.set(progressData.keyResultIndex, progressData.value)
  }
  
  /**
   * Check if the service has achieved its defined objectives
   */
  isObjectiveAchieved(): boolean {
    if (this.progressData.size === 0) return false
    
    const keyResults = this.normalizeKeyResults(this.config.keyResults)
    
    for (let i = 0; i < keyResults.length; i++) {
      const keyResult = keyResults[i]
      const currentValue = this.progressData.get(i) || 0
      
      if (keyResult.target && currentValue < keyResult.target) {
        return false
      }
    }
    
    return true
  }
  
  /**
   * Get the extended methods to add to the registered service
   */
  private getExtendedMethods() {
    return {
      trackProgress: this.trackProgress.bind(this),
      isObjectiveAchieved: this.isObjectiveAchieved.bind(this)
    }
  }
  
  /**
   * Normalize key results to KeyResult objects
   */
  private normalizeKeyResults(keyResults: string[] | KeyResult[]): KeyResult[] {
    if (Array.isArray(keyResults) && keyResults.length > 0 && typeof keyResults[0] === 'string') {
      return (keyResults as string[]).map(kr => ({ description: kr }))
    }
    return keyResults as KeyResult[]
  }
}

/**
 * Factory function to create a Service instance
 */
export default function(config: ServiceConfig): Service {
  return new Service(config)
}
