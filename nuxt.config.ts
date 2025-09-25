import { vite as vidstack } from 'vidstack/plugins';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'vuetify-nuxt-module',
    '@nuxtjs/supabase'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
      ssrClientHints: {
        reloadOnFirstRequest: false,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
        viewportSize: true,
      },
    },
    vuetifyOptions: './vuetify.config.ts',
  },

  features: {
    inlineStyles: false
  },
  
  supabase: {
    useSsrCookies: false,
    redirect: false
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('media-'),
    },
  },

  vite: {
    plugins: [vidstack()],
  }
})
