/**
 * Utilities for saving experiment results to markdown files
 */

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import * as yaml from 'yaml'

/**
 * Save experiment results to markdown files with YAML frontmatter
 * @param result Experiment result object
 * @param outputDir Directory to save markdown files
 */
export async function saveResultsToMarkdown(result: any, outputDir: string): Promise<void> {
  try {
    await mkdir(outputDir, { recursive: true })
    
    for (const item of result.results) {
      const frontmatter = yaml.stringify({
        model: item.params.model,
        temperature: item.params.temperature,
        timestamp: result.timestamp,
        timeTaken: item.timeTaken,
        topic: item.params.input instanceof Object 
          ? JSON.stringify(item.params.input) 
          : item.params.input,
      })
      
      const content = `---\n${frontmatter}---\n\n${typeof item.output === 'string' 
        ? item.output 
        : JSON.stringify(item.output, null, 2)}`
      
      const filename = `${result.name}-${item.params.model}-${item.params.temperature}.md`
      
      await writeFile(join(outputDir, filename), content)
    }
    
    console.log(`Saved ${result.results.length} experiment results to ${outputDir}`)
  } catch (error) {
    console.error('Error saving experiment results:', error)
    throw error
  }
}
