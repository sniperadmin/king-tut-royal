<template>
  <section 
    :class="[
      'relative',
      section.styling?.padding || 'py-12',
      section.styling?.textColor || 'text-gray-900'
    ]"
    :style="backgroundStyle"
  >
    <div 
      :class="[
        'mx-auto px-4 sm:px-6 lg:px-8',
        section.layout?.grid === 'container' ? 'max-w-7xl' : '',
        section.layout?.grid === 'narrow' ? 'max-w-4xl' : '',
        section.layout?.grid === 'full-width' ? 'w-full' : 'max-w-7xl'
      ]"
    >
      <div 
        :class="[
          section.content?.alignment === 'center' ? 'text-center' : '',
          section.content?.alignment === 'right' ? 'text-right' : '',
          section.content?.alignment === 'left' ? 'text-left' : 'text-left'
        ]"
      >
        <!-- Title -->
        <h2 
          v-if="section.content?.title"
          :class="[
            'text-3xl font-bold mb-6',
            section.styling?.titleColor || ''
          ]"
          v-html="section.content.title"
        ></h2>

        <!-- Subtitle -->
        <h3 
          v-if="section.content?.subtitle"
          :class="[
            'text-xl text-gray-600 mb-8',
            section.styling?.subtitleColor || ''
          ]"
          v-html="section.content.subtitle"
        ></h3>

        <!-- Main text content -->
        <div 
          v-if="section.content?.text"
          :class="[
            'prose prose-lg max-w-none',
            section.content?.alignment === 'center' ? 'mx-auto' : '',
            section.styling?.textColor || ''
          ]"
          v-html="section.content.text"
        ></div>

        <!-- Call to action -->
        <div 
          v-if="section.content?.cta"
          class="mt-8"
        >
          <a
            :href="section.content.cta.link || '#'"
            :class="[
              'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors',
              section.content.cta.style === 'outline' 
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            ]"
          >
            {{ section.content.cta.text || 'Learn More' }}
          </a>
        </div>
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