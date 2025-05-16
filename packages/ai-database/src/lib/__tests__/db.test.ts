import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import { db } from '../../databases/sqlite'
import { v4 as uuidv4 } from 'uuid'

const TEST_COLLECTION = 'test_collection'

describe('db function', () => {
  let testId: string
  let createdDocumentId: string

  beforeEach(() => {
    testId = `test-${uuidv4()}`
  })

  afterEach(async () => {
    if (createdDocumentId) {
      try {
        await (db as any).delete({
          collection: TEST_COLLECTION,
          id: createdDocumentId
        })
      } catch (error) {
      }
    }
  })

  it('should create a document', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    
    const result = await (db as any).create({
      collection: TEST_COLLECTION,
      data: testData
    })
    
    createdDocumentId = result.id
    
    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.data).toEqual(testData)
  })

  it('should find documents', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    const created = await (db as any).create({
      collection: TEST_COLLECTION,
      data: testData
    })
    
    createdDocumentId = created.id
    
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
    
    interface TestDocument {
      id: string;
      data: any;
    }
    const foundDoc = results.find((doc: TestDocument) => doc.id === createdDocumentId)
    expect(foundDoc).toBeDefined()
    expect(foundDoc?.data).toEqual(testData)
  })

  it('should find one document', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    const created = await (db as any).create({
      collection: TEST_COLLECTION,
      data: testData
    })
    
    createdDocumentId = created.id
    
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
  })

  it('should update a document', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    const created = await (db as any).create({
      collection: TEST_COLLECTION,
      data: testData
    })
    
    createdDocumentId = created.id
    
    const updatedData = { name: `Updated-${testId}`, value: 100 }
    const result = await (db as any).update({
      collection: TEST_COLLECTION,
      id: createdDocumentId,
      data: updatedData
    })
    
    expect(result).toBeDefined()
    expect(result.id).toBe(createdDocumentId)
    expect(result.data).toEqual(updatedData)
    
    const fetched = await (db as any).findOne({
      collection: TEST_COLLECTION,
      where: { id: { equals: createdDocumentId } }
    })
    
    expect(fetched?.data).toEqual(updatedData)
  })

  it('should delete a document', async () => {
    const testData = { name: `Test-${testId}`, value: 42 }
    const created = await (db as any).create({
      collection: TEST_COLLECTION,
      data: testData
    })
    
    const docId = created.id
    
    await (db as any).delete({
      collection: TEST_COLLECTION,
      id: docId
    })
    
    const result = await (db as any).findOne({
      collection: TEST_COLLECTION,
      where: { id: { equals: docId } }
    })
    
    expect(result).toBeNull()
    
    createdDocumentId = ''
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
    
    createdDocumentId = result1.id
    
    expect(result1).toBeDefined()
    expect(result1.id).toBeDefined()
    expect(result1.data).toEqual(testData)
    
    const result2 = await (db as any).getOrCreate({
      collection: TEST_COLLECTION,
      data: { ...testData, value: 99 }, // Different value, but should still find existing
      where: { 
        data: {
          name: { equals: testData.name }
        }
      }
    })
    
    expect(result2.id).toBe(result1.id)
    expect(result2.data).toEqual(testData)
  })
})
