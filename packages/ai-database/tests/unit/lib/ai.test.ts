import { describe, it, expect, vi, beforeEach } from 'vitest'
import { model, getSettings } from '@/lib/ai'

vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: vi.fn().mockReturnValue({
    compatibility: 'compatible',
    apiKey: 'test-api-key',
    baseURL: 'test-base-url',
    headers: {
      'HTTP-Referer': 'https://workflows.do',
      'X-Title': 'Workflows.do Business-as-Code',
    },
  }),
}))

vi.mock('payload', () => ({
  getPayload: vi.fn().mockResolvedValue({
    findGlobal: vi.fn().mockResolvedValue({
      id: 'settings-id',
      defaultModel: 'gpt-4o',
      defaultSystemPrompt: 'You are a helpful assistant',
    }),
  }),
}))

vi.mock('react', () => ({
  cache: (fn) => fn,
}))

describe('AI Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should configure OpenAI model with correct options', () => {
    expect(model).toBeDefined()
    expect(model.compatibility).toBe('compatible')
    expect(model.apiKey).toBe('test-api-key')
    expect(model.baseURL).toBe('test-base-url')
    expect(model.headers).toEqual({
      'HTTP-Referer': 'https://workflows.do',
      'X-Title': 'Workflows.do Business-as-Code',
    })
  })

  it('should get settings from Payload CMS', async () => {
    const settings = await getSettings()
    
    expect(settings).toBeDefined()
    expect(settings.id).toBe('settings-id')
    expect(settings.defaultModel).toBe('gpt-4o')
    expect(settings.defaultSystemPrompt).toBe('You are a helpful assistant')
    
    const { getPayload } = require('payload')
    expect(getPayload).toHaveBeenCalledWith({ config: expect.anything() })
    
    const payload = await getPayload()
    expect(payload.findGlobal).toHaveBeenCalledWith({ slug: 'settings' })
  })
})
