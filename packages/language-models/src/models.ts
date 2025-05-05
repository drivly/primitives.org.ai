export interface LanguageModel {
  id: string
  name: string
  provider: string
  contextLength: number
  maxTokens: number
  capabilities: string[]
}

export const models: LanguageModel[] = []
