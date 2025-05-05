import { describe, it, expect } from 'vitest'
import { Model } from '../types.js'

describe('language-models', () => {
  it('should export Model type', () => {
    const testType = (model: Model) => model
    expect(typeof testType).toBe('function')
  })
})
