<template>
  <div class="section-preview" :style="sectionStyles">
    <!-- Hero Section Preview -->
    <div v-if="section.type === 'hero'" class="relative h-64 flex items-center justify-center">
      <div class="text-center text-white z-10">
        <h1 class="text-4xl font-bold mb-4">{{ section.content.title || 'Hero Title' }}</h1>
        <p class="text-xl mb-6">{{ section.content.subtitle || 'Hero subtitle text' }}</p>
        <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
          {{ section.content.buttonText || 'Call to Action' }}
        </button>
      </div>
      <div v-if="section.layout.background.type === 'image'" class="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>

    <!-- Content Section Preview -->
    <div v-else-if="section.type === 'content'" class="p-8">
      <div class="max-w-4xl mx-auto">
        <h2 v-if="section.content.title" class="text-3xl font-bold mb-6 text-gray-900">
          {{ section.content.title }}
        </h2>
        <div class="prose prose-lg max-w-none">
          <p>{{ section.content.text || 'Content section text goes here. This is a preview of how your content will appear on the live site.' }}</p>
        </div>
      </div>
    </div>

    <!-- Media Section Preview -->
    <div v-else-if="section.type === 'media'" class="p-8">
      <div class="max-w-6xl mx-auto">
        <div v-if="section.layout.columns === 2" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-bold mb-4">{{ section.content.title || 'Media Section' }}</h3>
            <p class="text-gray-600">{{ section.content.description || 'Description for your media section.' }}</p>
          </div>
          <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div v-else class="text-center">
          <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
            <svg class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-4">{{ section.content.title || 'Media Section' }}</h3>
          <p class="text-gray-600">{{ section.content.description || 'Description for your media section.' }}</p>
        </div>
      </div>
    </div>

    <!-- Gallery Section Preview -->
    <div v-else-if="section.type === 'gallery'" class="p-8">
      <div class="max-w-6xl mx-auto">
        <h3 v-if="section.content.title" class="text-2xl font-bold mb-6 text-center">
          {{ section.content.title }}
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="i in 8" :key="i" class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section Preview -->
    <div v-else-if="section.type === 'features'" class="p-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">{{ section.content.title || 'Features' }}</h2>
          <p class="text-gray-600">{{ section.content.subtitle || 'Feature section subtitle' }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="text-center">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Feature {{ i }}</h3>
            <p class="text-gray-600">Feature description goes here.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section Preview -->
    <div v-else-if="section.type === 'cta'" class="p-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">{{ section.content.title || 'Call to Action' }}</h2>
        <p class="text-xl text-gray-600 mb-8">{{ section.content.description || 'Compelling call to action description.' }}</p>
        <button class="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700">
          {{ section.content.buttonText || 'Get Started' }}
        </button>
      </div>
    </div>

    <!-- Contact Section Preview -->
    <div v-else-if="section.type === 'contact'" class="p-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-3xl font-bold mb-6">{{ section.content.title || 'Contact Us' }}</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ section.content.email || 'contact@example.com' }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ section.content.phone || '+1 (555) 123-4567' }}</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 rounded-lg p-6">
            <div class="space-y-4">
              <div>
                <div class="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div class="h-10 bg-white rounded border"></div>
              </div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div class="h-10 bg-white rounded border"></div>
              </div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div class="h-24 bg-white rounded border"></div>
              </div>
              <div class="h-10 bg-indigo-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Default/Unknown Section Preview -->
    <div v-else class="p-8 text-center">
      <div class="max-w-2xl mx-auto">
        <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ formatSectionType(section.type) }}</h3>
        <p class="text-gray-500">Section preview will appear here</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Section } from '@/composables/admin/usePageBuilder'

interface Props {
  section: Section
}

const props = defineProps<Props>()

const sectionStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Background styles
  if (props.section.layout.background) {
    const bg = props.section.layout.background
    
    switch (bg.type) {
      case 'color':
        styles.backgroundColor = bg.value
        break
      case 'image':
        if (bg.url) {
          styles.backgroundImage = `url(${bg.url})`
          styles.backgroundSize = 'cover'
          styles.backgroundPosition = 'center'
        }
        break
      case 'gradient':
        styles.background = bg.value
        break
      case 'video':
        // Video backgrounds would need special handling
        styles.backgroundColor = '#000'
        break
    }
  }
  
  return styles
})

const formatSectionType = (type: string) => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.section-preview {
  min-height: 100px;
  position: relative;
}

.prose {
  color: inherit;
}

.prose p {
  margin-bottom: 1rem;
}
</style>