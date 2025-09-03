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
      <div v-if="section.content?.title || section.content?.subtitle" class="text-center mb-16">
        <h2 
          v-if="section.content?.title"
          class="text-3xl font-bold mb-4"
          v-html="section.content.title"
        ></h2>
        <p 
          v-if="section.content?.subtitle"
          class="text-xl text-gray-600 max-w-3xl mx-auto"
          v-html="section.content.subtitle"
        ></p>
      </div>

      <!-- Features grid -->
      <div 
        v-if="section.content?.features && section.content.features.length > 0"
        :class="[
          'grid gap-8',
          section.layout?.grid || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        ]"
      >
        <div
          v-for="(feature, index) in section.content.features"
          :key="index"
          class="text-center group"
        >
          <!-- Feature icon -->
          <div class="mb-6">
            <div 
              v-if="feature.icon"
              class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
            >
              <!-- Icon placeholder - in production, you'd use an icon library -->
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Feature title -->
          <h3 
            v-if="feature.title"
            class="text-xl font-semibold mb-4"
            v-html="feature.title"
          ></h3>

          <!-- Feature description -->
          <p 
            v-if="feature.description"
            class="text-gray-600 leading-relaxed"
            v-html="feature.description"
          ></p>

          <!-- Feature link -->
          <a
            v-if="feature.link"
            :href="feature.link.url || '#'"
            class="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            {{ feature.link.text || 'Learn more' }}
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Empty state -->
      <div 
        v-else-if="previewMode"
        class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
      >
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No features</h3>
        <p class="mt-1 text-sm text-gray-500">Add features to display in this section.</p>
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
      return { backgroundColor: bg.value || '#ffffff' }
    
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
      return { backgroundColor: '#ffffff' }
  }
})
</script>