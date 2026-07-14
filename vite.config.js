import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const site = JSON.parse(readFileSync('./site.config.json', 'utf8'))

for (const key of ['siteName', 'subdomain', 'owner', 'themeColor']) {
  if (!site[key]) throw new Error(`site.config.json is missing "${key}"`)
}

// Makes site.config.json available to the app two ways:
//   - `import site from 'virtual:site'` inside components
//   - %SITE_NAME% / %THEME_COLOR% placeholders inside index.html
const siteConfigPlugin = {
  name: 'site-config',
  resolveId: (id) => (id === 'virtual:site' ? '\0virtual:site' : null),
  load: (id) =>
    id === '\0virtual:site' ? `export default ${JSON.stringify(site)}` : null,
  transformIndexHtml: (html) =>
    html
      .replaceAll('%SITE_NAME%', site.siteName)
      .replaceAll('%TAGLINE%', site.tagline ?? '')
      .replaceAll('%THEME_COLOR%', site.themeColor),
}

export default defineConfig({
  plugins: [vue(), siteConfigPlugin],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Keep the guardrail check honest: no inlined assets sneaking past the
    // extension allowlist, and a flat, predictable dist/ layout.
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
  },
})
