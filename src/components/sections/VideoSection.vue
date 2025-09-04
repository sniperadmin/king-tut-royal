<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import 'vidstack/bundle';
import 'vidstack/icons';

const videos = ref([
  // { id: 1, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-27%20at%2017.11.48.mp4', title: 'Grand Museum Tour', muted: true },
  // { id: 2, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-27%20at%2017.11.50%20(1).mp4', title: 'Nile Dinning', muted: true },
  // { id: 3, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-08-29%20at%2018.34.25.mp4', title: 'King Tut Package', muted: true },
  { id: 4, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/king.m3u8', title: 'King Tut Package', muted: true },
]);

const currentVideoIndex = ref(0);
const videoPlayer = ref(null);
const windowWidth = ref(window.innerWidth);

const handleReady = () => {
  if (videoPlayer.value && videoPlayer.value.player) {
    // Slight delay to ensure the player is fully initialized
    setTimeout(() => {
      videoPlayer.value.player.muted = true;
      videoPlayer.value.player.play().catch((error) => {
        console.error('Autoplay failed:', error);
      });
      console.log('Video player ready. Muted:', videoPlayer.value.player.muted);
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

onMounted(() => {
  if (videoPlayer.value && videoPlayer.value.player) {
    videoPlayer.value.player.play();
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section class="py-12 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <p class="text-xl text-center mb-8">Step into timeless elegance with King's Tut royal luxury experiences.</p>
      <div class="relative w-full mx-auto rounded-lg overflow-hidden object-cover">
        <media-player
          ref="videoPlayer"
          class="w-full"
          :src="videos[currentVideoIndex].url"
          :muted="true"
          :volume="0"
          :height="600"
          :width="300"
          fullscreenOrientation="portrait"
          @ready="handleReady"
          @ended="nextVideo"
        >
          <media-provider></media-provider>
          <media-controls
            class="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity data-[visible]:opacity-100"
          >
            <media-controls-group class="pointer-events-auto flex w-full h-full items-center justify-center">
              <div class="flex gap-2">
                <media-play-button
                  class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 hover:bg-white/20 data-[focus]:ring-4"
                >
                  <!-- See "Icons" component page for setup before using the following: -->
                  <media-icon type="play" class="hidden h-8 w-8 group-data-[paused]:block"></media-icon>
                  <media-icon type="pause" class="h-8 w-8 group-data-[paused]:hidden"></media-icon>
                </media-play-button>
                <media-mute-button
                  class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 hover:bg-white/20 data-[focus]:ring-4"
                >
                  <!-- See "Icons" component page for setup before using the following: -->
                  <media-icon type="mute" class="hidden h-8 w-8 group-data-[state='muted']:block"></media-icon>
                  <media-icon type="volume-low" class="hidden h-8 w-8 group-data-[state='low']:block"></media-icon>
                  <media-icon
                    type="volume-high"
                    class="hidden h-8 w-8 group-data-[state='high']:block"
                  ></media-icon>
                </media-mute-button>
                <media-fullscreen-button
                  class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4"
                >
                  <!-- See "Icons" component page for setup before using the following: -->
                  <media-icon type="fullscreen" class="h-8 w-8 group-data-[active]:hidden"></media-icon>
                  <media-icon type="fullscreen-exit" class="hidden h-8 w-8 group-data-[active]:block"></media-icon>
                </media-fullscreen-button>
              </div>
            </media-controls-group>
          </media-controls>
        </media-player>

        <!-- <div class="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button @click="prevVideo" class="bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
        </div>
        <div class="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button @click="nextVideo" class="bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div> -->

        <div class="flex justify-center mt-4 space-x-2">
          <button
            v-for="(video, index) in videos"
            :key="video.id"
            @click="goToVideo(index)"
            :class="['w-3 h-3 rounded-full', currentVideoIndex === index ? 'bg-gold-500' : 'bg-gray-600 hover:bg-gray-400']"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>