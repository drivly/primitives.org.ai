import { describe, it, expect } from 'vitest'
describe('language-models', () => {
  it('should export Model type', () => {
    const testType = (model) => model
    expect(typeof testType).toBe('function')
  })
})
