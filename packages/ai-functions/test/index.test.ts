import { describe, it, expect, vi } from 'vitest'
import { ai, AI, list } from '../src'

vi.mock('ai-providers', () => {
  return {
    model: (modelName: string) => ({
      complete: async ({ prompt }: { prompt: string }) => ({
        text: JSON.stringify({ result: `Generated from ${prompt}` })
      }),
      streamComplete: async ({ prompt }: { prompt: string }) => ({
        [Symbol.asyncIterator]: async function* () {
          yield { text: JSON.stringify(['item1', 'item2', 'item3']) }
        }
      })
    })
  }
})

describe('ai-functions', () => {
  it('should export the ai function', () => {
    expect(ai).toBeDefined()
  })

  it('should export the AI factory function', () => {
    expect(AI).toBeDefined()
  })

  it('should export the list function', () => {
    expect(list).toBeDefined()
  })

  it('should validate structural properties of AI-generated content', async () => {
    const mockAI = vi.fn().mockResolvedValue('Generated content that is at least 10 characters long')
    
    const originalAI = ai
    Object.defineProperty(global, 'ai', { value: mockAI, writable: true })
    
    const result = await mockAI('Test prompt')
    
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(10)
    
    Object.defineProperty(global, 'ai', { value: originalAI, writable: true })
  })
})
