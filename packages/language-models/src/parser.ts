import { Model, ParsedModel } from './types.js'
import { models } from './collections/models.js'
import { aliases } from './aliases.js'

export function parse(modelReference: string): ParsedModel {
  const result: ParsedModel = {
    original: modelReference
  }
  
  let cleanReference = modelReference
  const capabilitiesMatch = modelReference.match(/\((.*?)\)/)
  
  if (capabilitiesMatch) {
    cleanReference = modelReference.replace(/\(.*?\)/, '')
    
    const capabilitiesStr = capabilitiesMatch[1]
    const capabilities: Record<string, boolean> = {}
    const providerConstraints: Array<{field: string, type: string, value: string}> = []
    
    capabilitiesStr.split(',').forEach(item => {
      const constraintMatch = item.match(/([a-zA-Z]+)([<>=]+)(.+)/)
      
      if (constraintMatch) {
        const [_, field, operator, value] = constraintMatch
        let type = 'eq'
        
        if (operator === '<') type = 'lt'
        else if (operator === '>') type = 'gt'
        else if (operator === '<=') type = 'lte'
        else if (operator === '>=') type = 'gte'
        else if (operator === '!=') type = 'neq'
        
        providerConstraints.push({ field, type, value })
      } else {
        capabilities[item.trim()] = true
      }
    })
    
    if (Object.keys(capabilities).length > 0) {
      result.capabilities = capabilities
    }
    
    if (providerConstraints.length > 0) {
      result.providerConstraints = providerConstraints
    }
  }
  
  if (cleanReference.includes('/')) {
    const [author, model] = cleanReference.split('/')
    result.author = author
    result.model = model
  } else {
    if (aliases[cleanReference]) {
      if (aliases[cleanReference].includes('/')) {
        const [author, model] = aliases[cleanReference].split('/')
        result.author = author
        result.model = model
      } else {
        result.model = aliases[cleanReference]
      }
    } else {
      result.model = cleanReference
    }
  }
  
  return result
}

export function getModel(modelReference: string): Model | undefined {
  const parsed = parse(modelReference)
  
  return models.find(model => {
    if (parsed.author && parsed.model) {
      return model.slug === `${parsed.author}/${parsed.model}`
    }
    return model.slug.endsWith(parsed.model || '')
  })
}

export function getModels(modelReferences: string): Model[] {
  return modelReferences.split(',')
    .map(ref => ref.trim())
    .map(getModel)
    .filter((model): model is Model => !!model)
}
