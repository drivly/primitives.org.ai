import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    deps: {
      inline: ['vitest-mock-extended'],
      optimizer: {
        web: {
          include: ['ai-functions', 'ai-providers']
        },
        ssr: {
          include: ['ai-functions', 'ai-providers']
        }
      }
    },
    css: false,
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/databases': resolve(__dirname, './src/databases'),
      '@/collections': resolve(__dirname, './src/collections'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/workflows': resolve(__dirname, './src/workflows'),
      'ai-functions': resolve(__dirname, '../ai-functions/src'),
      'ai-providers': resolve(__dirname, '../ai-providers/src'),
    },
  },
})
