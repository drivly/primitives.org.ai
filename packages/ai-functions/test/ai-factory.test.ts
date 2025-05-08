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
      expect(content).toHaveProperty('title')
      expect(typeof content.title).toBe('string')
      expect(content).toHaveProperty('content')
      expect(typeof content.content).toBe('string')
      expect(content).toHaveProperty('wordCount')
      expect(typeof content.wordCount).toBe('number')
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
      
      expect(productDetails).toHaveProperty('product')
      expect(typeof productDetails.product).toBe('object')
      expect(productDetails.product).toHaveProperty('id')
      expect(typeof productDetails.product.id).toBe('string')
      expect(productDetails.product).toHaveProperty('name')
      expect(typeof productDetails.product.name).toBe('string')
      expect(productDetails.product).toHaveProperty('price')
      expect(typeof productDetails.product.price).toBe('number')
      
      expect(productDetails.product).toHaveProperty('specifications')
      expect(typeof productDetails.product.specifications).toBe('object')
      
      expect(productDetails).toHaveProperty('inventory')
      expect(typeof productDetails.inventory).toBe('object')
      expect(productDetails.inventory).toHaveProperty('inStock')
      expect(typeof productDetails.inventory.inStock).toBe('boolean')
      
      expect(productDetails).toHaveProperty('reviews')
      expect(Array.isArray(productDetails.reviews)).toBe(true)
    },
    AI_TEST_TIMEOUT
  )
})
