<template>
  <section class="relative w-full pt-16 bg-background text-foreground">
    <!-- Background Image - Full Width, Contained -->
    <div class="w-full">
      <picture>
        <source srcset="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-320x480.webp 320w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-480x720.webp 480w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-640x960.webp 640w, https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-853x1280.webp 853w" type="image/webp" sizes="100vw">
        <img
          ref="heroImg"
          :class="['w-full h-auto object-cover object-center bg-gray-200 transition-filter duration-700 ease-out', isLoaded ? 'blur-0 scale-100' : 'blur-lg scale-105']"
          :src="mainSrc"
          :srcset="mainSrcset"
          sizes="100vw"
          alt="Golden funerary mask of Pharaoh Tutankhamun, ancient Egypt, showcased with dramatic lighting."
          decoding="async"
          loading="eager"
          fetchpriority="high"
          width="853"
          height="1280"
          crossorigin="anonymous"
          @load="onImgLoad"
        />
      </picture>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { smoothScroll } from '../utils/smoothScroll'

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
