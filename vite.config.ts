import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { vite as vidstack } from 'vidstack/plugins';
import { visualizer } from 'rollup-plugin-visualizer'
import json5Plugin from 'vite-plugin-json5'
import compression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import sitemapPlugin from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const routes = [
    '/',
    '/packages',
    '/partners',
    '/why-us',
    '/tour-leaders',
    '/become-agent',
    '/media',
    '/booking'
  ];

  return {
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
      }),
      // Temporarily disable sitemap plugin to fix build issues
      // sitemapPlugin({
      //   hostname: 'https://kingtutroyal.com',
      //   routes,
      //   readable: true,
      //   exclude: ['/404'],
      //   robots: []
      // })
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
          chunkFileNames: 'assets/[name]-[hash].js'
        }
      }
    }
  };
});
