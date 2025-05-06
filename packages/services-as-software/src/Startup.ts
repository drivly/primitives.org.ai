import { Business } from './Business'
import { StartupConfig } from './types'

/**
 * Startup class extending Business with startup-specific functionality
 */
export class Startup extends Business {
  public storyBrand?: Record<string, any>
  public leanCanvas?: Record<string, any>
  public fundingStage?: string
  public investors?: string[]
  
  /**
   * Create a new startup instance
   */
  constructor(config: StartupConfig) {
    super(config)
    
    this.storyBrand = config.storyBrand
    this.leanCanvas = config.leanCanvas
    this.fundingStage = config.fundingStage
    this.investors = config.investors
  }
  
  /**
   * Pivot the startup's strategy to a new direction
   */
  pivotStrategy(newDirection: {
    vision?: string;
    goals?: Array<{ objective: string; keyResults: string[] }>;
    storyBrand?: Record<string, any>;
    leanCanvas?: Record<string, any>;
  }): Startup {
    if (newDirection.vision) {
      this.vision = newDirection.vision
    }
    
    if (newDirection.goals) {
      this.goals = newDirection.goals
    }
    
    if (newDirection.storyBrand) {
      this.storyBrand = {
        ...this.storyBrand,
        ...newDirection.storyBrand
      }
    }
    
    if (newDirection.leanCanvas) {
      this.leanCanvas = {
        ...this.leanCanvas,
        ...newDirection.leanCanvas
      }
    }
    
    return this
  }
  
  /**
   * Scale the startup's operations by a factor
   */
  scaleOperations(factor: number): Startup {
    
    console.log(`Scaling operations by factor: ${factor}`)
    
    
    return this
  }
  
  /**
   * Add an investor to the startup
   */
  addInvestor(investor: string): Startup {
    if (!this.investors) {
      this.investors = []
    }
    
    this.investors.push(investor)
    return this
  }
  
  /**
   * Get the current funding stage
   */
  getFundingStage(): string {
    return this.fundingStage || 'Unknown'
  }
}

/**
 * Factory function to create a Startup instance
 */
export default function(config: StartupConfig): Startup {
  return new Startup(config)
}
