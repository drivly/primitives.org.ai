import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('ai-primitives', () => {
  it('should have built the package correctly', () => {
    const distDir = path.resolve(__dirname, '../dist')
    expect(fs.existsSync(distDir)).toBe(true)
    expect(fs.existsSync(path.join(distDir, 'index.js'))).toBe(true)
    expect(fs.existsSync(path.join(distDir, 'index.mjs'))).toBe(true)
  })

  it('should have the correct exports in the source file', () => {
    const srcFile = path.resolve(__dirname, '../src/index.ts')
    const content = fs.readFileSync(srcFile, 'utf-8')
    
    expect(content).toContain("export * from 'ai-workflows'")
    
    expect(content).toContain("export { ai, list } from 'ai-functions'")
    
    expect(content).toContain("import { AI as AIComponent } from 'ai-props'")
    expect(content).toContain("export { AIComponent }")
  })
})
