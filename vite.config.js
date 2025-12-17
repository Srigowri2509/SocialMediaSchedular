import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For Vercel, use root path. For GitHub Pages, use repo name
  base: process.env.VITE_BASE || (process.env.VERCEL ? '/' : '/SocialMediaSchedular/'),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
