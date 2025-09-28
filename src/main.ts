import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'

import './index.css'

// Create Vue Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const app = createApp(App)
const head = createHead()

// Install plugins
app.use(head)
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#root')
