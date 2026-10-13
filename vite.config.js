import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'

const wireframesDir = resolve(__dirname, 'wireframes')
const htmlInputs = Object.fromEntries(
  readdirSync(wireframesDir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [file.replace(/\.html$/, ''), resolve(wireframesDir, file)])
)

export default defineConfig({
  root: 'wireframes',
  base: process.env.GITHUB_PAGES === 'true' ? '/lausanne-europe/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
  server: {
    open: '/index.html',
  },
  preview: {
    open: '/index.html',
  },
})
