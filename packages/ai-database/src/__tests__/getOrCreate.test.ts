import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFindOne = vi.fn();
const mockCreate = vi.fn();

const mockPayload = {
  db: {
    findOne: mockFindOne,
    create: mockCreate,
    getOrCreate: undefined as any
  }
} as any;

import { getOrCreatePlugin } from '../plugins/getOrCreatePlugin'

describe('getOrCreate', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    const pluginFunction = getOrCreatePlugin();
    const mockConfig = {} as any;
    
    const modifiedConfig = pluginFunction(mockConfig);
    
    if (modifiedConfig.onInit) {
      modifiedConfig.onInit(mockPayload);
    }
  });

  it('should return existing record when found', async () => {
    const mockRecord = { id: 'test-id', name: 'Test Record' };
    mockFindOne.mockReturnValueOnce(Promise.resolve(mockRecord));

    const result = await mockPayload.db.getOrCreate({
      collection: 'test-collection',
      data: { name: 'Test Record' },
      where: { id: { equals: 'test-id' } }
    });

    expect(mockFindOne).toHaveBeenCalledWith({
      collection: 'test-collection',
      where: { id: { equals: 'test-id' } }
    });
    expect(mockCreate).not.toHaveBeenCalled();
    expect(result).toEqual(mockRecord);
  });

  it('should create and return new record when not found', async () => {
    const newData = { name: 'New Record' };
    const createdRecord = { id: 'new-id', ...newData };
    mockFindOne.mockReturnValueOnce(Promise.resolve(null));
    mockCreate.mockReturnValueOnce(Promise.resolve(createdRecord));

    const result = await mockPayload.db.getOrCreate({
      collection: 'test-collection',
      data: newData,
      where: { name: { equals: 'New Record' } }
    });

    expect(mockFindOne).toHaveBeenCalledWith({
      collection: 'test-collection',
      where: { name: { equals: 'New Record' } }
    });
    expect(mockCreate).toHaveBeenCalledWith({
      collection: 'test-collection',
      data: newData
    });
    expect(result).toEqual(createdRecord);
  });

  it('should handle errors properly', async () => {
    const error = new Error('Database error');
    mockFindOne.mockReturnValueOnce(Promise.reject(error));
    
    await expect(mockPayload.db.getOrCreate({
      collection: 'test-collection',
      data: { name: 'Error Record' },
      where: { id: { equals: 'error-id' } }
    })).rejects.toThrow('Database error');
  });
});
