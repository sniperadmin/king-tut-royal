<script setup>
import { ref } from 'vue';

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
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  muted: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: false
  }
});

const currentVideoIndex = ref(props.initialVideoIndex);
const vidstackLoaded = ref(false);
const autoplayAttempted = ref(false);

// Handle autoplay failure
const handleAutoPlayFail = (event) => {
  console.warn('Autoplay failed:', event.detail);
  autoplayAttempted.value = true;
};

import('vidstack/bundle');
import('vidstack/icons');
// Dynamically import hls.js only if the video URL is an .m3u8 file
if (props.videos[currentVideoIndex.value].url.includes('.m3u8')) {
  import('hls.js');
}
vidstackLoaded.value = true;
</script>

<template>
  <div
    id="video-player-container"
    class="relative w-full mx-auto rounded-lg overflow-hidden object-cover"
  >
    <template v-if="vidstackLoaded">
      <!-- NOTE: Never delete aspect-video class from media-player -->
      <media-player
        ref="playerRef"
        class="aspect-video w-full h-full"
        :src="props.videos[currentVideoIndex].url"
        v-bind="props.autoplay ? { autoplay: true } : {}"
        :muted="props.muted"
        :loop="props.loop"
        playsinline
        view-type="video"
        stream-type="on-demand"
        fullscreen-orientation="portrait"
        @auto-play-fail="handleAutoPlayFail"
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
  /* Mobile: Full screen aspect ratio (9:16 portrait or dynamic based on viewport) */
  aspect-ratio: 9/16;
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for better mobile support */
}

/* Mobile landscape: Use full width */
@media (max-width: 767px) and (orientation: landscape) {
  .aspect-video {
    aspect-ratio: 16/9;
    min-height: 100vh;
    min-height: 100dvh;
  }
}

/* Tablet and up: 21:9 aspect ratio for wider screens */
@media (min-width: 768px) {
  .aspect-video {
    aspect-ratio: 21/9;
    min-height: auto; /* Reset min-height for larger screens */
  }
}

/* Large screens: 2.35:1 cinematic aspect ratio */
@media (min-width: 1024px) {
  .aspect-video {
    aspect-ratio: 2.35/1;
  }
}

/* Extra large screens: even wider aspect ratio */
@media (min-width: 1536px) {
  .aspect-video {
    aspect-ratio: 2.5/1;
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
