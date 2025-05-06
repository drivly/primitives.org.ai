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
    
    expect(content).toContain("import { AI,")
    expect(content).toContain("export { AI,")
    
    expect(content).toContain("import { ai }")
    expect(content).toContain("import { list }")
    expect(content).toContain("export { ai, list }")
    
    expect(content).toContain("import { AI as AIComponent }")
    expect(content).toContain("export { AIComponent }")
  })
})
