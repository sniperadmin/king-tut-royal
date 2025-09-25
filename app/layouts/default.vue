<template>
  <v-app>
    <AppHeader />
    <v-main>
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
// No script needed for a basic layout
</script>

<style scoped>
/* Add any layout-specific styles here */
</style>