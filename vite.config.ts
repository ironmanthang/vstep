import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: null,
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png'],
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        importScripts: ['/sw-custom.js'],
        navigateFallback: null,
        globIgnores: ['**/index.html'],
      },
      manifest: {
        name: 'VSTEP Master',
        short_name: 'VSTEP Master',
        description: 'Nền tảng luyện thi VSTEP thế hệ mới với Flashcard SRS, hỗ trợ tra từ và luyện 4 kỹ năng.',
        theme_color: '#141210',
        background_color: '#141210',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 2100,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('features/reading/data/dictionaryVi')) {
            return 'reading-dictionary';
          }
          if (id.includes('features/flashcard/corpus')) {
            return 'flashcard-corpus';
          }
        }
      }
    }
  }
})
