import { describe, it, expect, vi } from 'vitest'
import { Screenshot, generateMissingProps } from './index'

vi.mock('../../../packages/ai-functions/src/ai', () => ({
  ai: (strings: TemplateStringsArray, ...values: any[]) => {
    return () => ({
      menus: [],
      forms: [],
      tables: [],
      charts: [],
      dashboards: [],
      grids: []
    })
  }
}))

describe('ai-screenshot', () => {
  it('exports Screenshot component', () => {
    expect(Screenshot).toBeDefined()
  })

  it('exports generateMissingProps function', () => {
    expect(generateMissingProps).toBeDefined()
    expect(typeof generateMissingProps).toBe('function')
  })
})
