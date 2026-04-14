import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    tsconfig: 'tsconfig.vitest.json',
  },
  test: {
    globals: true, // makes this work with jest default globals `describe, expect` etc
    exclude: ['build/**/*', 'node_modules/**/*'],
    testTimeout: 60000,
  },
})
