/**
 * Blog content generation experiment runner
 */

import { Experiment, ExperimentConfig } from '../packages/ai-experiments/src'
import { generateBlogPostContent } from '../packages/ai-site/src/components/blog/utils/ai-integration'
import { getModels } from './utils/model-utils'
import { saveResultsToMarkdown } from './utils/storage'

/**
 * Run an experiment to generate blog post content with different models and temperatures
 * @param title The blog post title
 * @param description The blog post description
 * @param category The blog post category
 * @param outputDir Directory to save experiment results
 * @returns Experiment results
 */
export async function runBlogContentExperiment(
  title: string, 
  description: string, 
  category: string, 
  outputDir: string
) {
  try {
    const models = await getModels()
    
    const temperatures = [0, 0.3, 0.7, 1.0]
    
    const result = await Experiment('blog-content-generation', {
      models,
      temperature: temperatures,
      inputs: [{ title, description, category }],
      prompt: ({ input }) => [`Write a comprehensive blog post with the following details:
        Title: ${input.title}
        Description: ${input.description}
        Category: ${input.category}
        
        The blog post should be informative, engaging, and written in markdown format.`],
    })
    
    await saveResultsToMarkdown(result, outputDir)
    
    return result
  } catch (error) {
    console.error('Error running blog content experiment:', error)
    throw error
  }
}
