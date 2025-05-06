/**
 * Type definitions for services-as-software package
 */

/**
 * Implementation types for services
 */
export type ImplementationType = 'function' | 'workflow' | 'agent'

/**
 * Pricing models supported by services
 */
export type PricingModel = 'cost-based' | 'margin-based' | 'activity-based' | 'outcome-based'

/**
 * Key result interface for tracking progress
 */
export interface KeyResult {
  description: string
  target?: number
  current?: number
  unit?: string
}

/**
 * Goal interface with objective and key results
 */
export interface Goal {
  objective: string
  keyResults: string[] | KeyResult[]
}

/**
 * Pricing configuration for services
 */
export interface PricingConfig {
  model: PricingModel
  costBase?: number
  fixedCosts?: number
  variableCosts?: number
  margin?: number
  activityRates?: Record<string, number>
  outcomes?: Record<string, number>
}

/**
 * Implementation configuration for services
 */
export interface ImplementationConfig {
  type: ImplementationType
  id: string
  config?: Record<string, any>
}

/**
 * Service configuration interface
 */
export interface ServiceConfig {
  name: string
  objective: string
  keyResults: string[] | KeyResult[]
  pricing: PricingConfig
  implementation: ImplementationConfig
  id?: string
  description?: string
  metadata?: Record<string, any>
}

/**
 * Progress data for tracking service progress
 */
export interface ProgressData {
  keyResultIndex: number
  value: number
  metadata?: Record<string, any>
}

/**
 * Usage data for calculating service price
 */
export interface UsageData {
  units?: number
  activities?: Record<string, number>
  outcome?: string
  metadata?: Record<string, any>
}

/**
 * Registered service interface with extended methods
 */
export interface RegisteredService {
  id: string
  name: string
  objective: string
  keyResults: KeyResult[]
  pricing: PricingConfig
  implementation: ImplementationConfig
  trackProgress: (progressData: ProgressData) => void
  isObjectiveAchieved: () => boolean
}

/**
 * Business configuration interface
 */
export interface BusinessConfig {
  name: string
  url: string
  vision: string
  goals: Goal[]
  services?: any[] // Will be Service[] but avoiding circular dependency
  metadata?: Record<string, any>
}

/**
 * Startup configuration extending business config
 */
export interface StartupConfig extends BusinessConfig {
  storyBrand?: Record<string, any>
  leanCanvas?: Record<string, any>
  fundingStage?: string
  investors?: string[]
}
