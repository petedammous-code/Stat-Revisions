import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// Sur GitHub Pages le site est servi sous /<nom-du-repo>/ ; en local sous /.
const base = process.env.SITE_BASE ?? '/'

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    target: 'es2022',
    chunkSizeWarningLimit: 6000,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    testTimeout: 180000,
    cache: false,
    alias: {
      'plotly.js-dist-min': fileURLToPath(new URL('./tests/stubs/plotly.ts', import.meta.url)),
    },
  },
} as any)
