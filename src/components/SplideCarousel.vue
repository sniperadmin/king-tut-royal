<template>
  <Splide v-bind="$attrs" ref="splideRef" :options="mergedOptions" :extensions="mergedExtensions" :aria-label="ariaLabel">
    <!-- Default slot for custom slides (like PartnersSection) -->
    <slot>
      <!-- Fallback to slides prop if no slot provided -->
      <SplideSlide v-for="(item, i) in slides" :key="item.id ?? i">
        <template v-if="item.type === 'image'">
          <img :src="item.src" :alt="item.alt ?? ''" class="w-full h-auto" />
        </template>

        <template v-else-if="item.type === 'component'">
          <component :is="item.component" v-bind="item.props ?? {}" />
        </template>

        <template v-else-if="item.type === 'video'">
          <!-- Prefer Splide video extension for YouTube/Vimeo when `youtube` or `vimeo` provided -->
          <div v-if="item.youtube" :data-splide-youtube="item.youtube"></div>
          <div v-else-if="item.vimeo" :data-splide-vimeo="item.vimeo"></div>
          <!-- Fallback to native video tag when direct src is provided -->
          <video v-else controls :src="item.src" class="w-full h-auto" />
        </template>

        <template v-else>
          <!-- allow raw html or any custom markup -->
          <div v-if="item.html" v-html="item.html"></div>
          <div v-else>{{ item }}</div>
        </template>
      </SplideSlide>
    </slot>

    <!-- optional named slot for external controls/overlays -->
    <slot name="controls" />
  </Splide>
</template>

<script setup lang="ts">
import { computed, ref, defineExpose } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/css'
import { Video } from '@splidejs/splide-extension-video'

type SlideItem = {
  id?: string | number
  type?: 'image' | 'component' | 'video' | 'html' | 'marquee'
  src?: string
  alt?: string
  component?: any
  props?: Record<string, any>
  youtube?: string
  vimeo?: string
  html?: string
}

const props = defineProps<{
  slides?: SlideItem[]
  options?: Record<string, any>
  extensions?: Record<string, any>
  ariaLabel?: string
}>()

const defaultOptions = {
  rewind: true,
  arrows: true,
  lazyLoad: 'nearby'
}

const mergedOptions = computed(() => ({ ...defaultOptions, ...(props.options || {}) }))
const mergedExtensions = computed(() => ({ Video, ...(props.extensions || {}) }))
const ariaLabel = props.ariaLabel ?? 'Carousel'
const splideRef = ref(null)
defineExpose({ splideRef })
</script>

<style scoped>
/* Minimal styling; rely on Splide's CSS in the app/global styles */
</style>