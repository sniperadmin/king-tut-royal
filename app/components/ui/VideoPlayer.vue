<template>
  <div
      id="video-player-container"
      ref="rootElRef"
      class="relative mx-auto overflow-hidden"
      :style="{ '--aspect-ratio': props.aspectRatio }"
    >
    <template v-if="vidstackLoaded">
      <media-player
        ref="VideoPlayer"
        plays-inline
        muted
        :volume="0"
        :title="title"
        :src="props.videos[currentVideoIndex].url"
        class="aspect-video"
        fullscreen-orientation="portrait"
        @ready="handleReady"
      >
        <ClientOnly>
          <media-provider />
            <media-controls class="vds-controls">
                <media-controls-group class="vds-controls-group">
                    <div class="vds-button-group">
                      <media-play-button class="vds-button">
                          <media-icon type="play" class="vds-icon-play"></media-icon>
                          <media-icon type="pause" class="vds-icon-pause"></media-icon>
                      </media-play-button>
                      <media-mute-button class="vds-button">
                          <media-icon type="mute" class="vds-icon-mute"></media-icon>
                          <media-icon type="volume-low" class="vds-icon-volume-low"></media-icon>
                          <media-icon type="volume-high" class="vds-icon-volume-high"></media-icon>
                      </media-mute-button>
                      <media-fullscreen-button class="vds-button">
                          <media-icon type="fullscreen" class="vds-icon-fullscreen"></media-icon>
                          <media-icon type="fullscreen-exit" class="vds-icon-fullscreen-exit"></media-icon>
                      </media-fullscreen-button>
                    </div>
                </media-controls-group>
            </media-controls>
        </ClientOnly>
      </media-player>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
// import 'vidstack/bundle';
// import 'vidstack/icons';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  videos: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  thumbnails: {
    type: String,
    default: ''
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
        videoPlayer.value.player.muted = true;
        pendingPlay.value = false;
      }
    }, 100);
  }
};

let __videoObserver = null;
onMounted(() => {
  const rootEl = (rootElRef?.value) ? rootElRef.value : document.querySelector('#video-player-container');
  if (!rootEl) return;
  __videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (async () => {
          try {
            await import('vidstack/bundle');
            await import('vidstack/icons');
            // Dynamically import hls.js only if the video URL is an .m3u8 file
            if (props.videos[currentVideoIndex.value].url.includes('.m3u8')) {
              await import('hls.js');
            }
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

<style scoped>
.aspect-video {
  aspect-ratio: v-bind(--aspect-ratio);
  /* Reserve layout space matching the player to prevent layout shifts while JS loads */
  display: block;
  width: 100%;
}

/* @media (min-width: 1024px) {
  .aspect-video {
    aspect-ratio: 16/9 !important;
  }
} */

.aspect-video video {
  object-fit: contain;
}

.vds-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1; /* Make controls always visible */
}

.vds-controls-group {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.vds-button-group {
  display: flex;
  gap: 10px; /* Add some spacing between buttons */
}

.vds-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  background-color: rgba(101, 67, 33, 0.7); /* brownish/70 */
}

.vds-button:hover {
  background-color: rgba(101, 67, 33, 1); /* brownish */
}

.mute-icon {
  width: 24px;
  height: 24px;
}

.vds-button media-icon {
  width: 24px;
  height: 24px;
}

.vds-icon-play,
.vds-icon-pause,
.vds-icon-mute,
.vds-icon-volume-low,
.vds-icon-volume-high,
.vds-icon-fullscreen,
.vds-icon-fullscreen-exit {
  display: none;
}

.vds-button[data-paused] .vds-icon-play {
  display: block;
}

.vds-button:not([data-paused]) .vds-icon-pause {
  display: block;
}

.vds-button[data-state='muted'] .vds-icon-mute {
  display: block;
}

.vds-button[data-state='low'] .vds-icon-volume-low {
  display: block;
}

.vds-button[data-state='high'] .vds-icon-volume-high {
  display: block;
}

.vds-button[data-active] .vds-icon-fullscreen-exit {
  display: block;
}

.vds-button:not([data-active]) .vds-icon-fullscreen {
  display: block;
}
</style>