import { describe, it, expect } from 'vitest'
import { Functions } from '@/collections/Functions'

describe('Functions Collection', () => {
  it('should have the correct slug', () => {
    expect(Functions.slug).toBe('functions')
  })

  it('should be in the AI admin group', () => {
    expect(Functions.admin).toBeDefined()
    expect(Functions.admin?.group).toBe('AI')
  })

  it('should use name as title in admin UI', () => {
    expect(Functions.admin?.useAsTitle).toBe('name')
  })

  it('should have versions enabled', () => {
    expect(Functions.versions).toBe(true)
  })

  it('should have required fields defined', () => {
    expect(Functions.fields).toBeDefined()
    expect(Functions.fields).toBeInstanceOf(Array)
    
    const nameField = Functions.fields.find(field => 
      field.type === 'row' && field.fields?.some(f => f.name === 'name')
    )
    expect(nameField).toBeDefined()
    
    const nameSubField = nameField.fields?.find(f => f.name === 'name')
    expect(nameSubField).toBeDefined()
    expect(nameSubField?.type).toBe('text')
    expect(nameSubField?.required).toBe(true)
    expect(nameSubField?.unique).toBe(true)
    
    const outputField = nameField.fields?.find(f => f.name === 'output')
    expect(outputField).toBeDefined()
    expect(outputField?.type).toBe('select')
    expect(outputField?.options).toContain('Object')
    expect(outputField?.options).toContain('ObjectArray')
    expect(outputField?.options).toContain('Text')
    expect(outputField?.options).toContain('TextArray')
    expect(outputField?.options).toContain('Code')
    
    const modelField = nameField.fields?.find(f => f.name === 'model')
    expect(modelField).toBeDefined()
    expect(modelField?.type).toBe('relationship')
    expect(modelField?.relationTo).toBe('models')
    expect(modelField?.defaultValue).toBeInstanceOf(Function)
  })

  it('should have system and prompt fields with code editor', () => {
    const systemField = Functions.fields.find(field => field.name === 'system')
    expect(systemField).toBeDefined()
    expect(systemField?.type).toBe('code')
    expect(systemField?.admin?.language).toBe('mdx')
    
    const promptField = Functions.fields.find(field => field.name === 'prompt')
    expect(promptField).toBeDefined()
    expect(promptField?.type).toBe('code')
    expect(promptField?.admin?.language).toBe('mdx')
  })

  it('should have conditional schema field for Object outputs', () => {
    const schemaField = Functions.fields.find(field => field.name === 'schema')
    expect(schemaField).toBeDefined()
    expect(schemaField?.type).toBe('code')
    expect(schemaField?.admin?.language).toBe('yaml')
    expect(schemaField?.admin?.condition).toBeInstanceOf(Function)
    
    const conditionFn = schemaField?.admin?.condition
    expect(conditionFn({ output: 'Object' })).toBe(true)
    expect(conditionFn({ output: 'ObjectArray' })).toBe(true)
    expect(conditionFn({ output: 'Text' })).toBe(false)
  })

  it('should have settings field with YAML editor', () => {
    const settingsField = Functions.fields.find(field => field.name === 'settings')
    expect(settingsField).toBeDefined()
    expect(settingsField?.type).toBe('code')
    expect(settingsField?.admin?.language).toBe('yaml')
    expect(settingsField?.defaultValue).toBe('temperature: 1.0')
  })

  it('should have data field for storing JSON', () => {
    const dataField = Functions.fields.find(field => field.name === 'data')
    expect(dataField).toBeDefined()
    expect(dataField?.type).toBe('json')
    expect(dataField?.admin?.hidden).toBe(true)
  })

  it('should have executions field for tracking events', () => {
    const executionsField = Functions.fields.find(field => field.name === 'executions')
    expect(executionsField).toBeDefined()
    expect(executionsField?.type).toBe('join')
    expect(executionsField?.collection).toBe('events')
    expect(executionsField?.on).toBe('execution')
    expect(executionsField?.hasMany).toBe(true)
  })
})
