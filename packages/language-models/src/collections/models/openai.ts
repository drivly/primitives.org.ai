import { Model } from '../../types'

export const openaiModels: Model[] = [
  {
    slug: 'openai/gpt-4o',
    name: 'GPT-4o',
    author: 'OpenAI',
    description: 'OpenAI\'s most advanced multimodal model',
    contextLength: 128000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    author: 'OpenAI',
    description: 'Improved version of GPT-4 with better performance',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4',
    name: 'GPT-4',
    author: 'OpenAI',
    description: 'OpenAI\'s powerful large language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    author: 'OpenAI',
    description: 'Efficient and cost-effective language model',
    contextLength: 16385,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-3.5-turbo-16k',
    name: 'GPT-3.5 Turbo 16K',
    author: 'OpenAI',
    description: 'GPT-3.5 Turbo with extended context length',
    contextLength: 16385,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/dall-e-3',
    name: 'DALL-E 3',
    author: 'OpenAI',
    description: 'Advanced image generation model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'openai/dall-e-2',
    name: 'DALL-E 2',
    author: 'OpenAI',
    description: 'Image generation model',
    contextLength: 1024,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'openai/whisper',
    name: 'Whisper',
    author: 'OpenAI',
    description: 'Speech recognition model',
    contextLength: 0,
    inputModalities: ['audio'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/tts-1',
    name: 'TTS-1',
    author: 'OpenAI',
    description: 'Text-to-speech model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['audio']
  },
  {
    slug: 'openai/tts-1-hd',
    name: 'TTS-1-HD',
    author: 'OpenAI',
    description: 'High-definition text-to-speech model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['audio']
  },
  {
    slug: 'openai/gpt-4o-2024-05-13',
    name: 'GPT-4o (2024-05-13)',
    author: 'OpenAI',
    description: 'OpenAI\'s most advanced multimodal model',
    contextLength: 128000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
    sorting: {
      topWeekly: 4,
      newest: 1,
      throughputHighToLow: 7,
      latencyLowToHigh: 12,
      pricingLowToHigh: 15,
      pricingHighToLow: 15
    }
  },
  {
    slug: 'openai/gpt-4-turbo-2024-04-09',
    name: 'GPT-4 Turbo (2024-04-09)',
    author: 'OpenAI',
    description: 'Improved version of GPT-4 with better performance',
    contextLength: 128000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
    sorting: {
      topWeekly: 5,
      newest: 2,
      throughputHighToLow: 6,
      latencyLowToHigh: 10,
      pricingLowToHigh: 25,
      pricingHighToLow: 8
    }
  }
]
