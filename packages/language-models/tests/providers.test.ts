import { describe, it, expect } from 'vitest'
import { getProviderName, providers } from '../src/providers.js'
import camelCase from 'camelcase'

describe('providers array', () => {
  it('should have over 400 items', () => {
    expect(providers.length).toBeGreaterThan(400)
  })

  it('should return provider names correctly', () => {
    expect(getProviderName('google')).toBe('Google AI Studio')
    expect(getProviderName('vertex')).toBe('Google')
    expect(getProviderName('openai')).toBeDefined()
    expect(getProviderName('anthropic')).toBeDefined()
  })

  it('should handle camelCased provider names', () => {
    const testProviders = ['Google AI Studio', 'Amazon Bedrock', 'Weights & Biases', 'Hugging Face']

    for (const provider of testProviders) {
      const camelCasedName = camelCase(provider)
      const result = getProviderName(camelCasedName)
      expect(result).toBeDefined()
    }
  })
})
