import { Model } from '../../types'

export const stabilityModels: Model[] = [
  {
    slug: 'stability/stable-diffusion-3',
    name: 'Stable Diffusion 3',
    author: 'Stability AI',
    description: 'Advanced image generation model',
    contextLength: 77,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'stability/stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    author: 'Stability AI',
    description: 'High-quality image generation model',
    contextLength: 77,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'stability/stable-diffusion-2',
    name: 'Stable Diffusion 2',
    author: 'Stability AI',
    description: 'Previous generation image generation model',
    contextLength: 77,
    inputModalities: ['text'],
    outputModalities: ['image']
  }
]
