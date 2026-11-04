import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// The app's own spec (src/App.test.tsx) renders the page in jsdom with the
// app's Vite config, so it sees the component exactly as the build does.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.tsx'],
    },
  }),
)
