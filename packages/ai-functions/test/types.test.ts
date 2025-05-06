import { describe, it, expectTypeOf } from 'vitest'
import { ai, AI, list } from '../src'
import { z } from 'zod'

describe('ai-functions type tests', () => {
  it('should have correct return types for ai function', () => {
    const aiResult = ai`Generate text`
    expectTypeOf(aiResult).toMatchTypeOf<Promise<string>>()
    
    const aiWithSchema = ai`Generate object`({ 
      schema: z.object({ name: z.string() }) 
    })
    expectTypeOf(aiWithSchema).toMatchTypeOf<Promise<{ name: string }>>()
  })
  
  it('should have correct return types for AI factory', () => {
    const testAI = AI({
      getUser: { name: 'string', age: 'number' }
    })
    
    expectTypeOf(testAI.getUser).toBeAny()
    
    const userResult = testAI.getUser({}, {})
    expectTypeOf(userResult).toMatchTypeOf<Promise<{ name: string, age: number }>>()
  })
  
  it('should have correct return types for list function', () => {
    const listResult = list`List items`
    expectTypeOf(listResult).toMatchTypeOf<Promise<string[]>>()
    
    async function iterateList() {
      for await (const item of list`List items`) {
        expectTypeOf(item).toBeString()
      }
    }
    expectTypeOf(iterateList).toBeFunction()
  })
})
