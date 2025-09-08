<template>
  <section class="relative w-full pt-16">
    <!-- Background Image - Full Width, Contained -->
    <div class="w-full">
      <img 
        src="/images/king-tut.webp"
        srcset="/images/king-tut.webp 853w, /images/king-tut.jpeg 412w, /images/king-tut.webp 618w"
        sizes="(max-width: 640px) 412px, (max-width: 1024px) 618px, 853px"
        alt="Egyptian Pharaoh"
        class="w-full h-auto object-cover sm:object-fill object-center"
        fetchpriority="high"
        width="853"
        height="1280"
        decoding="async"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'

const scrollToPackages = () => {
  smoothScroll('packages')
}
</script>
