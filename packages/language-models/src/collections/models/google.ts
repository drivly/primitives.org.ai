import { Model } from '../../types'

export const googleModels: Model[] = [
  {
    slug: 'google/gemini-2.0-flash-001',
    name: 'Gemini 2.0 Flash',
    author: 'Google',
    description: 'Fast and efficient multimodal model',
    contextLength: 1000000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemini-2.0-pro-001',
    name: 'Gemini 2.0 Pro',
    author: 'Google',
    description: 'Advanced multimodal model for complex tasks',
    contextLength: 1000000,
    inputModalities: ['text', 'image', 'audio', 'video'],
    outputModalities: ['text'],
    sorting: {
      topWeekly: 6,
      newest: 3,
      throughputHighToLow: 4,
      latencyLowToHigh: 8,
      pricingLowToHigh: 12,
      pricingHighToLow: 18
    }
  },
  {
    slug: 'google/gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    author: 'Google',
    description: 'Multimodal model with long context',
    contextLength: 1000000,
    inputModalities: ['text', 'image', 'audio', 'video'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    author: 'Google',
    description: 'Fast and efficient multimodal model',
    contextLength: 1000000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemini-1.0-pro',
    name: 'Gemini 1.0 Pro',
    author: 'Google',
    description: 'First generation Gemini model',
    contextLength: 32768,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'google/palm-2',
    name: 'PaLM 2',
    author: 'Google',
    description: 'Previous generation Google language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemma-7b',
    name: 'Gemma 7B',
    author: 'Google',
    description: 'Open-source efficient language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemma-2b',
    name: 'Gemma 2B',
    author: 'Google',
    description: 'Lightweight open-source language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  }
]
