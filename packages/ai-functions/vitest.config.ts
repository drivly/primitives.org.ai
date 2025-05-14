import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    deps: {
      optimizer: {
        web: {
          include: ['ai-providers']
        },
        ssr: {
          include: ['ai-providers']
        }
      }
    },
  },
  resolve: {
    alias: {
      'ai-providers': resolve(__dirname, '../ai-providers/src'),
    },
  },
})
