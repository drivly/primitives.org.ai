import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      'ai-functions': '/home/ubuntu/repos/primitives.org.ai/packages/ai-functions',
      'ai-providers': '/home/ubuntu/repos/primitives.org.ai/packages/ai-providers',
    },
  },
})
