import { describe, it, expectTypeOf } from 'vitest'
import { ai, AI, list } from '../src'
import { z } from 'zod'

describe('ai-functions type tests', () => {
  it('should have correct return types for ai function', () => {
    type AiResult = ReturnType<typeof ai>
    expectTypeOf<AiResult>().toMatchTypeOf<Promise<string>>()

    type ObjectWithName = { name: string }
    expectTypeOf<Promise<ObjectWithName>>().toMatchTypeOf<Promise<{ name: string }>>()
  })

  it('should have correct return types for AI factory', () => {
    const testAI = AI({
      getUser: { name: 'string', age: 'number' },
    })

    type UserResult = ReturnType<typeof testAI.getUser>
    expectTypeOf<UserResult>().toMatchTypeOf<Promise<{ name: string; age: number }>>()
  })

  it('should have correct return types for list function', () => {
    type ListResult = ReturnType<typeof list>
    expectTypeOf<ListResult>().toMatchTypeOf<Promise<string[]>>()

    async function iterateList() {
      type Item = string
      expectTypeOf<Item>().toBeString()
    }
    expectTypeOf(iterateList).toBeFunction()
  })
})
