export default {
  entry: {
    'index': 'src/index.ts',
    'api': 'api/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  clean: true,
  outExtension: ({ format }) => ({
    js: format === 'cjs' ? '.js' : '.mjs',
  }),
  tsconfig: './tsconfig.json',
}
