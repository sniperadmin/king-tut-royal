import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { vite as vidstack } from 'vidstack/plugins';
import { visualizer } from 'rollup-plugin-visualizer'
import json5Plugin from 'vite-plugin-json5'
import compression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('media-'),
        },
      },
    }),
    mode === 'report' && visualizer({ filename: 'dist/bundle-stats.html', open: true }),
    json5Plugin(),
    compression({
      algorithm: 'brotliCompress',
      deleteOriginalAssets: false,
      skipIfLargerOrEqual: true
    }),
    vidstack(),
    viteImagemin({
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.9] },
      webp: { quality: 80 }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  optimizeDeps: {
    include: ['@tanstack/vue-query', 'vee-validate']
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['@tanstack/vue-query', 'lucide-vue-next'],
          forms: ['vee-validate', 'zod', 'vue-tel-input'],
          heroSection: [
            './src/components/HeroSection.vue'
          ],
          packageCard: [
            './src/components/PackageCard.vue'
          ],
          bookingSection: [
            './src/components/BookingSection.vue'
          ],
          videoSection: [
            './src/components/sections/VideoSection.vue'
          ]
        }
      }
    }
  }
}));
