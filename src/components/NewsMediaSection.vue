<template>
  <section class="py-6 bg-background-light dark:bg-background-dark">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-extrabold text-center text-primary mb-12">Latest News & Media</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <component
          v-for="(post, index) in posts"
          :key="index"
          :is="post.internal ? 'router-link' : 'a'"
          v-bind="post.internal ? { to: post.link } : { href: post.link, target: '_blank', rel: 'noopener noreferrer' }"
          class="block bg-card-light dark:bg-card-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <img :src="post.image" :alt="post.title" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" width="512" height="256" />
          <div class="p-8">
            <h3 class="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">{{ post.title }}</h3>
            <p class="text-muted-foreground leading-relaxed mb-6">{{ post.excerpt }}</p>
            <span class="inline-flex items-center text-primary font-semibold group-hover:underline">
              Read More
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    internal: true,
    link: '/media/king-tut-royal-package',
    image: 'https://framerusercontent.com/images/mYzqsDBWUVLpvmQ534wIe1N58to.png?width=1200&height=600',
    title: 'Sherin Yosry Consulting FZ-LLC: Crafting Unique Luxury Experiences with the King Tut Royal Package',
    excerpt: 'In the heart of Egypt, where the majestic Pyramids of Giza stand watch over the land, a monumental cultural event is unfolding. The Grand Egyptian Museum (GEM), set to open its doors on November 1, 2025, will forever change the global tourism landscape.'
  },
  {
    internal: false,
    link: 'https://ceotimes.com/sherin-yosry-consulting-and-the-king-tut-royal-legacy/',
    image: 'https://ceotimes.com/wp-content/uploads/2025/09/download-2-23-1170x585.png',
    title: 'Sherin Yosry Consulting and the King Tut Royal Legacy',
    excerpt: 'An exclusive journey into Egypt\'s timeless heritage meets modern luxury through Sherin Yosry\'s visionary leadership. The lights of Cairo glistened on the horizon, casting their golden reflection on the timeless Nile.'
  }
])
</script>

<style scoped>
/* Add any specific styles if needed, though Tailwind should handle most */
</style>