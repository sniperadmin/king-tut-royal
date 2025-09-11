<template>
  <div class="min-h-screen bg-black text-white">
    <Navigation />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from './Navigation.vue'
import Footer from './Footer.vue'
</script>
