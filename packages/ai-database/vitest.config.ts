import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/databases/sqlite': path.resolve(__dirname, './src/databases/sqlite'),
      '@/collections': path.resolve(__dirname, './src/collections'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/workflows': path.resolve(__dirname, './src/workflows'),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next', 'dist'],
    globals: true,
    css: false,
  },
})
