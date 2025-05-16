import { expect, describe, it, beforeEach, vi } from 'vitest'
import { ai, AI } from '../ai'
import { DB } from '../db'
import { db } from '../../databases/sqlite'

vi.mock('@payload-config', () => ({
  default: {}
}))

vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: vi.fn().mockReturnValue({})
}))

vi.mock('payload', () => ({
  getPayload: vi.fn().mockResolvedValue({
    findGlobal: vi.fn().mockResolvedValue({})
  })
}))

vi.mock('react', () => ({
  cache: (fn: any) => fn
}))

vi.mock('graphql', () => ({
  StringValueNode: vi.fn()
}))

vi.mock('ai', () => ({
  embed: vi.fn(),
  embedMany: vi.fn(),
  generateObject: vi.fn(),
  generateText: vi.fn()
}))

vi.mock('../../databases/sqlite', () => ({
  db: {
    findOne: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    getOrCreate: vi.fn(),
    find: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('ai-functions', () => {
  const mockAi = vi.fn().mockImplementation((prompt, options) => {
    return Promise.resolve('mocked ai response')
  })
  
  const mockAIFactory = vi.fn().mockImplementation((funcs) => {
    return funcs
  })
  
  return {
    ai: mockAi,
    AI: mockAIFactory
  }
})

describe('Enhanced AI functions', () => {
  beforeEach(() => {
    vi.resetAllMocks && vi.resetAllMocks()
    
    const mockedDb = db as any
    mockedDb.findOne.mockResolvedValue(null)
    mockedDb.create.mockImplementation((params: any) => Promise.resolve({
      id: 'mock-id',
      ...params.data
    }))
    mockedDb.update.mockImplementation((params: any) => Promise.resolve({
      id: params.id,
      ...params.data
    }))
    mockedDb.getOrCreate.mockImplementation((params: any) => Promise.resolve({
      id: 'mock-id',
      ...params.data
    }))
  })

  describe('ai function', () => {
    it('should check for function existence and create if not found', async () => {
      await ai('test prompt', { function: 'testFunction' })
      
      expect((db as any).findOne).toHaveBeenCalledWith({
        collection: 'functions',
        where: { name: { equals: 'testFunction' } }
      })
      
      expect((db as any).create).toHaveBeenCalledWith(expect.objectContaining({
        collection: 'functions',
        data: expect.objectContaining({
          name: 'testFunction'
        })
      }))
    })

    it('should store event and generation records', async () => {
      await ai('test prompt')
      
      expect((db as any).create).toHaveBeenCalledWith(expect.objectContaining({
        collection: 'events'
      }))
      
      expect((db as any).create).toHaveBeenCalledWith(expect.objectContaining({
        collection: 'generations'
      }))
    })
  })

  describe('AI function', () => {
    it('should handle workflow definitions with direct functions', async () => {
      const testFunction = () => { return "test" }
      
      AI({
        testWorkflow: testFunction
      })
      
      expect((db as any).getOrCreate).toHaveBeenCalledWith(expect.objectContaining({
        collection: 'workflows',
        data: expect.objectContaining({
          name: 'testWorkflow',
          code: testFunction.toString()
        })
      }))
    })
  })

  describe('DB function', () => {
    it('should create methods for interacting with nouns', async () => {
      const User = DB({
        id: 'User',
        context: 'User definition'
      })
      
      expect((db as any).getOrCreate).toHaveBeenCalledWith(expect.objectContaining({
        collection: 'nouns',
        data: expect.objectContaining({
          id: 'User'
        })
      }))
      
      expect(User).toHaveProperty('create')
      expect(User).toHaveProperty('find')
      expect(User).toHaveProperty('findOne')
      expect(User).toHaveProperty('update')
      expect(User).toHaveProperty('delete')
    })
  })
})
