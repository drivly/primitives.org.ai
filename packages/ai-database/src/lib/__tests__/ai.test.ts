import { expect, describe, it, beforeEach, vi } from 'vitest'
import { ai, AI } from '../ai'
import { DB } from '../db'
import { db } from '../../databases/sqlite'

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

vi.mock('ai-functions', () => ({
  ai: vi.fn().mockResolvedValue('mocked ai response'),
  AI: vi.fn().mockImplementation((funcs) => {
    return Object.fromEntries(
      Object.entries(funcs).map(([key]) => [
        key,
        vi.fn().mockResolvedValue({ result: `mocked ${key} response` })
      ])
    )
  })
}))

describe('Enhanced AI functions', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    
    (db as any).findOne.mockResolvedValue(null)
    (db as any).create.mockImplementation((params: any) => Promise.resolve({
      id: 'mock-id',
      ...params.data
    }))
    (db as any).update.mockImplementation((params: any) => Promise.resolve({
      id: params.id,
      ...params.data
    }))
    (db as any).getOrCreate.mockImplementation((params: any) => Promise.resolve({
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
    it('should handle workflow definitions', async () => {
      const workflowFunctions = AI({
        testWorkflow: {
          code: 'export default () => { return "test" }'
        }
      })
      
      expect((db as any).getOrCreate).toHaveBeenCalledWith(expect.objectContaining({
        collection: 'workflows',
        data: expect.objectContaining({
          name: 'testWorkflow'
        })
      }))
      
      expect(typeof workflowFunctions.testWorkflow).toBe('function')
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
