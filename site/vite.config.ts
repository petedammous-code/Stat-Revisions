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
    rolldownOptions: {
      output: {
        // Bibliothèques lourdes et contenu dans des fichiers séparés (cache navigateur indépendant).
        codeSplitting: {
          groups: [
            { name: 'plotly', test: /plotly\.js-dist-min/, priority: 3 },
            { name: 'katex', test: /node_modules[\\/]katex/, priority: 2 },
            { name: 'contenu', test: /src[\\/]content[\\/]/, priority: 1 },
          ],
        },
      },
    },
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
