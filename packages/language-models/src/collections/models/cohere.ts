import { Model } from '../../types'

export const cohereModels: Model[] = [
  {
    slug: 'cohere/command-r',
    name: 'Command R',
    author: 'Cohere',
    description: 'Powerful language model for enterprise use',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'cohere/command-r-plus',
    name: 'Command R+',
    author: 'Cohere',
    description: 'Enhanced version of Command R',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'cohere/command',
    name: 'Command',
    author: 'Cohere',
    description: 'Previous generation language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'cohere/embed-english',
    name: 'Embed English',
    author: 'Cohere',
    description: 'English text embedding model',
    contextLength: 512,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },
  {
    slug: 'cohere/embed-multilingual',
    name: 'Embed Multilingual',
    author: 'Cohere',
    description: 'Multilingual text embedding model',
    contextLength: 512,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  }
]
