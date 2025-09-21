<template>
  <component
    :is="post.internal ? 'router-link' : 'a'"
    :to="post.internal ? { name: 'ArticlePage', params: { title: post.link.split('/').pop() }, query: { url: post.link } } : null"
    :href="post.internal ? null : post.link"
    :target="post.internal ? null : '_blank'"
    :rel="post.internal ? null : 'noopener noreferrer'"
    class="block my-6 max-w-lg mx-auto bg-card-light dark:bg-card-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
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
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Post {
  internal: boolean;
  link: string;
  image: string;
  title: string;
  excerpt: string;
}

defineProps<{
  post: Post;
}>();
</script>

<style scoped>
/* Add any specific styles for the ArticleCard here if needed */
</style>
