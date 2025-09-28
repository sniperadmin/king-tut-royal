<template>
  <div class="container mx-auto p-8">
    <router-link to="/media" class="text-primary hover:underline mb-8 inline-block">&larr; Back to Home</router-link>
    <div v-if="article.title" class="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8">
      <h1 class="text-4xl font-bold text-foreground mb-4">{{ article.title }}</h1>
      <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-96 object-cover rounded-lg mb-6" />
      <div class="prose dark:prose-invert max-w-none" v-html="article.content"></div>
    </div>
    <div v-else-if="loading" class="text-center text-foreground text-xl">Loading article...</div>
    <div v-else class="text-center text-red-500 text-xl">Failed to load article.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref({});
const loading = ref(true);

const fetchArticleContent = async (url) => {
  loading.value = true;
  article.value = {};
  try {
    // In a real application, you would call your backend here
    // which would then use Firecrawl to scrape the content.
    // For this example, we'll simulate a Firecrawl call directly if it's an external URL.
    if (url && url.startsWith('http')) {
      const response = await fetch(`https://api.firecrawl.dev/v0/scrape?url=${encodeURIComponent(url)}`, {
        headers: {
          'Authorization': 'Bearer YOUR_FIRECRAWL_API_KEY' // Replace with your actual API key
        }
      });
      const data = await response.json();
      if (data && data.data && data.data.content) {
        article.value = {
          title: data.data.title || 'No Title',
          image: data.data.image || null,
          content: data.data.content,
        };
      } else {
        article.value.content = 'Could not fetch content from external URL.';
      }
    } else {
      // This is a placeholder for internal articles or if Firecrawl fails
      article.value = {
        title: route.params.title.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        image: 'https://via.placeholder.com/1200x600?text=Internal+Article',
        content: `<p>This is the full content for the internal article titled "${route.params.title.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}".</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
      };
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    article.value.content = 'Error loading article content.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const externalUrl = route.query?.url;
  fetchArticleContent(externalUrl);
});

watch(() => route.query?.url, (newUrl) => {
  fetchArticleContent(newUrl);
});
</script>

<style scoped>
/* Add any specific styles for your article page here */
.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
</style>