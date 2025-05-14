import { describe, it, expect, vi, beforeEach } from 'vitest'

type MockOpenAIModel = {
  compatibility: string;
  apiKey: string;
  baseURL: string;
  headers: Record<string, string>;
};

type MockSettings = {
  id: string;
  defaultModel: string;
  defaultSystemPrompt: string;
};

vi.mock('@payload-config', () => {
  return {
    default: {
      collections: [],
      globals: [{ slug: 'settings' }],
    },
  };
});

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
}));

vi.mock('payload', () => ({
  getPayload: vi.fn().mockResolvedValue({
    findGlobal: vi.fn().mockResolvedValue({
      id: 'settings-id',
      defaultModel: 'gpt-4o',
      defaultSystemPrompt: 'You are a helpful assistant',
    }),
  }),
}));

vi.mock('react', () => ({
  cache: (fn: any) => fn,
}));

import { model, getSettings } from '@/lib/ai'

describe('AI Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should configure OpenAI model with correct options', () => {
    const typedModel = model as unknown as MockOpenAIModel;
    
    expect(typedModel).toBeDefined()
    expect(typedModel.compatibility).toBe('compatible')
    expect(typedModel.apiKey).toBe('test-api-key')
    expect(typedModel.baseURL).toBe('test-base-url')
    expect(typedModel.headers).toEqual({
      'HTTP-Referer': 'https://workflows.do',
      'X-Title': 'Workflows.do Business-as-Code',
    })
  })

  it('should get settings from Payload CMS', async () => {
    const settings = await getSettings() as unknown as MockSettings;
    
    expect(settings).toBeDefined()
    expect(settings.id).toBe('settings-id')
    expect(settings.defaultModel).toBe('gpt-4o')
    expect(settings.defaultSystemPrompt).toBe('You are a helpful assistant')
    
    const payload = await import('payload')
    expect(payload.getPayload).toHaveBeenCalledWith({ config: expect.anything() })
    
    const payloadInstance = await payload.getPayload({ config: expect.anything() })
    expect(payloadInstance.findGlobal).toHaveBeenCalledWith({ slug: 'settings' })
  })
})
