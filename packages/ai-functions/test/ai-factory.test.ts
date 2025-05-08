import { describe, it, expect, beforeEach } from 'vitest'
import { AI } from '../src'
import { setupTestEnvironment } from './utils/setupTests'
import { AI_TEST_TIMEOUT } from './utils/test-helpers'

describe('AI factory function', () => {
  beforeEach(() => {
    setupTestEnvironment()
  })

  it(
    'should create a type-safe function definition',
    async () => {
      const testAI = AI({
        getUser: { name: 'string', age: 'number' },
      })

      expect(testAI).toBeDefined()
      expect(typeof testAI.getUser).toBe('function')
    },
    AI_TEST_TIMEOUT
  )

  it(
    'should execute functions with various inputs',
    async () => {
      const testAI = AI({
        generateContent: {
          title: 'string',
          content: 'string',
          wordCount: 'number',
        },
      })

      const content = await testAI.generateContent({
        type: 'blog post',
        topic: 'AI',
        length: 'short',
      })

      expect(content).toBeDefined()
      expect(typeof content).toBe('object')
    },
    AI_TEST_TIMEOUT
  )

  it(
    'should handle complex nested schema',
    async () => {
      const testAI = AI({
        getProductDetails: {
          product: {
            id: 'string',
            name: 'string',
            price: 'number',
            specifications: {
              dimensions: 'string',
              weight: 'string',
            },
          },
          inventory: {
            inStock: 'boolean',
            quantity: 'number',
          },
          reviews: ['string'],
        },
      })

      const productDetails = await testAI.getProductDetails({
        productId: '123',
        includeReviews: true,
      })

      expect(productDetails).toBeDefined()
      expect(typeof productDetails).toBe('object')
    },
    AI_TEST_TIMEOUT
  )
})
