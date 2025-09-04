<template>
  <ThemeProvider default-theme="dark">
    <TooltipProvider>
      <router-view />
      <ToastContainer />
    </TooltipProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import ThemeProvider from '@/components/theme-provider.vue'
import TooltipProvider from '@/components/TooltipProvider.vue'
import ToastContainer from '@/components/ToastContainer.vue'
</script>