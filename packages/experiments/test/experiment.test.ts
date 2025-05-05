import { describe, it, expect, vi } from 'vitest'
import { Experiment } from '../src/experiment'

describe('Experiment', () => {
  it('should return a valid experiment result', async () => {
    const result = await Experiment('test-experiment', {
      models: ['gpt-4o'],
      temperature: 0.7,
      prompt: 'Test prompt',
    })

    expect(result).toHaveProperty('name', 'test-experiment')
    expect(result).toHaveProperty('results')
    expect(result).toHaveProperty('totalTime')
    expect(result).toHaveProperty('timestamp')
    expect(Array.isArray(result.results)).toBe(true)
  })

  it('should handle multiple models and temperatures', async () => {
    const result = await Experiment('multi-param-test', {
      models: ['gpt-4o', 'gpt-4o-mini'],
      temperature: [0, 0.7],
      prompt: 'Test prompt',
    })

    expect(result.results.length).toBe(4) // 2 models × 2 temperatures
    
    const combinations = result.results.map(r => ({
      model: r.params.model,
      temperature: r.params.temperature
    }))
    
    expect(combinations).toContainEqual({ model: 'gpt-4o', temperature: 0 })
    expect(combinations).toContainEqual({ model: 'gpt-4o', temperature: 0.7 })
    expect(combinations).toContainEqual({ model: 'gpt-4o-mini', temperature: 0 })
    expect(combinations).toContainEqual({ model: 'gpt-4o-mini', temperature: 0.7 })
  })

  it('should handle custom inputs', async () => {
    const inputs = ['input1', 'input2']
    const result = await Experiment('input-test', {
      models: ['gpt-4o'],
      temperature: 0.7,
      inputs,
      prompt: ({ input }) => [`Process: ${input}`],
    })

    expect(result.results.length).toBe(2) // 1 model × 1 temperature × 2 inputs
    
    const processedInputs = result.results.map(r => r.params.input)
    expect(processedInputs).toContain('input1')
    expect(processedInputs).toContain('input2')
  })
})
