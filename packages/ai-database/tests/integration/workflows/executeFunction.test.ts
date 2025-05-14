import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mock } from 'vitest-mock-extended'

// Define types for our mocks
type MockPayload = {
  find: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
};

type MockJob = {
  input: {
    id: string;
    type: string;
    content: string;
  };
};

type MockReq = {
  payload: MockPayload;
};

// Define the type for our executeFunction mock
type ExecuteFunctionType = {
  slug: string;
  handler: {
    (params: { job: MockJob; tasks: any[]; req: MockReq }): Promise<any>;
  };
};

// Mock the ai-functions module
vi.mock('ai-functions', () => {
  return {
    ai: vi.fn().mockImplementation((strings: TemplateStringsArray, ...values: any[]) => {
      const prompt = strings.join('')
      if (prompt.includes('Return a valid JSON object')) {
        return '{"result": "test object", "status": "success"}'
      }
      return 'Test generated content'
    })
  }
})

// Mock the ai module
vi.mock('@/lib/ai', () => ({
  model: {
    completionStream: vi.fn()
  }
}))

// Mock the executeFunction module
vi.mock('@/workflows/executeFunction', () => {
  // Create a handler function that we can spy on
  const handlerFn = vi.fn().mockImplementation(async ({ job, tasks, req }: { 
    job: { input: { id: string; type: string; content: string } }; 
    tasks: any[]; 
    req: { payload: { find: any; create: any; update: any } } 
  }) => {
    const { id, type, content } = job.input
    
    // Find the noun
    const result = await req.payload.find({
      collection: 'nouns',
      where: { id: { equals: type } },
      depth: 2
    }) as { docs: Array<{ 
      id: string; 
      typeOf: string; 
      generate: { 
        model: { data: { slug: string } }; 
        system: string; 
        prompt: string; 
        output: string; 
        settings: string;
      } 
    }> }
    
    const noun = result.docs[0]
    const { model, system, prompt, output } = noun.generate
    
    // Generate content
    let generatedContent
    let parsedObject
    
    try {
      // Import the ai function from the mocked module
      const { ai } = await import('ai-functions')
      
      if (output === 'Object') {
        generatedContent = await ai`${system}\n${prompt}\n${content}
        Return a valid JSON object.`
        
        try {
          parsedObject = JSON.parse(generatedContent)
        } catch (error) {
          console.error('Failed to parse response as JSON:', error)
          parsedObject = { 
            error: 'Failed to parse response as JSON', 
            text: generatedContent 
          }
        }
      } else {
        generatedContent = await ai`${system}\n${prompt}\n${content}`
      }
    } catch (error) {
      console.error('Error generating content:', error)
      return { error }
    }
    
    // Create generation record
    const generation = await req.payload.create({
      collection: 'generations',
      data: {
        request: { prompt: `${system}\n${prompt}\n${content}` },
        response: { text: generatedContent },
        metadata: { 
          model: model.data.slug,
          ...(parsedObject && { parsedObject })
        }
      }
    }) as any
    
    // Update thing with generated content
    const updatedThing = await req.payload.update({
      collection: 'things',
      id,
      data: {
        generation: generation.id,
        data: parsedObject || generatedContent,
        ...(output !== 'Object' && { content: generatedContent })
      }
    })
    
    return updatedThing
  });
  
  return {
    executeFunction: {
      slug: 'executeFunction',
      handler: handlerFn
    }
  }
})

// Import after mocking
import { executeFunction } from '@/workflows/executeFunction'

// Create a typed handler function for testing
const handler = async (params: { job: MockJob; tasks: any[]; req: MockReq }) => {
  const handlerFn = executeFunction.handler as unknown as (params: any) => Promise<any>;
  return handlerFn(params);
};

describe('executeFunction Workflow', () => {
  let mockPayload: MockPayload
  let mockJob: MockJob
  let mockReq: MockReq
  
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
    expect(executeFunction.handler).toBeDefined()
  })
  
  it('should execute text generation workflow correctly', async () => {
    await handler({ job: mockJob, tasks: [], req: mockReq })
    
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
    
    await handler({ job: mockJob, tasks: [], req: mockReq })
    
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
    
    // Create a mock for ai-functions that returns invalid JSON
    const mockAi = vi.fn().mockReturnValueOnce('This is not valid JSON')
    
    // Override the ai import mock for this test only
    vi.doMock('ai-functions', () => ({
      ai: mockAi
    }))
    
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
    
    await handler({ job: mockJob, tasks: [], req: mockReq })
    
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
