<script setup>
import VideoPlayer from '../ui/VideoPlayer.vue';

const videos = [
  { id: 4, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/mid-page/hotel.m3u8', title: 'King Tut Package', muted: true },
];
</script>

<template>
  <section id="video-section" class="pt-5 pb-0 bg-background text-foreground">
    <div class="mx-auto">
      <p class="text-2xl font-semibold text-center mb-8 leading-relaxed">Step into timeless elegance with King's Tut Royal Luxury Experiences.</p>
      <VideoPlayer :videos="videos" poster="https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/mid-page/vip.jpg" />
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
