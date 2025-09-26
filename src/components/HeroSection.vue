<template>
  <section class="relative w-full pt-16 bg-black text-foreground">
    <!-- Background Video - Full Width, Contained -->
    <div class="w-full">
      <VideoPlayer
        :videos="[{ url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/king-hero.m3u8' }]"
        poster="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/hero/king-tut-853x1280.webp"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { smoothScroll } from '../utils/smoothScroll'
import VideoPlayer from './ui/VideoPlayer.vue'

const scrollToPackages = () => {
  smoothScroll('packages')
}
</script>
