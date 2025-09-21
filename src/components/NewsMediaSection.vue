<template>
  <section class="py-6 bg-brownish/10 dark:bg-background-dark">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-extrabold text-center text-primary mb-12">Latest News & Media</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- News Post 1 -->
        <p class="text-center col-span-full">Check out our latest news and media articles!</p>
      </div>
      <div class="text-center mt-10">
        <router-link to="/media" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-300">
          View All Articles
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* Add any specific styles if needed, though Tailwind should handle most */
</style>