import { Service } from 'services.do'
import { Business, storyBrand, leanCanvas } from 'ai-business'
import { StartupConfig, StartupInstance, ServiceDefinition } from './types'
import { generateSite } from './site-generator'
import { generateDatabase } from './db-schema'

/**
 * Startup function that combines Business and Service patterns
 * to enable selling Functions, Workflows, and Agents while
 * generating both a website and database.
 * 
 * @param config Configuration for the startup
 * @returns Enhanced startup instance with business and service capabilities
 */
export const Startup = ({
  name,
  vision,
  goals,
  services = [],
  ...businessConfig
}: StartupConfig): StartupInstance => {
  const business = Business({
    name,
    vision,
    goals,
    ...businessConfig
  })
  
  const serviceOfferings = services.map((svc: ServiceDefinition) => Service(svc))
  
  const generateSiteMethod = () => {
    return generateSite({
      business,
      services: serviceOfferings
    })
  }
  
  const generateDatabaseMethod = () => {
    return generateDatabase({
      business,
      services: serviceOfferings
    })
  }
  
  return {
    ...business,
    services: serviceOfferings,
    generateSite: generateSiteMethod,
    generateDatabase: generateDatabaseMethod,
    
    createStoryBrand: async () => storyBrand(business),
    createLeanCanvas: async () => leanCanvas(business)
  }
}

export * from './types'
