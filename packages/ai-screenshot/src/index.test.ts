import { describe, it, expect } from 'vitest'
import { Screenshot, generateMissingProps } from './index'

describe('ai-screenshot', () => {
  it('exports Screenshot component', () => {
    expect(Screenshot).toBeDefined()
  })

  it('exports generateMissingProps function', () => {
    expect(generateMissingProps).toBeDefined()
    expect(typeof generateMissingProps).toBe('function')
  })
})
