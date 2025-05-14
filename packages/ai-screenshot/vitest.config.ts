import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    deps: {
      inline: ['ai-functions', 'ai-providers'],
      optimizer: {
        web: {
          include: ['ai-functions', 'ai-providers']
        },
        ssr: {
          include: ['ai-functions', 'ai-providers']
        }
      }
    },
  },
  resolve: {
    alias: {
      'ai-functions': resolve(__dirname, '../ai-functions/src'),
      'ai-providers': resolve(__dirname, '../ai-providers/src'),
    },
  },
})
