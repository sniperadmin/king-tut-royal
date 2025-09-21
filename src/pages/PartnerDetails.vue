<template>
  <AppLayout>
    <div v-if="partner" class="container mx-auto px-4 py-12 mt-20">
      <div class="max-w-4xl mx-auto">
        <!-- Partner Header -->
        <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div class="w-full md:w-1/3">
            <img
              v-if="partnerInfo?.logo"
              :src="partnerInfo?.logo?.medium || ''"
              :srcset="[
                partnerInfo?.logo?.small ? `${partnerInfo.logo.small} 200w` : null,
                partnerInfo?.logo?.medium ? `${partnerInfo.logo.medium} 600w` : null,
                partnerInfo?.logo?.large ? `${partnerInfo.logo.large} 1200w` : null
              ].filter(Boolean).join(', ')"
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px"
              :alt="partnerInfo?.name + ' Logo'"
              class="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              v-else
              :src="'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22150%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23f3f4f6%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236b7280%22 font-family=%22Arial%22 font-size=%2224%22>No Logo</text></svg>'"
              alt="No Logo"
              class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div class="w-full md:w-2/3">
            <h1 class="text-4xl font-bold text-primary mb-4">{{ partnerInfo?.name }}</h1>
            <p class="text-lg text-muted-foreground mb-6">{{ partnerInfo?.description }}</p>
            <div class="flex flex-wrap gap-4">
              <button 
                @click="$router.push('/partners')"
                class="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Back to Partners
              </button>
            </div>
          </div>
        </div>

        <!-- Partner Content Sections -->
        <div class="space-y-12">
          <section v-if="partnerInfo?.about">
            <h2 class="text-2xl font-bold text-foreground mb-6">About {{ partnerInfo?.name }}</h2>
            <div class="prose max-w-none text-muted-foreground">
              <p v-for="(paragraph, index) in partnerInfo?.about.split('\n\n')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </section>

          <section v-if="partnerInfo?.media && partnerInfo.media.length > 0">
            <h2 class="text-2xl font-bold text-foreground mb-6">Gallery</h2>
            <div class="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg group">
              <!-- Main Media Display -->
              <div class="w-full h-full flex items-center justify-center bg-black">
                <img
                  v-if="currentMedia && currentMedia.type === 'image'"
                  :src="currentMedia.src"
                  :srcset="currentMedia.srcSet"
                  :sizes="currentMedia.sizes"
                  :alt="partnerInfo?.name + ' Logo'"
                  class="max-h-full max-w-full object-contain"
                />
                <iframe
                  v-else-if="currentMedia && currentMedia.type === 'video'"
                  :src="currentMedia.src"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full"
                ></iframe>
              </div>
  
              <!-- Navigation Buttons -->
              <button
                @click="prevSlide"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft class="w-6 h-6" />
              </button>
              <button
                @click="nextSlide"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight class="w-6 h-6" />
              </button>
  
              <!-- Maximize Button -->
              <button
                @click="openModal(currentSlide)"
                class="absolute bottom-4 right-4 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              >
                <Maximize2 class="w-6 h-6" />
              </button>
            </div>
  
            <!-- Thumbnail Navigation -->
            <div class="flex justify-center gap-2 mt-4 flex-wrap">
              <img
                v-for="(mediaItem, index) in partnerInfo?.media"
                :key="index"
                :src="mediaItem.thumbnail || mediaItem.src"
                :srcset="mediaItem.srcSet"
                :sizes="mediaItem.sizes"
                :alt="'Thumbnail ' + (index + 1)"
                @click="goToSlide(index)"
                :class="['w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-300', currentSlide === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100']"
              />
            </div>
          </section>
          <section v-if="partnerInfo?.services">
            <h2 class="text-2xl font-bold text-foreground mb-6">Services</h2>
            <ul class="space-y-4">
              <li
                v-for="(service, index) in partnerInfo?.services"
                :key="index"
                class="flex items-start gap-4"
              >
                <svg class="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-muted-foreground">{{ service }}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <!-- Image Modal -->
      <div
        v-if="isModalOpen"
        @click.self="closeModal"
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <div class="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
          <!-- Modal Media -->
          <img
            v-if="currentModalMedia && currentModalMedia.type === 'image'"
            :src="currentModalMedia.src"
            :srcset="currentModalMedia.srcSet"
            :sizes="currentModalMedia.sizes"
            :alt="partnerInfo?.name + ' Media ' + (modalImageIndex + 1)"
            class="max-h-full max-w-full object-contain"
          />
          <iframe
            v-else-if="currentModalMedia && currentModalMedia.type === 'video'"
            :src="currentModalMedia.src"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>

          <!-- Modal Navigation -->
          <button
            @click="prevModalImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors duration-300 z-10"
          >
            <ChevronLeft class="w-6 h-6" />
          </button>
          <button
            @click="nextModalImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors duration-300 z-10"
          >
            <ChevronRight class="w-6 h-6" />
          </button>

          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors duration-300 z-10"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    <div v-else class="container mx-auto px-4 py-12 text-center text-xl text-muted-foreground">
      Partner not found.
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue';
import { supabase } from '../lib/supabase';
import { Partner } from '../types';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-vue-next';

const route = useRoute()
const partner = ref<Partner | null>(null)

// Gallery state
const currentSlide = ref(0)
const isModalOpen = ref(false)
const modalImageIndex = ref(0)

const partnerInfo = computed(() => {
  return partner.value?.partner || {} as Partner['partner']
})

const currentMedia = computed(() => {
  const media = partnerInfo.value?.media || []
  const item = media[currentSlide.value]
  if (!item) return null
  return {
    ...item,
    src: item.src || item.url || '',
    srcSet: item.srcSet || item.srcset || null,
    sizes: item.sizes || null,
    type: item.type || (typeof item.src === 'string' && item.src.includes('youtube') ? 'video' : 'image')
  }
})

const currentModalMedia = computed(() => {
  const media = partnerInfo.value?.media || []
  const item = media[modalImageIndex.value]
  if (!item) return null
  return {
    ...item,
    src: item.src || item.url || '',
    srcSet: item.srcSet || item.srcset || null,
    sizes: item.sizes || null,
    type: item.type || (typeof item.src === 'string' && item.src.includes('youtube') ? 'video' : 'image')
  }
})

function prevSlide() {
  const len = partnerInfo.value?.media?.length || 0
  if (!len) return
  currentSlide.value = (currentSlide.value - 1 + len) % len
}

function nextSlide() {
  const len = partnerInfo.value?.media?.length || 0
  if (!len) return
  currentSlide.value = (currentSlide.value + 1) % len
}

function goToSlide(index: number) {
  const len = partnerInfo.value?.media?.length || 0
  if (!len) return
  currentSlide.value = Math.max(0, Math.min(index, len - 1))
}

function openModal(index: any) {
  const i = typeof index === 'number' ? index : (index && typeof index.value === 'number' ? index.value : currentSlide.value)
  modalImageIndex.value = i
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function prevModalImage() {
  const len = partnerInfo.value?.media?.length || 0
  if (!len) return
  modalImageIndex.value = (modalImageIndex.value - 1 + len) % len
}

function nextModalImage() {
  const len = partnerInfo.value?.media?.length || 0
  if (!len) return
  modalImageIndex.value = (modalImageIndex.value + 1) % len
}

// Keyboard navigation and body scroll lock for modal
function handleKeydown(e: KeyboardEvent) {
  if (!isModalOpen.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prevModalImage()
  if (e.key === 'ArrowRight') nextModalImage()
}

watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
onMounted(async () => {
  window.scrollTo(0, 0);
  const { data, error } = await supabase
    .from('partners_view')
    .select('*')
    .eq('id', route.params.id)
    .single();

  if (error) {
    console.error('Error fetching partner details:', error);
    return;
  }

  partner.value = data;
});
</script>

<style scoped>
.prose {
  line-height: 1.75;
}

/* Add styles for the media slider and modal to match MediaSliderSection.vue */
.media-slider-container {
  position: relative;
  width: 100%;
  max-width: 800px; /* Adjust as needed */
  margin: 0 auto;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.media-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}

.media-display img,
.media-display iframe {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.navigation-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.navigation-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.navigation-button.left {
  left: 10px;
}

.navigation-button.right {
  right: 10px;
}

.maximize-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.maximize-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.thumbnail-navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.thumbnail-item {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail-item:hover {
  opacity: 1;
}

.thumbnail-item.active {
  opacity: 1;
  border-color: #007bff; /* Primary color for active thumbnail */
  box-shadow: 0 0 0 2px #007bff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content img,
.modal-content iframe {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10000;
  transition: background-color 0.3s ease;
}

.modal-close-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10000;
  transition: background-color 0.3s ease;
}

.modal-nav-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-nav-button.left {
  left: 20px;
}

.modal-nav-button.right {
  right: 20px;
}
</style>