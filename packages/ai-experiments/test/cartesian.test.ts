import { describe, it, expect } from 'vitest'
import { cartesian } from '../src/cartesian'

describe('cartesian', () => {
  it('should return an empty array for empty input', () => {
    expect(cartesian({})).toEqual([])
  })

  it('should return correct cartesian product for single key', () => {
    const result = cartesian({ a: [1, 2, 3] })
    expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }])
  })

  it('should return correct cartesian product for multiple keys', () => {
    const result = cartesian({ a: [1, 2], b: ['x', 'y'] })
    expect(result).toEqual([
      { a: 1, b: 'x' },
      { a: 1, b: 'y' },
      { a: 2, b: 'x' },
      { a: 2, b: 'y' },
    ])
  })

  it('should handle three or more keys correctly', () => {
    const result = cartesian({ a: [1, 2], b: ['x'], c: [true, false] })
    expect(result).toEqual([
      { a: 1, b: 'x', c: true },
      { a: 1, b: 'x', c: false },
      { a: 2, b: 'x', c: true },
      { a: 2, b: 'x', c: false },
    ])
  })
})
