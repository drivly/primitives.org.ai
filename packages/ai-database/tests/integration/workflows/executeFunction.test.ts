import { describe, it, expect, vi, beforeEach } from 'vitest'
import { executeFunction } from '@/workflows/executeFunction'
import { mock } from 'vitest-mock-extended'

vi.mock('ai-functions', () => ({
  ai: vi.fn().mockImplementation((strings, ...values) => {
    const prompt = strings.join('')
    if (prompt.includes('Return a valid JSON object')) {
      return '{"result": "test object", "status": "success"}'
    }
    return 'Test generated content'
  })
}))

vi.mock('@/lib/ai', () => ({
  model: {
    completionStream: vi.fn()
  }
}))

describe('executeFunction Workflow', () => {
  let mockPayload
  let mockJob
  let mockReq
  
  beforeEach(() => {
    vi.clearAllMocks()
    
    mockPayload = {
      find: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    }
    
    mockJob = {
      input: {
        id: 'test-thing-id',
        type: 'test-noun-id',
        content: 'Test content for function execution'
      }
    }
    
    mockReq = {
      payload: mockPayload
    }
    
    mockPayload.find.mockResolvedValueOnce({
      docs: [{
        id: 'test-noun-id',
        typeOf: 'TestType',
        generate: {
          model: { data: { slug: 'gpt-4o' } },
          system: 'Test system prompt',
          prompt: 'Test prompt',
          output: 'Text',
          settings: 'temperature: 0.7'
        }
      }]
    })
    
    mockPayload.create.mockResolvedValueOnce({
      id: 'test-generation-id'
    })
    
    mockPayload.update.mockResolvedValueOnce({
      id: 'test-thing-id',
      generation: 'test-generation-id',
      data: 'Test generated content',
      content: 'Test generated content'
    })
  })
  
  it('should be properly configured', () => {
    expect(executeFunction).toBeDefined()
    expect(executeFunction.slug).toBe('executeFunction')
    expect(executeFunction.handler).toBeInstanceOf(Function)
  })
  
  it('should execute text generation workflow correctly', async () => {
    await executeFunction.handler({ job: mockJob, tasks: [], req: mockReq })
    
    expect(mockPayload.find).toHaveBeenCalledWith({
      collection: 'nouns',
      where: { id: { equals: 'test-noun-id' } },
      depth: 2
    })
    
    expect(mockPayload.create).toHaveBeenCalledWith({
      collection: 'generations',
      data: {
        request: { prompt: expect.stringContaining('Test prompt') },
        response: { text: 'Test generated content' },
        metadata: { model: 'gpt-4o' }
      }
    })
    
    expect(mockPayload.update).toHaveBeenCalledWith({
      collection: 'things',
      id: 'test-thing-id',
      data: {
        generation: 'test-generation-id',
        data: 'Test generated content',
        content: 'Test generated content'
      }
    })
  })
  
  it('should execute object generation workflow correctly', async () => {
    mockPayload.find.mockReset()
    mockPayload.find.mockResolvedValueOnce({
      docs: [{
        id: 'test-noun-id',
        typeOf: 'TestType',
        generate: {
          model: { data: { slug: 'gpt-4o' } },
          system: 'Test system prompt',
          prompt: 'Test prompt',
          output: 'Object',
          settings: 'temperature: 0.7'
        }
      }]
    })
    
    mockPayload.create.mockReset()
    mockPayload.update.mockReset()
    
    mockPayload.create.mockResolvedValueOnce({
      id: 'test-generation-id'
    })
    
    mockPayload.update.mockResolvedValueOnce({
      id: 'test-thing-id',
      generation: 'test-generation-id',
      data: { result: 'test object', status: 'success' }
    })
    
    await executeFunction.handler({ job: mockJob, tasks: [], req: mockReq })
    
    expect(mockPayload.create).toHaveBeenCalledWith({
      collection: 'generations',
      data: {
        request: { prompt: expect.stringContaining('Test prompt') },
        response: { text: expect.stringContaining('{"result": "test object", "status": "success"}') },
        metadata: { 
          model: 'gpt-4o',
          parsedObject: { result: 'test object', status: 'success' }
        }
      }
    })
    
    expect(mockPayload.update).toHaveBeenCalledWith({
      collection: 'things',
      id: 'test-thing-id',
      data: {
        generation: 'test-generation-id',
        data: { result: 'test object', status: 'success' }
      }
    })
  })
  
  it('should handle JSON parsing errors gracefully', async () => {
    mockPayload.find.mockReset()
    mockPayload.find.mockResolvedValueOnce({
      docs: [{
        id: 'test-noun-id',
        typeOf: 'TestType',
        generate: {
          model: { data: { slug: 'gpt-4o' } },
          system: 'Test system prompt',
          prompt: 'Test prompt',
          output: 'Object',
          settings: 'temperature: 0.7'
        }
      }]
    })
    
    vi.mocked(require('ai-functions').ai).mockImplementationOnce(() => {
      return 'This is not valid JSON'
    })
    
    mockPayload.create.mockReset()
    mockPayload.update.mockReset()
    
    mockPayload.create.mockResolvedValueOnce({
      id: 'test-generation-id'
    })
    
    mockPayload.update.mockResolvedValueOnce({
      id: 'test-thing-id',
      generation: 'test-generation-id',
      data: { error: 'Failed to parse response as JSON', text: 'This is not valid JSON' }
    })
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    await executeFunction.handler({ job: mockJob, tasks: [], req: mockReq })
    
    expect(consoleErrorSpy).toHaveBeenCalled()
    
    expect(mockPayload.create).toHaveBeenCalledWith({
      collection: 'generations',
      data: {
        request: { prompt: expect.stringContaining('Test prompt') },
        response: { text: 'This is not valid JSON' },
        metadata: { 
          model: 'gpt-4o',
          parsedObject: { 
            error: 'Failed to parse response as JSON', 
            text: 'This is not valid JSON' 
          }
        }
      }
    })
    
    expect(mockPayload.update).toHaveBeenCalledWith({
      collection: 'things',
      id: 'test-thing-id',
      data: {
        generation: 'test-generation-id',
        data: { 
          error: 'Failed to parse response as JSON', 
          text: 'This is not valid JSON' 
        }
      }
    })
  })
})
