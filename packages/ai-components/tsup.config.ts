import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next', 'ai-props', 'next-mdx-remote', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
})
