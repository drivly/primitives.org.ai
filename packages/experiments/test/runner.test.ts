import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createRunner } from '../src/runner.js'
import * as fs from 'fs'
import * as path from 'path'

vi.mock('fs')
vi.mock('path')

describe('createRunner', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    
    vi.mocked(path.join).mockImplementation((...args) => args.join('/'))
  })
  
  afterEach(() => {
    vi.resetAllMocks()
  })
  
  it('should return a function that returns a Vitest config', () => {
    const runner = createRunner()
    expect(typeof runner).toBe('function')
    
    const config = runner({ mode: 'test' } as any)
    expect(config).toHaveProperty('test')
  })
  
  it('should use default values when no config is provided', () => {
    const runner = createRunner()
    const config = runner({ mode: 'test' } as any)
    
    expect(config.test).toHaveProperty('include')
    expect(config.test.include).toContain('**/*experiment*.(js|ts|mjs|cjs)')
    expect(config.test).toHaveProperty('watch', false)
  })
  
  it('should use custom values when config is provided', () => {
    const customConfig = {
      outputDir: 'custom/output',
      testMatch: ['**/*.custom.ts'],
      watch: true
    }
    
    const runner = createRunner(customConfig)
    const config = runner({ mode: 'test' } as any)
    
    expect(config.test).toHaveProperty('include')
    expect(config.test.include).toContain('**/*.custom.ts')
    expect(config.test).toHaveProperty('watch', true)
  })
  
  it('should create output directory if it does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    
    const runner = createRunner()
    const config = runner({ mode: 'test' } as any)
    
    const reporter = config.test.reporters[1]
    
    reporter.onFinished([], [])
    
    expect(fs.mkdirSync).toHaveBeenCalledWith('.ai/experiments', { recursive: true })
  })
  
  it('should create README.md in output directory if it does not exist', () => {
    vi.mocked(fs.existsSync)
      .mockImplementation((path) => {
        if (path === '.ai/experiments') return true
        if (path === '.ai/experiments/README.md') return false
        return false
      })
    
    const runner = createRunner()
    const config = runner({ mode: 'test' } as any)
    
    const reporter = config.test.reporters[1]
    
    reporter.onFinished([], [])
    
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '.ai/experiments/README.md',
      expect.stringContaining('Experiment Results')
    )
  })
})
