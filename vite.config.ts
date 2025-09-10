import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { vite as vidstack } from 'vidstack/plugins';
import { visualizer } from 'rollup-plugin-visualizer'
import json5Plugin from 'vite-plugin-json5'

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
    visualizer({ filename: 'dist/bundle-stats.html', open: true }),
    vidstack(),
    json5Plugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['@tanstack/vue-query', 'lucide-vue-next'],
          video: ['vidstack', 'hls.js'],
          forms: ['vee-validate', 'zod', 'vue-tel-input'],
          heroSection: [
            './src/components/HeroSection.vue'
          ],
          packageCard: [
            './src/components/PackageCard.vue',
            './src/components/PackageDetailsModal.vue'
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
