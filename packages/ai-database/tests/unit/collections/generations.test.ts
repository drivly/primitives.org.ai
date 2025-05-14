import { describe, it, expect } from 'vitest'
import { Generations } from '@/collections/Generations'

describe('Generations Collection', () => {
  it('should have the correct slug', () => {
    expect(Generations.slug).toBe('generations')
  })

  it('should be in the AI admin group', () => {
    expect(Generations.admin).toBeDefined()
    expect(Generations.admin?.group).toBe('AI')
  })

  it('should have proper access control', () => {
    expect(Generations.access).toBeDefined()
    expect(Generations.access?.create).toBeInstanceOf(Function)
    expect(Generations.access?.update).toBeInstanceOf(Function)
    expect(Generations.access?.delete).toBeInstanceOf(Function)
    expect(Generations.access?.read).toBeInstanceOf(Function)
    
    expect(Generations.access?.create()).toBe(false)
    expect(Generations.access?.update()).toBe(false)
    expect(Generations.access?.delete()).toBe(false)
  })

  it('should have required fields defined', () => {
    expect(Generations.fields).toBeDefined()
    expect(Generations.fields).toBeInstanceOf(Array)
    
    const rowField = Generations.fields.find(field => field.type === 'row')
    expect(rowField).toBeDefined()
    expect(rowField.fields).toBeInstanceOf(Array)
    
    const providerField = rowField.fields?.find(f => f.name === 'provider')
    expect(providerField).toBeDefined()
    expect(providerField?.type).toBe('text')
    
    const typeField = rowField.fields?.find(f => f.name === 'type')
    expect(typeField).toBeDefined()
    expect(typeField?.type).toBe('select')
    expect(typeField?.options).toContain('Realtime')
    expect(typeField?.options).toContain('Batch')
    
    const batchField = rowField.fields?.find(f => f.name === 'batch')
    expect(batchField).toBeDefined()
    expect(batchField?.type).toBe('relationship')
    expect(batchField?.relationTo).toBe('batches')
    expect(batchField?.admin?.condition).toBeInstanceOf(Function)
    
    const conditionFn = batchField?.admin?.condition
    expect(conditionFn({ type: 'Batch' })).toBe(true)
    expect(conditionFn({ type: 'Realtime' })).toBe(false)
  })

  it('should have JSON fields for request, response, and metadata', () => {
    const requestField = Generations.fields.find(field => field.name === 'request')
    expect(requestField).toBeDefined()
    expect(requestField?.type).toBe('json')
    expect(requestField?.admin?.editorOptions).toBeDefined()
    
    const responseField = Generations.fields.find(field => field.name === 'response')
    expect(responseField).toBeDefined()
    expect(responseField?.type).toBe('json')
    expect(responseField?.admin?.editorOptions).toBeDefined()
    
    const metadataField = Generations.fields.find(field => field.name === 'metadata')
    expect(metadataField).toBeDefined()
    expect(metadataField?.type).toBe('json')
    expect(metadataField?.admin?.editorOptions).toBeDefined()
  })
})
