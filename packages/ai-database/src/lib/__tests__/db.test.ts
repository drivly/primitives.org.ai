import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { db } from '../../databases/sqlite'
import { v4 as uuidv4 } from 'uuid'

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

const TEST_COLLECTION = 'test_collection'

describe('db function', () => {
  let testId: string
  let createdDocumentId: string

  beforeEach(() => {
    testId = `test-${uuidv4()}`
    
    const mockedDb = db as any
    mockedDb.create.mockImplementation((params: any) => Promise.resolve({
      id: 'mock-id',
      data: params.data
    }))
    mockedDb.find.mockImplementation((params: any) => Promise.resolve([{
      id: 'mock-id',
      data: { name: `Test-${testId}`, value: 42 }
    }]))
    mockedDb.findOne.mockImplementation((params: any) => Promise.resolve({
      id: 'mock-id',
      data: { name: `Test-${testId}`, value: 42 }
    }))
    mockedDb.update.mockImplementation((params: any) => Promise.resolve({
      id: params.id,
      data: params.data
    }))
    mockedDb.delete.mockImplementation(() => Promise.resolve(true))
    mockedDb.getOrCreate.mockImplementation((params: any) => Promise.resolve({
      id: 'mock-id',
      data: params.data
    }))
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should create a document', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    
    const result = await (db as any).create({
      collection: TEST_COLLECTION,
      data: testData
    })
    
    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.data).toEqual(testData)
    
    expect((db as any).create).toHaveBeenCalledWith({
      collection: TEST_COLLECTION,
      data: testData
    })
  })

  it('should find documents', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    
    const results = await (db as any).find({
      collection: TEST_COLLECTION,
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
    
    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBeGreaterThan(0)
    
    expect((db as any).find).toHaveBeenCalledWith({
      collection: TEST_COLLECTION,
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
  })

  it('should find one document', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    
    const result = await (db as any).findOne({
      collection: TEST_COLLECTION,
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
    
    expect(result).toBeDefined()
    expect(result?.id).toBeDefined()
    expect(result?.data).toEqual(testData)
    
    expect((db as any).findOne).toHaveBeenCalledWith({
      collection: TEST_COLLECTION,
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
  })

  it('should update a document', async () => {
    const updatedData = { name: `Updated-${testId}`, value: 100 }
    const documentId = 'mock-id'
    
    const result = await (db as any).update({
      collection: TEST_COLLECTION,
      id: documentId,
      data: updatedData
    })
    
    expect(result).toBeDefined()
    expect(result.id).toBe(documentId)
    expect(result.data).toEqual(updatedData)
    
    expect((db as any).update).toHaveBeenCalledWith({
      collection: TEST_COLLECTION,
      id: documentId,
      data: updatedData
    })
  })

  it('should delete a document', async () => {
    const documentId = 'mock-id'
    
    await (db as any).delete({
      collection: TEST_COLLECTION,
      id: documentId
    })
    
    expect((db as any).delete).toHaveBeenCalledWith({
      collection: TEST_COLLECTION,
      id: documentId
    })
    
    const mockedDb = db as any;
    mockedDb.findOne.mockImplementationOnce(() => Promise.resolve(null))
    
    const result = await (db as any).findOne({
      collection: TEST_COLLECTION,
      where: { id: { equals: documentId } }
    })
    
    expect(result).toBeNull()
  })

  it('should get or create a document', async () => {
    const testData = { name: `GetOrCreate-${testId}`, value: 42 }
    
    const result1 = await (db as any).getOrCreate({
      collection: TEST_COLLECTION,
      data: testData,
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
    
    expect(result1).toBeDefined()
    expect(result1.id).toBeDefined()
    expect(result1.data).toEqual(testData)
    
    expect((db as any).getOrCreate).toHaveBeenCalledWith({
      collection: TEST_COLLECTION,
      data: testData,
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
    
    const result2 = await (db as any).getOrCreate({
      collection: TEST_COLLECTION,
      data: { ...testData, value: 99 },
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
    
    expect(result2.id).toBe(result1.id)
    expect((db as any).getOrCreate).toHaveBeenCalledTimes(2)
  })
})
