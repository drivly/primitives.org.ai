export interface Model {
  slug: string
  name: string
  author: string
  description: string
  contextLength: number
  inputModalities: string[]
  outputModalities: string[]
  sorting?: {
    topWeekly: number
    newest: number
    throughputHighToLow: number
    latencyLowToHigh: number
    pricingLowToHigh: number
    pricingHighToLow: number
  }
}

export interface ParsedModel {
  original: string
  model?: string
  author?: string
  capabilities?: Record<string, boolean>
  providerConstraints?: Array<{
    field: string
    type: string
    value: string
  }>
}
