<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';

const videos = ref([
  { id: 4, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/king/king.m3u8', title: 'King Tut Package', muted: true },
]);

const currentVideoIndex = ref(0);
const videoPlayer = ref(null);
const windowWidth = ref(window.innerWidth);
const isPlayerLoaded = ref(false);

const loadVideoPlayer = async () => {
  if (!isPlayerLoaded.value) {
    await import('vidstack/bundle');
    await import('vidstack/icons');
    isPlayerLoaded.value = true;
  }
};

const handleReady = () => {
  if (videoPlayer.value && videoPlayer.value.player) {
    setTimeout(() => {
      videoPlayer.value.player.muted = true;
      videoPlayer.value.player.play().catch((error) => {
        console.error('Autoplay failed:', error);
      });
    }, 100);
  }
};

const nextVideo = async () => {
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.pause();
  }
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length;
  await nextTick();
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.play();
  }
};

const prevVideo = async () => {
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.pause();
  }
  currentVideoIndex.value = (currentVideoIndex.value - 1 + videos.value.length) % videos.value.length;
  await nextTick();
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.play();
  }
};

const goToVideo = async (index) => {
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.pause();
  }
  currentVideoIndex.value = index;
  await nextTick();
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.play();
  }
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  
  // Load video player when component mounts (lazy)
  await loadVideoPlayer();
  
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.play();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section class="pt-10 pb-0 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <p class="text-lg text-center mb-8 font-light leading-relaxed">Step into timeless elegance with King's Tut Royal Luxury Experiences.</p>
      <h3 class="text-2xl font-semibold text-white mb-3">Video</h3>
      <div class="relative w-full mx-auto rounded-lg overflow-hidden object-cover">
        <media-player
          v-if="isPlayerLoaded"
          ref="videoPlayer"
          class="aspect-video w-full h-full"
          :src="videos[currentVideoIndex].url"
          :muted="true"
          :volume="0"
          playsinline
          fullscreenOrientation="portrait"
          preload="metadata"
          @ready="handleReady"
          @ended="nextVideo"
        >
          <media-provider></media-provider>
          <media-controls
            class="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity data-[visible]:opacity-100"
          >
            <media-controls-group class="pointer-events-auto flex w-full h-full items-center justify-center">
              <div class="flex gap-2">
                <media-play-button
                  class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-white/10 hover:bg-white/20 data-[focus]:ring-4"
                >
                  <media-icon type="play" class="hidden h-8 w-8 group-data-[paused]:block"></media-icon>
                  <media-icon type="pause" class="h-8 w-8 group-data-[paused]:hidden"></media-icon>
                </media-play-button>
                <media-mute-button
                  class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-white/10 hover:bg-white/20 data-[focus]:ring-4"
                >
                  <media-icon type="mute" class="hidden h-8 w-8 group-data-[state='muted']:block"></media-icon>
                  <media-icon type="volume-low" class="hidden h-8 w-8 group-data-[state='low']:block"></media-icon>
                  <media-icon
                    type="volume-high"
                    class="hidden h-8 w-8 group-data-[state='high']:block"
                  ></media-icon>
                </media-mute-button>
                <media-fullscreen-button
                  class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-white/10 hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4"
                >
                  <media-icon type="fullscreen" class="h-8 w-8 group-data-[active]:hidden"></media-icon>
                  <media-icon type="fullscreen-exit" class="hidden h-8 w-8 group-data-[active]:block"></media-icon>
                </media-fullscreen-button>
              </div>
            </media-controls-group>
          </media-controls>
        </media-player>
        
        <div v-else class="aspect-video w-full h-full bg-gray-800 flex items-center justify-center">
          <div class="text-white">Loading video player...</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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