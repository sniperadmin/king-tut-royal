<template>
  <section 
    :class="[
      'relative',
      section.styling?.padding || 'py-16',
      section.styling?.textColor || 'text-white'
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
          class="text-xl opacity-90"
          v-html="section.content.subtitle"
        ></p>
      </div>

      <!-- Video container -->
      <div class="relative max-w-4xl mx-auto">
        <div 
          v-if="section.content?.video_url"
          class="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
        >
          <!-- YouTube/Vimeo embed -->
          <iframe
            v-if="isEmbedVideo"
            :src="getEmbedUrl(section.content.video_url)"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <!-- Direct video file -->
          <video
            v-else
            :poster="section.content?.poster_image"
            controls
            class="w-full h-full object-cover"
          >
            <source :src="section.content.video_url" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>

        <!-- Empty state for preview mode -->
        <div 
          v-else-if="previewMode"
          class="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"
        >
          <div class="text-center">
            <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-300 mb-2">No video selected</h3>
            <p class="text-sm text-gray-400">Add a video URL to display content here.</p>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div 
        v-if="section.content?.cta"
        class="text-center mt-8"
      >
        <a
          :href="section.content.cta.link || '#'"
          :class="[
            'inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md transition-colors',
            section.content.cta.style === 'outline' 
              ? 'border-current text-current hover:bg-current hover:text-black' 
              : 'bg-neutral-900 text-white hover:bg-neutral-800'
          ]"
        >
          {{ section.content.cta.text || 'Watch More' }}
        </a>
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

// Check if video is an embed (YouTube, Vimeo, etc.)
const isEmbedVideo = computed(() => {
  const url = props.section.content?.video_url
  if (!url) return false
  
  return url.includes('youtube.com') || 
         url.includes('youtu.be') || 
         url.includes('vimeo.com') ||
         url.includes('embed')
})

// Convert video URL to embed format
const getEmbedUrl = (url: string) => {
  // YouTube
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${videoId}`
  }
  
  // Already an embed URL
  return url
}

// Generate background style
const backgroundStyle = computed(() => {
  const bg = props.section.layout?.background
  if (!bg) return { backgroundColor: '#000000' }

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
      return { background: bg.value || 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }
    
    default:
      return { backgroundColor: '#000000' }
  }
})
</script>