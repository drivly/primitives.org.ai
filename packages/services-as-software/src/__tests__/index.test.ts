import { describe, it, expect } from 'vitest'
import { createService, createBusiness, createStartup } from '../index'

describe('services-as-software', () => {
  describe('Service', () => {
    it('should create a service instance', () => {
      const service = createService({
        name: 'Test Service',
        objective: 'Test objective',
        keyResults: ['Test key result'],
        pricing: {
          model: 'cost-based',
          costBase: 10,
          fixedCosts: 5,
          variableCosts: 2,
        },
        implementation: {
          type: 'function',
          id: 'test-function',
        },
      })
      
      expect(service).toBeDefined()
      expect(service.register).toBeDefined()
      expect(service.calculatePrice).toBeDefined()
      expect(service.trackProgress).toBeDefined()
      expect(service.isObjectiveAchieved).toBeDefined()
    })
  })

  describe('Business', () => {
    it('should create a business instance', () => {
      const business = createBusiness({
        name: 'Test Business',
        url: 'https://test.com',
        vision: 'Test vision',
        goals: [
          {
            objective: 'Test objective',
            keyResults: ['Test key result'],
          },
        ],
      })
      
      expect(business).toBeDefined()
      expect(business.addService).toBeDefined()
      expect(business.removeService).toBeDefined()
      expect(business.getService).toBeDefined()
      expect(business.getAllServices).toBeDefined()
      expect(business.trackBusinessProgress).toBeDefined()
      expect(business.on).toBeDefined()
      expect(business.every).toBeDefined()
    })
  })

  describe('Startup', () => {
    it('should create a startup instance', () => {
      const startup = createStartup({
        name: 'Test Startup',
        url: 'https://test.com',
        vision: 'Test vision',
        goals: [
          {
            objective: 'Test objective',
            keyResults: ['Test key result'],
          },
        ],
        storyBrand: {
          hero: 'Test hero',
        },
        leanCanvas: {
          problem: 'Test problem',
        },
      })
      
      expect(startup).toBeDefined()
      expect(startup.pivotStrategy).toBeDefined()
      expect(startup.scaleOperations).toBeDefined()
      expect(startup.addInvestor).toBeDefined()
      expect(startup.getFundingStage).toBeDefined()
    })
  })
})
