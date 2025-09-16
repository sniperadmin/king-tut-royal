<template>
  <section class="relative w-full pt-16 bg-background text-foreground">
    <!-- Background Video - Full Width, Contained -->
    <div class="w-full">
      <VideoPlayer :videos="[{ url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/king-intro.m3u8' }]" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { smoothScroll } from '../utils/smoothScroll'
import VideoPlayer from './ui/VideoPlayer.vue'

const isLoaded = ref(false)
const heroImg = ref<HTMLImageElement | null>(null)

const mainSrc = "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-853x1280.webp"
const mainSrcset = "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-320x480.webp 320w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-480x720.webp 480w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-640x960.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-853x1280.webp 853w"
const placeholderSrc = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='853' height='1280' viewBox='0 0 853 1280'><rect width='100%25' height='100%25' fill='%23e5e7eb'/></svg>"

function loadRealImage(){
  const el = heroImg.value
  if(!el) return
  const temp = new Image()
  temp.crossOrigin = 'anonymous'
  if(mainSrcset) temp.srcset = mainSrcset
  temp.src = mainSrc
  temp.onload = () => {
    if(!el) return
    el.src = mainSrc
    if(mainSrcset) el.srcset = mainSrcset
    // Use rAF to ensure the browser has painted the swapped source before we remove blur
    requestAnimationFrame(() => { isLoaded.value = true })
  }
  temp.onerror = () => {
    if(!el) return
    // still swap to the main URL to avoid leaving the placeholder forever
    el.src = mainSrc
    isLoaded.value = true
  }
  // some browsers may mark cached images as complete immediately
  if(temp.complete){
    // trigger onload handler synchronously if image already loaded
    temp.onload && temp.onload(new Event('load'))
  }
}

onMounted(() => {
  const el = heroImg.value
  if(!el) return
  // reserve layout with placeholder immediately
  el.src = placeholderSrc

  // Use IntersectionObserver-only flow to avoid synchronous layout reads (getBoundingClientRect).
  if('IntersectionObserver' in window){
    let fallbackHandle: number | undefined = undefined
    const cancelFallback = () => {
      if(fallbackHandle !== undefined){
        if((window as any).cancelIdleCallback){ (window as any).cancelIdleCallback(fallbackHandle) } else { clearTimeout(fallbackHandle) }
        fallbackHandle = undefined
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          cancelFallback()
          loadRealImage()
          io.unobserve(entry.target)
        }
      })
    }, { rootMargin: '125% 0px' })
    io.observe(el)

    // Non-blocking fallback: schedule load when browser is idle (or after 500ms as a timeout)
    if((window as any).requestIdleCallback){
      // @ts-ignore
      fallbackHandle = (window as any).requestIdleCallback(() => { loadRealImage(); fallbackHandle = undefined }, { timeout: 500 })
    } else {
      fallbackHandle = window.setTimeout(() => { loadRealImage(); fallbackHandle = undefined }, 500)
    }
  } else {
    // very old browsers: load immediately
    loadRealImage()
  }
})

const scrollToPackages = () => {
  smoothScroll('packages')
}
</script>
