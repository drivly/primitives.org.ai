export function setupTestEnvironment() {
  if (!process.env.AI_GATEWAY_URL) {
    process.env.AI_GATEWAY_URL = 'https://api.llm.do'
  }
}

export function hasRequiredEnvVars() {
  return !!process.env.AI_GATEWAY_TOKEN
}
