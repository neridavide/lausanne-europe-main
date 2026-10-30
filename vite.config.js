import { defineConfig } from 'vite'
import { relative, resolve } from 'node:path'
import { copyFileSync, readdirSync } from 'node:fs'

const wireframesDir = resolve(__dirname, 'wireframes')
const findHtmlFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = resolve(directory, entry.name)
  if (entry.isDirectory()) return findHtmlFiles(path)
  return entry.isFile() && entry.name.endsWith('.html') ? [path] : []
})

const htmlInputs = Object.fromEntries(
  findHtmlFiles(wireframesDir)
    .filter((file) => relative(wireframesDir, file) !== 'index.html')
    .map((file) => [relative(wireframesDir, file).replace(/\.html$/, ''), file])
)

export default defineConfig({
  root: 'wireframes',
  base: process.env.GITHUB_PAGES === 'true' ? '/lausanne-europe-main/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
  plugins: [
    {
      name: 'homepage-at-root',
      closeBundle() {
        copyFileSync(resolve(__dirname, 'dist/homepage.html'), resolve(__dirname, 'dist/index.html'))
      },
    },
  ],
  server: {
    open: '/',
  },
  preview: {
    open: '/',
  },
})
