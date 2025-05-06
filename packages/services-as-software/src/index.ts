/**
 * Services-as-Software package exports
 */

export { Service } from './Service'
export { Business } from './Business'
export { Startup } from './Startup'

export { default as createService } from './Service'
export { default as createBusiness } from './Business'
export { default as createStartup } from './Startup'

export type {
  ServiceConfig,
  BusinessConfig,
  StartupConfig,
  RegisteredService,
  ProgressData,
  UsageData,
  KeyResult,
  Goal,
  PricingConfig,
  ImplementationConfig,
  PricingModel,
  ImplementationType
} from './types'
