import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { vite as vidstack } from 'vidstack/plugins';

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
    vidstack()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['@tanstack/vue-query', 'radix-vue', 'lucide-vue-next'],
          video: ['vidstack', 'hls.js'],
          forms: ['vee-validate', 'zod', 'vue-tel-input']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@supabase/supabase-js']
  }
}));
