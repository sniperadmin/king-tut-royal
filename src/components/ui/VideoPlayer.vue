<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  videos: {
    type: Array,
    required: true
  },
  initialVideoIndex: {
    type: Number,
    default: 0
  },
  aspectRatio: {
    type: String,
    default: '16/9' // Default to 16:9 if not provided
  }
});

const currentVideoIndex = ref(props.initialVideoIndex);
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

let __videoObserver = null;
onMounted(() => {
  const rootEl = (rootElRef && rootElRef.value) ? rootElRef.value : document.querySelector('#video-player-container');
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
  <div
    id="video-player-container"
    ref="rootElRef"
    class="relative w-full mx-auto rounded-lg overflow-hidden object-cover"
    :style="{ '--aspect-ratio': props.aspectRatio }"
  >
    <template v-if="vidstackLoaded">
      <!-- NOTE: Never delete aspect-video class from media-player -->
      <media-player
        ref="videoPlayer"
        class="aspect-video w-full h-full"
        :src="props.videos[currentVideoIndex].url"
        :muted="true"
        :volume="0"
        playsinline
        fullscreenOrientation="portrait"
        @ready="handleReady"
      >
        <media-provider></media-provider>
        <media-controls
          class="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-brownish/10 to-transparent opacity-0 transition-opacity data-[visible]:opacity-100"
        >
          <media-controls-group class="pointer-events-auto flex w-full h-full items-center justify-center">
            <div class="flex gap-2">
              <media-play-button
                class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-brownish/70 hover:bg-brownish data-[focus]:ring-4 text-white"
              >
                <!-- See "Icons" component page for setup before using the following: -->
                <media-icon type="play" class="hidden h-8 w-8 group-data-[paused]:block"></media-icon>
                <media-icon type="pause" class="h-8 w-8 group-data-[paused]:hidden"></media-icon>
              </media-play-button>
              <media-mute-button
                class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-brownish/70 hover:bg-brownish data-[focus]:ring-4 text-white"
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
                class="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 bg-brownish/70 hover:bg-brownish aria-hidden:hidden data-[focus]:ring-4 text-white"
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
    <div v-else class="w-full bg-card">
      <div class="flex items-center justify-center h-screen">
        <div class="flex flex-col items-center gap-4">
          <div class="relative flex items-center justify-center">
            <div class="h-16 w-16 rounded-full bg-gradient-to-r from-brownish to-primary animate-pulse" aria-hidden="true"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div class="text-foreground text-sm">Loading video...</div>
          <div class="mt-2 w-40 h-2 rounded-full bg-foreground/10 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-foreground/30 via-foreground/60 to-foreground/30 animate-loading-bar" style="width:60%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
/* NOTE: Don't delete aspect ratio */
.aspect-video {
  aspect-ratio: v-bind(--aspect-ratio);
  /* Reserve layout space matching the player to prevent layout shifts while JS loads */
  /* display: block;
  width: 100%; */
}

@media (min-width: 1024px) {
  .aspect-video {
    aspect-ratio: 16/9 !important;
  }
}

.aspect-video video {
  object-fit: cover;
}

/* Loading animation for VideoPlayer */
@keyframes loading-bar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loading-bar {
  animation: loading-bar 1.2s linear infinite;
}
</style>
