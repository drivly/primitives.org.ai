import { describe, it, expect, beforeEach } from 'vitest'
import { ai } from '../src'
import { setupTestEnvironment } from './utils/setupTests'
import { testSchema, testNestedSchema, getTestPrompt, AI_TEST_TIMEOUT } from './utils/test-helpers'
import { z } from 'zod'

describe('ai template literal function', () => {
  beforeEach(() => {
    setupTestEnvironment()
  })

  describe('text generation', () => {
    it(
      'should generate text content',
      async () => {
        const result = await ai`${getTestPrompt('simple')}`

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should incorporate template variables',
      async () => {
        const topic = 'artificial intelligence'
        const result = await ai`Generate a short description of ${topic}`

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )

    it.skip(
      'should accept temperature settings',
      async () => {
        const prompt = getTestPrompt('simple')
        const result = await ai`${prompt}`({ temperature: 0.1 })

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )

    it.skip(
      'should accept max token limit',
      async () => {
        const longPrompt = getTestPrompt('complex')
        const result = await ai`${longPrompt}`({ maxTokens: 200 })

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )
  })

  describe('structured data generation', () => {
    it.skip(
      'should handle simple schemas',
      async () => {
        const result = await ai`${getTestPrompt('user-data')}`({ schema: testSchema })

        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
      },
      AI_TEST_TIMEOUT
    )

    it.skip(
      'should handle complex schemas',
      async () => {
        const result = await ai`${getTestPrompt('nested-data')}`({ schema: testNestedSchema })

        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
      },
      AI_TEST_TIMEOUT
    )

    it.skip(
      'should handle array schemas',
      async () => {
        const arraySchema = z.array(z.string())
        const result = await ai`List 5 programming languages`({ schema: arraySchema })

        expect(Array.isArray(result)).toBe(true)
      },
      AI_TEST_TIMEOUT
    )

    it.skip(
      'should validate output against schemas',
      async () => {
        const strictSchema = z.object({
          name: z.string(),
          age: z.number(),
          email: z.string(),
        })

        const result = await ai`${getTestPrompt('user-data')}`({ schema: strictSchema })

        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
      },
      AI_TEST_TIMEOUT
    )
  })

  describe('edge cases', () => {
    it(
      'should handle empty prompts',
      async () => {
        const result = await ai``

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should handle very long prompts',
      async () => {
        const longPrompt = getTestPrompt('long')
        const result = await ai`${longPrompt}`

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should handle non-English content',
      async () => {
        const prompt = getTestPrompt('non-english')
        const result = await ai`${prompt}`

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should handle special characters',
      async () => {
        const prompt = getTestPrompt('special-chars')
        const result = await ai`${prompt}`

        expect(result).toBeDefined()
      },
      AI_TEST_TIMEOUT
    )
  })
})
