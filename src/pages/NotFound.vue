<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center p-8 rounded-lg border border-border bg-card shadow-md animate-slide-in">
      <h1 class="text-5xl font-bold mb-6 text-primary">404</h1>
      <p class="text-xl text-card-foreground mb-6">Page not found</p>
      <router-link 
        to="/" 
        class="text-primary hover:text-primary/80 underline transition-colors"
      >
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  console.error(
    "404 Error: User attempted to access non-existent route:",
    route.path
  )
})
</script>