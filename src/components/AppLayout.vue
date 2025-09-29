<template>
  <div class="min-h-screen bg-background text-foreground">
    <Navigation />
    <main>
      <slot />
    </main>

    <ContactSection class="my-7" />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from './Navigation.vue'
import Footer from './Footer.vue'
import ContactSection from './sections/ContactSection.vue'
</script>

<script lang="ts">
export default {
  name: 'AppLayout'
}
</script>
