import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    globals: true,
  },
  resolve: {
    conditions: ['node'],
  },
  css: {
    modules: {
      generateScopedName: '[local]',
    },
  },
  plugins: [
    {
      name: 'mock-css-and-postcss',
      configResolved(config) {
        if (config.css && typeof config.css === 'object') {
          config.css.postcss = { plugins: [] };
        }
      },
      transform(code, id) {
        if (id.match(/\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\?)/)) {
          return {
            code: 'export default {}',
            map: null
          }
        }
      }
    }
  ]
})
