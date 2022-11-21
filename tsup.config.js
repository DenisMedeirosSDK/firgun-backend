import { defineConfig } from 'tsup'

export default defineConfig((option) => {
  return {
    entry: ['./src/**/*.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    format: ['cjs', 'esm'],
    outDir: './dist',
    platform: 'node',
    minify: !option.watch,
    ignoreWatch: ['./src/**/*.spec.ts', './src/**/*.test.ts']
  }
})
