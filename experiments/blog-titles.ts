/**
 * Blog title generation experiment runner
 */

import { Experiment, ExperimentConfig } from '../packages/ai-experiments/src'
import { generateBlogPostTitles } from '../packages/ai-site/src/components/blog/utils/ai-integration'
import { getModels } from './utils/model-utils'
import { saveResultsToMarkdown } from './utils/storage'

/**
 * Run an experiment to generate blog post titles with different models and temperatures
 * @param topic The topic to generate blog post titles for
 * @param outputDir Directory to save experiment results
 * @returns Experiment results
 */
export async function runBlogTitlesExperiment(topic: string, outputDir: string) {
  try {
    const models = await getModels()
    
    const temperatures = [0, 0.3, 0.7, 1.0]
    
    const result = await Experiment('blog-title-generation', {
      models,
      temperature: temperatures,
      inputs: [topic],
      prompt: ({ input }) => [`Generate 10 engaging blog post titles for the topic: ${input}`],
    })
    
    await saveResultsToMarkdown(result, outputDir)
    
    return result
  } catch (error) {
    console.error('Error running blog titles experiment:', error)
    throw error
  }
}
