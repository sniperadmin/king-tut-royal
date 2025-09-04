<template>
  <section 
    :class="[
      'relative',
      section.styling?.padding || 'py-20',
      section.styling?.textColor || 'text-white'
    ]"
    :style="backgroundStyle"
  >
    <!-- Background overlay -->
    <div 
      v-if="section.layout?.background?.overlay" 
      class="absolute inset-0 bg-black"
      :style="{ opacity: section.layout.background.overlay / 100 }"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Main headline -->
        <h2 
          v-if="section.content?.headline"
          :class="[
            'text-4xl md:text-5xl font-bold mb-6',
            section.styling?.headlineColor || ''
          ]"
          v-html="section.content.headline"
        ></h2>

        <!-- Subtitle -->
        <p 
          v-if="section.content?.subtitle"
          :class="[
            'text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90',
            section.styling?.subtitleColor || ''
          ]"
          v-html="section.content.subtitle"
        ></p>

        <!-- Description -->
        <p 
          v-if="section.content?.description"
          :class="[
            'text-lg mb-10 max-w-2xl mx-auto opacity-80',
            section.styling?.textColor || ''
          ]"
          v-html="section.content.description"
        ></p>

        <!-- CTA Buttons -->
        <div 
          v-if="section.content?.primaryCta || section.content?.secondaryCta"
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <!-- Primary CTA -->
          <a
            v-if="section.content?.primaryCta"
            :href="section.content.primaryCta.link || '#'"
            :class="[
              'inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105',
              section.content.primaryCta.style === 'outline' 
                ? 'border-2 border-current text-current hover:bg-current hover:text-black' 
                : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl'
            ]"
          >
            {{ section.content.primaryCta.text || 'Get Started' }}
            <svg v-if="section.content.primaryCta.showArrow" class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <!-- Secondary CTA -->
          <a
            v-if="section.content?.secondaryCta"
            :href="section.content.secondaryCta.link || '#'"
            class="inline-flex items-center px-8 py-4 text-lg font-semibold border-2 border-current text-current rounded-lg hover:bg-current hover:text-black transition-all duration-300"
          >
            {{ section.content.secondaryCta.text || 'Learn More' }}
          </a>
        </div>

        <!-- Additional info or features -->
        <div 
          v-if="section.content?.features && section.content.features.length > 0"
          class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            v-for="(feature, index) in section.content.features"
            :key="index"
            class="flex items-center justify-center space-x-3"
          >
            <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm opacity-90">{{ feature.text || feature }}</span>
          </div>
        </div>

        <!-- Trust indicators -->
        <div 
          v-if="section.content?.trustIndicator"
          class="mt-8 text-sm opacity-75"
        >
          {{ section.content.trustIndicator }}
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
  if (!bg) return { backgroundColor: '#1f2937' }

  switch (bg.type) {
    case 'color':
      return { backgroundColor: bg.value || '#1f2937' }
    
    case 'image':
      return {
        backgroundImage: `url(${bg.url || bg.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    
    case 'gradient':
      return { background: bg.value || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    
    default:
      return { backgroundColor: '#1f2937' }
  }
})
</script>