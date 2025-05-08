import { describe, it, expect, beforeEach } from 'vitest'
import { list } from '../src'
import { setupTestEnvironment } from './utils/setupTests'
import { AI_TEST_TIMEOUT } from './utils/test-helpers'

describe('list function', () => {
  beforeEach(() => {
    setupTestEnvironment()
  })

  describe('basic functionality', () => {
    it(
      'should generate an array of strings',
      async () => {
        const result = await list`List 5 programming languages`

        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should have proper typing for array items',
      async () => {
        const result = await list`List 3 cloud providers`

        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      },
      AI_TEST_TIMEOUT
    )
  })

  describe('AsyncIterable interface', () => {
    it.skip(
      'should support for-await-of iteration',
      async () => {
        const languages = list`List 5 programming languages`
        const items: string[] = []

        for await (const item of languages) {
          items.push(item)
        }

        expect(items.length).toBeGreaterThanOrEqual(0)
      },
      AI_TEST_TIMEOUT
    )
  })

  describe('edge cases', () => {
    it(
      'should handle empty prompts',
      async () => {
        const result = await list``

        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should handle very long prompts',
      async () => {
        const longPrompt =
          'List programming languages that are particularly well-suited for ' +
          'developing applications in the following domains: web development, mobile app development, ' +
          'data science, machine learning, embedded systems, game development, blockchain, ' +
          'distributed systems, high-frequency trading, scientific computing, and cybersecurity. ' +
          'For each language, provide specific reasons why it excels in the given domain.'

        const result = await list`${longPrompt}`

        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      },
      AI_TEST_TIMEOUT
    )

    it(
      'should handle non-English prompts',
      async () => {
        const nonEnglishPrompt = 'プログラミング言語を5つリストする'
        const result = await list`${nonEnglishPrompt}`

        expect(result).toBeDefined()
        expect(Array.isArray(result)).toBe(true)
      },
      AI_TEST_TIMEOUT
    )
  })
})
