<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const videos = ref([
  { id: 4, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/king/king.m3u8', title: 'King Tut Package', muted: true },
]);

const currentVideoIndex = ref(0);
const videoPlayer = ref(null);
const pendingPlay = ref(false);
const vidstackLoaded = ref(false);
const rootElRef = ref(null);

const handleReady = () => {
  if (videoPlayer.value && videoPlayer.value.player) {
    // Slight delay to ensure the player is fully initialized
    setTimeout(() => {
      videoPlayer.value.player.muted = true;
      videoPlayer.value.player.play().catch((error) => {
        console.error('Autoplay failed:', error);
      });
      console.log('Video player ready. Muted:', videoPlayer.value.player.muted);
      if (pendingPlay.value) {
        videoPlayer.value.player.play().catch(() => {});
        pendingPlay.value = false;
      }
    }, 100);
  }
};

// NOTE: Never uncomment the following until we verify the business need
// const nextVideo = () => {
//   if (videoPlayer.value && videoPlayer.value.player) {
//     videoPlayer.value.player.pause();
//   }
//   currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length;
//   // No need to await nextTick; allow browser to schedule play
//   setTimeout(() => {
//     if (videoPlayer.value && videoPlayer.value.player) {
//       videoPlayer.value.player.play();
//     }
//   }, 0);
// };

// const prevVideo = () => {
//   if (videoPlayer.value && videoPlayer.value.player) {
//     videoPlayer.value.player.pause();
//   }
//   currentVideoIndex.value = (currentVideoIndex.value - 1 + videos.value.length) % videos.value.length;
//   setTimeout(() => {
//     if (videoPlayer.value && videoPlayer.value.player) {
//       videoPlayer.value.player.play();
//     }
//   }, 0);
// };

// const goToVideo = (index) => {
//   if (videoPlayer.value && videoPlayer.value.player) {
//     videoPlayer.value.player.pause();
//   }
//   currentVideoIndex.value = index;
//   setTimeout(() => {
//     if (videoPlayer.value && videoPlayer.value.player) {
//       videoPlayer.value.player.play();
//     }
//   }, 0);
// };

let __videoObserver = null;
onMounted(() => {
  const rootEl = (rootElRef && rootElRef.value) ? rootElRef.value : document.querySelector('#video-section');
  if (!rootEl) return;
  __videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (async () => {
          try {
            await import('vidstack/bundle');
            await import('vidstack/icons');
            vidstackLoaded.value = true;
            await nextTick();
            // Give the template a short moment to render the media-player before attempting play
            setTimeout(() => {
              if (videoPlayer.value && videoPlayer.value.player) {
                videoPlayer.value.player.play().catch(() => {});
                pendingPlay.value = false;
              } else {
                pendingPlay.value = true;
              }
            }, 50);
          } catch (err) {
            console.error('Failed to load vidstack:', err);
          }
        })();
      }
    });
  }, { threshold: 0.5 });
  __videoObserver.observe(rootEl);
});
onUnmounted(() => {
  if (__videoObserver) {
    __videoObserver.disconnect();
    __videoObserver = null;
  }
});
</script>

<template>
  <section id="video-section" ref="rootElRef" class="pt-10 pb-0 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <p class="text-lg text-center mb-8 font-light leading-relaxed">Step into timeless elegance with King's Tut Royal Luxury Experiences.</p>
      <h3 class="text-2xl font-semibold text-white mb-3">Video</h3>
      <div class="relative w-full mx-auto rounded-lg overflow-hidden object-cover">
        <template v-if="vidstackLoaded">
          <media-player
            ref="videoPlayer"
            class="aspect-video w-full h-full"
            :src="videos[currentVideoIndex].url"
            :muted="true"
            :volume="0"
            playsinline
            fullscreenOrientation="portrait"
            @ready="handleReady"
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
                    <!-- See "Icons" component page for setup before using the following: -->
                    <media-icon type="play" class="hidden h-8 w-8 group-data-[paused]:block"></media-icon>
                    <media-icon type="pause" class="h-8 w-8 group-data-[paused]:hidden"></media-icon>
                  </media-play-button>
                  <media-mute-button
                    class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-white/10 hover:bg-white/20 data-[focus]:ring-4"
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
                    class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-white/10 hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4"
                  >
                    <!-- See "Icons" component page for setup before using the following: -->
                    <media-icon type="fullscreen" class="h-8 w-8 group-data-[active]:hidden"></media-icon>
                    <media-icon type="fullscreen-exit" class="hidden h-8 w-8 group-data-[active]:block"></media-icon>
                  </media-fullscreen-button>
                </div>
              </media-controls-group>
            </media-controls>
          </media-player>
        </template>
        <div v-else class="aspect-video w-full h-full bg-black flex items-center justify-center">
          <div class="text-white">Loading video...</div>
        </div>
      </div>
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
