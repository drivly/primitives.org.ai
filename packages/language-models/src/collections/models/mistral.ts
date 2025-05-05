import { Model } from '../../types'

export const mistralModels: Model[] = [
  {
    slug: 'mistral/mistral-large',
    name: 'Mistral Large',
    author: 'Mistral AI',
    description: 'Mistral\'s most powerful language model',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'mistral/mistral-medium',
    name: 'Mistral Medium',
    author: 'Mistral AI',
    description: 'Balanced performance and efficiency',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'mistral/mistral-small',
    name: 'Mistral Small',
    author: 'Mistral AI',
    description: 'Efficient language model for simple tasks',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'mistral/mistral-7b',
    name: 'Mistral 7B',
    author: 'Mistral AI',
    description: 'Open-source efficient language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'mistral/mixtral-8x7b',
    name: 'Mixtral 8x7B',
    author: 'Mistral AI',
    description: 'Mixture of experts language model',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'mistral/mixtral-8x22b',
    name: 'Mixtral 8x22B',
    author: 'Mistral AI',
    description: 'Larger mixture of experts language model',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  }
]
