import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { vite as vidstack } from 'vidstack/plugins';
import { visualizer } from 'rollup-plugin-visualizer'

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
    vidstack()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         packageCard: [
  //           './src/components/PackageCard.vue',
  //           './src/components/PackageDetailsModal.vue'
  //         ]
  //       }
  //     }
  //   }
  // }
}));
