import { Model } from '../../types'

export const metaModels: Model[] = [
  {
    slug: 'meta/llama-3-405b',
    name: 'Llama 3 405B',
    author: 'Meta',
    description: 'Meta\'s largest and most capable language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-3-70b',
    name: 'Llama 3 70B',
    author: 'Meta',
    description: 'Powerful open-source language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-3-8b',
    name: 'Llama 3 8B',
    author: 'Meta',
    description: 'Efficient open-source language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-2-70b',
    name: 'Llama 2 70B',
    author: 'Meta',
    description: 'Previous generation large language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-2-13b',
    name: 'Llama 2 13B',
    author: 'Meta',
    description: 'Medium-sized previous generation language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-2-7b',
    name: 'Llama 2 7B',
    author: 'Meta',
    description: 'Efficient previous generation language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  }
]
