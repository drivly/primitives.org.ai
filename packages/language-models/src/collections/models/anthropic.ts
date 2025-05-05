import { Model } from '../../types'

export const anthropicModels: Model[] = [
  {
    slug: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    author: 'Anthropic',
    description: 'Anthropic\'s most powerful model for highly complex tasks',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    author: 'Anthropic',
    description: 'Balanced model for enterprise use cases',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    author: 'Anthropic',
    description: 'Fast and efficient model for simple tasks',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    author: 'Anthropic',
    description: 'Improved version of Claude 3 Sonnet',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-2',
    name: 'Claude 2',
    author: 'Anthropic',
    description: 'Previous generation Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-instant',
    name: 'Claude Instant',
    author: 'Anthropic',
    description: 'Fast and cost-effective Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    author: 'Anthropic',
    description: 'Improved version of Claude 3 Sonnet',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    author: 'Anthropic',
    description: 'Improved version of Claude 3 Haiku',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-3-opus-20240229',
    name: 'Claude 3 Opus (2024-02-29)',
    author: 'Anthropic',
    description: 'Anthropic\'s most powerful model for highly complex tasks',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
    sorting: {
      topWeekly: 1,
      newest: 5,
      throughputHighToLow: 10,
      latencyLowToHigh: 20,
      pricingLowToHigh: 30,
      pricingHighToLow: 5
    }
  },
  {
    slug: 'anthropic/claude-3-sonnet-20240229',
    name: 'Claude 3 Sonnet (2024-02-29)',
    author: 'Anthropic',
    description: 'Balanced model for enterprise use cases',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
    sorting: {
      topWeekly: 2,
      newest: 6,
      throughputHighToLow: 8,
      latencyLowToHigh: 15,
      pricingLowToHigh: 20,
      pricingHighToLow: 10
    }
  },
  {
    slug: 'anthropic/claude-3-haiku-20240307',
    name: 'Claude 3 Haiku (2024-03-07)',
    author: 'Anthropic',
    description: 'Fast and efficient model for simple tasks',
    contextLength: 200000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text'],
    sorting: {
      topWeekly: 3,
      newest: 4,
      throughputHighToLow: 5,
      latencyLowToHigh: 5,
      pricingLowToHigh: 10,
      pricingHighToLow: 20
    }
  }
]
