<script setup>
import VideoPlayer from '../ui/VideoPlayer.vue';

const videos = [
  { id: 4, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/king/king.m3u8', title: 'King Tut Package', muted: true },
];
</script>

<template>
  <section id="video-section" class="pt-10 pb-0 bg-background text-foreground">
    <div class="container mx-auto px-4">
      <p class="text-xl font-semibold text-center mb-8 leading-relaxed">Step into timeless elegance with King's Tut Royal Luxury Experiences.</p>
      <h3 class="text-2xl font-semibold text-foreground mb-3">Video</h3>
      <VideoPlayer :videos="videos" />
    </div>
  </section>
</template>

<style scoped>
/* Add any custom styles here if needed */
.aspect-video {
  aspect-ratio: 9/16 !important;
}

@media (min-width: 1024px) {
  .aspect-video {
    aspect-ratio: 16/9 !important;
  }
}

.aspect-video video {
  object-fit: cover;
}
</style>
