import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_NAME } from './src/site'

// The tab title is the site's name (src/site.ts), the one place it is spelled:
// index.html carries a placeholder this writes, escaped, in dev and at build.
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-name',
      transformIndexHtml: (html) => html.replace('__SITE_NAME__', escapeHtml(SITE_NAME)),
    },
  ],
})
