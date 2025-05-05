import { Model } from '../types'

const baseModels: Model[] = [
  {
    slug: 'openai/gpt-4o',
    name: 'GPT-4o',
    author: 'OpenAI',
    description: 'OpenAI\'s most advanced multimodal model',
    contextLength: 128000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  }
]

const generatedModels: Model[] = []
for (let i = 0; i < 410; i++) {
  generatedModels.push({
    slug: `test/model-${i}`,
    name: `Test Model ${i}`,
    author: `Test Provider ${Math.floor(i / 10)}`,
    description: `Test model description ${i}`,
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text'],
    sorting: i % 10 === 0 ? {
      topWeekly: i % 50,
      newest: i % 40,
      throughputHighToLow: i % 30,
      latencyLowToHigh: i % 20,
      pricingLowToHigh: i % 15,
      pricingHighToLow: i % 25
    } : undefined
  })
}

export const models: Model[] = [...baseModels, ...generatedModels]
