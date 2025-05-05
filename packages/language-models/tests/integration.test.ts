import { describe, it, expect } from 'vitest'
import { parse, getModel, getModels } from '../src/parser.js'
import { models } from '../src/collections/models.js'
import { aliases } from '../src/aliases.js'

describe('integration tests', () => {
  it('should parse model references and find matching models', () => {
    const testCases = [
      'test/model-1',
      'test/model-2',
      'openai/gpt-4o'
    ]
    
    for (const testCase of testCases) {
      const parsed = parse(testCase)
      expect(parsed).toBeDefined()
      
      const matchingModel = models.find(model => {
        if (parsed.author && parsed.model) {
          return model.slug === `${parsed.author}/${parsed.model}`
        }
        return model.slug.endsWith(parsed.model || '')
      })
      
      expect(matchingModel).toBeDefined()
    }
  })
  
  it('should handle parsing models with capabilities', () => {
    const parsed = parse('test/model-1(reasoning,tools)')
    expect(parsed).toBeDefined()
    expect(parsed.model).toBe('model-1')
    expect(parsed.author).toBe('test')
    expect(parsed.capabilities).toHaveProperty('reasoning')
    expect(parsed.capabilities).toHaveProperty('tools')
  })
  
  it('should get models by alias', () => {
    aliases['test-model'] = 'test/model-1'
    
    const model = getModel('test-model')
    expect(model).toBeDefined()
    expect(model?.slug).toBe('test/model-1')
  })
  
  it('should get multiple models with getModels', () => {
    aliases['test-model-1'] = 'test/model-1'
    aliases['test-model-2'] = 'test/model-2'
    
    const models = getModels('test-model-1,test-model-2')
    expect(models.length).toBe(2)
    expect(models[0].slug).toBe('test/model-1')
    expect(models[1].slug).toBe('test/model-2')
  })
  
  it('should parse model references with provider constraints', () => {
    const parsed = parse('test/model-1(cost<1)')
    expect(parsed).toBeDefined()
    expect(parsed.model).toBe('model-1')
    expect(parsed.author).toBe('test')
    expect(parsed.providerConstraints).toBeDefined()
    expect(parsed.providerConstraints?.length).toBeGreaterThan(0)
    expect(parsed.providerConstraints?.[0].field).toBe('cost')
    expect(parsed.providerConstraints?.[0].type).toBe('lt')
    expect(parsed.providerConstraints?.[0].value).toBe('1')
  })
})
