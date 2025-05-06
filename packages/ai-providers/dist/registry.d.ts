export declare const registry: import('ai').ProviderRegistryProvider<
  {
    anthropic: import('@ai-sdk/anthropic').AnthropicProvider
    openai: import('@ai-sdk/openai').OpenAIProvider
    xai: import('@ai-sdk/xai').XaiProvider
    groq: import('@ai-sdk/groq').GroqProvider
    bedrock: import('@ai-sdk/amazon-bedrock').AmazonBedrockProvider
    google: import('@ai-sdk/google').GoogleGenerativeAIProvider
    googleVertex: import('@ai-sdk/google-vertex').GoogleVertexProvider
    perplexity: import('@ai-sdk/perplexity').PerplexityProvider
  },
  '/'
>
export declare const languageModel: (modelId: string) => {
  generate: (options: any) => Promise<{
    text: string
  }>
  stream: (options: any) => Promise<{
    text: string
  }>
}
