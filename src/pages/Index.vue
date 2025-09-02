<template>
  <AppLayout />
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import { provideAppContext } from '@/composables/useAppContext'

// Provide app context for child components
provideAppContext()
</script>