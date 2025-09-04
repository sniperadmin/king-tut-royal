<template>
  <section 
    :class="[
      'relative',
      section.styling?.padding || 'py-16',
      section.styling?.textColor || 'text-gray-900'
    ]"
    :style="backgroundStyle"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div v-if="section.content?.title || section.content?.subtitle" class="text-center mb-12">
        <h2 
          v-if="section.content?.title"
          class="text-3xl font-bold mb-4"
          v-html="section.content.title"
        ></h2>
        <p 
          v-if="section.content?.subtitle"
          class="text-xl text-gray-600"
          v-html="section.content.subtitle"
        ></p>
      </div>

      <!-- Gallery grid -->
      <div 
        v-if="section.content?.images && section.content.images.length > 0"
        :class="[
          'grid gap-6',
          section.layout?.grid || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          section.styling?.gap || 'gap-6'
        ]"
      >
        <div
          v-for="(image, index) in section.content.images"
          :key="index"
          class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <img
            :src="image.url || image.src"
            :alt="image.alt || `Gallery image ${index + 1}`"
            class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          <!-- Image overlay with caption -->
          <div 
            v-if="image.caption"
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end"
          >
            <div class="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-sm font-medium">{{ image.caption }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div 
        v-else-if="previewMode"
        class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
      >
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No images</h3>
        <p class="mt-1 text-sm text-gray-500">Add images to display in this gallery.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Section } from '@/composables/admin/usePageBuilder'

interface Props {
  section: Section
  previewMode?: boolean
}

const props = defineProps<Props>()

// Generate background style
const backgroundStyle = computed(() => {
  const bg = props.section.layout?.background
  if (!bg) return {}

  switch (bg.type) {
    case 'color':
      return { backgroundColor: bg.value || '#f9fafb' }
    
    case 'image':
      return {
        backgroundImage: `url(${bg.url || bg.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    
    case 'gradient':
      return { background: bg.value || 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }
    
    default:
      return { backgroundColor: '#f9fafb' }
  }
})
</script>