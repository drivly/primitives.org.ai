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
  outExtension: ({ format }: { format: string }) => ({
    js: format === 'cjs' ? '.js' : '.mjs',
  }),
  tsconfig: './tsconfig.json',
}
