<template>
  <section class="relative w-full pt-16">
    <!-- Background Image - Full Width, Contained -->
    <div class="w-full">
      <img 
        src="https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg"
        alt="Egyptian Pharaoh"
        class="w-full h-auto object-contain"
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