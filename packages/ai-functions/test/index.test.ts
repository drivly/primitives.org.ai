import { describe, it, expect, expectTypeOf, vi, beforeEach } from 'vitest'
import { ai, AI, list } from '../src'
import { setupTestEnvironment } from './utils/setupTests'

describe('ai-functions', () => {
  beforeEach(() => {
    setupTestEnvironment()
  })



  it('should export the ai function', () => {
    expect(ai).toBeDefined()
  })

  it('should export the AI factory function', () => {
    expect(AI).toBeDefined()
  })

  it('should export the list function', () => {
    expect(list).toBeDefined()
  })

  it('should generate text content with proper structure', async () => {
    const result = await ai`Generate a short description of artificial intelligence`
    
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(10)
  })

  it('should generate an array of items', async () => {
    const result = await list`List 5 programming languages`

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    result.forEach((item) => {
      expect(typeof item).toBe('string')
    })
  })

  it('should have proper types when using list function', async () => {
    const result = await list`List 3 programming languages`
    
    expect(Array.isArray(result)).toBe(true)
    
    expectTypeOf(result).toEqualTypeOf<string[]>()
    
    result.forEach((item: string) => {
      expect(typeof item).toBe('string')
      expect(item.length).toBeGreaterThan(0)
    })
    
    const firstItem = result[0]
    expect(typeof firstItem.toUpperCase()).toBe('string')
  })
})
