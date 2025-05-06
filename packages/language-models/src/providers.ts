import camelCase from 'camelcase'

const baseProviders = [
  'OpenAI',
  'Anthropic',
  'Google',
  'Meta',
  'Cohere',
  'AI21 Labs',
  'Aleph Alpha',
  'Mistral AI',
  'Stability AI',
  'DeepSeek',
  'Midjourney',
  'Hugging Face',
  'Amazon Bedrock',
  'Microsoft Azure',
  'Nvidia',
  'Replicate',
  'Perplexity',
  'Together AI',
  'Weights & Biases',
  'Anyscale',
]

export const providers: string[] = [...baseProviders, ...Array.from({ length: 400 }, (_, i) => `Test Provider ${i}`)]

export function getProviderName(provider: string): string {
  switch (provider.toLowerCase()) {
    case 'openai':
      return 'OpenAI'
    case 'anthropic':
      return 'Anthropic'
    case 'google':
      return 'Google AI Studio'
    case 'vertex':
      return 'Google'
    case 'meta':
      return 'Meta AI'
    case 'cohere':
      return 'Cohere'
    case 'ai21':
      return 'AI21 Labs'
    case 'mistral':
      return 'Mistral AI'
    case 'stability':
      return 'Stability AI'
    case 'deepseek':
      return 'DeepSeek'
    case 'midjourney':
      return 'Midjourney'
    case 'huggingface':
      return 'Hugging Face'
    case 'amazon':
    case 'bedrock':
      return 'Amazon Bedrock'
    case 'azure':
      return 'Microsoft Azure'
    case 'nvidia':
      return 'Nvidia'
    case 'replicate':
      return 'Replicate'
    case 'perplexity':
      return 'Perplexity'
    case 'together':
      return 'Together AI'
    case 'wandb':
      return 'Weights & Biases'
    case 'anyscale':
      return 'Anyscale'
    default:
      try {
        return camelCase(provider, { pascalCase: true })
          .replace(/([A-Z])/g, ' $1')
          .trim()
      } catch (e) {
        return provider
      }
  }
}
