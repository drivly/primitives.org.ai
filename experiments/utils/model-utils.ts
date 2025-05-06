/**
 * Utility functions for retrieving available AI models
 */

/**
 * Get available AI models for experiments
 * @returns Array of model names
 */
export async function getModels(): Promise<string[]> {
  try {
    return [
      'gpt-4o',
      'gpt-4o-mini',
      'claude-3-opus',
      'claude-3-sonnet',
      'gemini-pro'
    ];
  } catch (error) {
    console.error('Error fetching models:', error);
    return ['gpt-4o', 'gpt-4o-mini'];
  }
}
