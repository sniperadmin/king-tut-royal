<template>
  <section 
    :class="[
      'relative overflow-hidden',
      section.styling?.padding || 'py-20',
      section.styling?.textColor || 'text-white'
    ]"
    :style="backgroundStyle"
  >
    <!-- Background overlay if needed -->
    <div 
      v-if="section.layout?.background?.overlay" 
      class="absolute inset-0 bg-black"
      :style="{ opacity: section.layout.background.overlay / 100 }"
    ></div>

    <!-- Content container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        :class="[
          'text-center',
          section.styling?.textAlign === 'left' ? 'text-left' : '',
          section.styling?.textAlign === 'right' ? 'text-right' : 'text-center'
        ]"
      >
        <!-- Headline -->
        <h1 
          v-if="section.content?.headline"
          :class="[
            'text-4xl md:text-6xl font-bold mb-6',
            section.styling?.headlineColor || ''
          ]"
          v-html="section.content.headline"
        ></h1>

        <!-- Subtitle -->
        <p 
          v-if="section.content?.subtitle"
          :class="[
            'text-xl md:text-2xl mb-8 max-w-3xl',
            section.styling?.textAlign === 'center' ? 'mx-auto' : '',
            section.styling?.subtitleColor || ''
          ]"
          v-html="section.content.subtitle"
        ></p>

        <!-- CTA Buttons -->
        <div 
          v-if="section.content?.cta || section.content?.secondaryCta"
          class="flex flex-col sm:flex-row gap-4 justify-center"
          :class="section.styling?.textAlign === 'left' ? 'sm:justify-start' : section.styling?.textAlign === 'right' ? 'sm:justify-end' : 'sm:justify-center'"
        >
          <!-- Primary CTA -->
          <a
            v-if="section.content?.cta"
            :href="section.content.cta.link || '#'"
            :class="[
              'inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md transition-colors',
              section.content.cta.style === 'outline' 
                ? 'border-current text-current hover:bg-current hover:text-black' 
                : 'bg-white text-black hover:bg-gray-100'
            ]"
          >
            {{ section.content.cta.text || 'Get Started' }}
          </a>

          <!-- Secondary CTA -->
          <a
            v-if="section.content?.secondaryCta"
            :href="section.content.secondaryCta.link || '#'"
            class="inline-flex items-center px-8 py-3 border border-current text-current font-medium rounded-md hover:bg-current hover:text-black transition-colors"
          >
            {{ section.content.secondaryCta.text || 'Learn More' }}
          </a>
        </div>
      </div>
    </div>

    <!-- Background video if specified -->
    <video
      v-if="section.layout?.background?.type === 'video' && section.layout.background.url"
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source :src="section.layout.background.url" type="video/mp4">
    </video>
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

// Generate background style based on section configuration
const backgroundStyle = computed(() => {
  const bg = props.section.layout?.background
  if (!bg) return {}

  switch (bg.type) {
    case 'color':
      return { backgroundColor: bg.value || '#000000' }
    
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
      return { backgroundColor: '#000000' }
  }
})
</script>