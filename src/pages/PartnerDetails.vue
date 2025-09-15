<template>
  <AppLayout>
    <div v-if="partner" class="container mx-auto px-4 py-12 mt-20">
      <div class="max-w-4xl mx-auto">
        <!-- Partner Header -->
        <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div class="w-full md:w-1/3">
            <img 
              :src="partner.logo" 
              :alt="partner.name + ' Logo'" 
              class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div class="w-full md:w-2/3">
            <h1 class="text-4xl font-bold text-primary mb-4">{{ partner.name }}</h1>
            <p class="text-lg text-muted-foreground mb-6">{{ partner.description }}</p>
            <div class="flex flex-wrap gap-4">
              <a 
                v-if="partner.website" 
                :href="partner.website" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Visit Website
              </a>
              <button 
                @click="$router.go(-1)"
                class="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Back to Partners
              </button>
            </div>
          </div>
        </div>

        <!-- Partner Content Sections -->
        <div class="space-y-12">
          <section v-if="partner.about">
            <h2 class="text-2xl font-bold text-foreground mb-6">About {{ partner.name }}</h2>
            <div class="prose max-w-none text-muted-foreground">
              <p v-for="(paragraph, index) in partner.about.split('\n\n')" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </section>

          <section v-if="partner.media && partner.media.length > 0">
            <h2 class="text-2xl font-bold text-foreground mb-6">Gallery</h2>
            <div class="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg group">
              <!-- Main Media Display -->
              <div class="w-full h-full flex items-center justify-center bg-black">
                <img
                  v-if="currentMedia.type === 'image'"
                  :src="currentMedia.src"
                  :alt="partner.name + ' Media ' + (currentSlide + 1)"
                  class="max-h-full max-w-full object-contain"
                />
                <iframe
                  v-else-if="currentMedia.type === 'video'"
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
                v-for="(mediaItem, index) in partner.media"
                :key="index"
                :src="mediaItem.thumbnail || mediaItem.src"
                :alt="'Thumbnail ' + (index + 1)"
                @click="goToSlide(index)"
                :class="['w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-300', currentSlide === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100']"
              />
            </div>
          </section>
          <section v-if="partner.services">
            <h2 class="text-2xl font-bold text-foreground mb-6">Services</h2>
            <ul class="space-y-4">
              <li 
                v-for="(service, index) in partner.services" 
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
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <div class="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
          <!-- Modal Media -->
          <img
            v-if="currentModalMedia.type === 'image'"
            :src="currentModalMedia.src"
            :alt="partner.name + ' Media ' + (modalImageIndex + 1)"
            class="max-h-full max-w-full object-contain"
          />
          <iframe
            v-else-if="currentModalMedia.type === 'video'"
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
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-vue-next'

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string; // Optional thumbnail for videos
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  about?: string;
  services?: string[];
  media?: MediaItem[]; // Changed from images to media
}

const route = useRoute()
const partner = ref<Partner | null>(null)

const currentSlide = ref(0)
const isModalOpen = ref(false)
const modalImageIndex = ref(0)
let autoSlideInterval: number | undefined = undefined

const allPartners: Partner[] = [
  {
    id: 'semiramis-intercontinental',
    name: 'Semiramis Intercontinental Hotels & Resorts',
    logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC.png',
    description: 'Luxury 5-star hotel located in the heart of Cairo with breathtaking views of the Nile River.',
    website: 'https://www.ihg.com/intercontinental/hotels/us/en/cairo/caica/hoteldetail',
    about: 'The InterContinental Cairo Semiramis is a landmark hotel in Egypt\'s capital, offering unparalleled luxury and service.\n\nWith its prime location on the Nile Corniche, the hotel provides easy access to Cairo\'s most famous attractions including the Egyptian Museum, Khan el-Khalili bazaar, and the Giza Pyramids.\n\nThe hotel features 432 elegantly appointed rooms and suites, multiple dining options, a spa, and extensive meeting facilities.',
    services: [
      'Luxury accommodations',
      'Fine dining restaurants',
      'Spa and wellness center',
      'Business facilities',
      'Concierge services'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC.png' },
      { type: 'video', src: 'https://www.youtube.com/embed/your-video-id', thumbnail: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC.png' }
    ]
  },
  {
    id: 'four-seasons',
    name: 'Four Seasons Hotels & Resorts',
    logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Four_Seasons_Hotels_and_Resorts_logo.png',
    description: 'Experience luxury and personalized service at Four Seasons Hotels and Resorts worldwide.',
    website: 'https://www.fourseasons.com/',
    about: 'Four Seasons Hotels and Resorts is a Canadian international luxury hospitality company. It operates more than 100 hotels and resorts worldwide. The company was established in 1960 by Isadore Sharp.',
    services: [
      'World-class dining',
      'Exclusive spa treatments',
      'Concierge services',
      'Private residences'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Four_Seasons_Hotels_and_Resorts_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Four_Seasons_Hotels_and_Resorts_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Four_Seasons_Hotels_and_Resorts_logo.png' }
    ]
  },
  {
    id: 'hilton',
    name: 'Hilton Hotels & Resorts',
    logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Hilton_Hotels_and_Resorts_logo.png',
    description: 'A global brand of full-service hotels and resorts and the flagship brand of Hilton Worldwide.',
    website: 'https://www.hilton.com/en/',
    about: 'Hilton Hotels & Resorts is a global brand of full-service hotels and resorts and the flagship brand of American multinational hospitality company Hilton Worldwide. The original company was founded by Conrad Hilton.',
    services: [
      'Comfortable accommodations',
      'Dining options',
      'Fitness centers',
      'Meeting spaces'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Hilton_Hotels_and_Resorts_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Hilton_Hotels_and_Resorts_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Hilton_Hotels_and_Resorts_logo.png' }
    ]
  },
  {
    id: 'marriott',
    name: 'Marriott International',
    logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Marriott_International_logo.png',
    description: 'Leading global lodging company with more than 7,000 properties across 131 countries and territories.',
    website: 'https://www.marriott.com/',
    about: 'Marriott International, Inc. is an American multinational diversified hospitality company that manages and franchises a broad portfolio of hotels and related lodging facilities. Founded by J. Willard Marriott and Alice Marriott.',
    services: [
      'Diverse hotel brands',
      'Loyalty program',
      'Event planning',
      'Vacation rentals'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Marriott_International_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Marriott_International_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Marriott_International_logo.png' }
    ]
  },
  {
    id: 'ritz-carlton',
    name: 'The Ritz-Carlton',
    logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Ritz-Carlton_logo.png',
    description: 'Luxury hotel company with a tradition of excellence and personalized service.',
    website: 'https://www.ritzcarlton.com/',
    about: 'The Ritz-Carlton Hotel Company, LLC is an American multinational company that operates the luxury hotel chain known as The Ritz-Carlton. The company has 108 hotels and resorts in 30 countries and territories worldwide.',
    services: [
      'Exceptional service',
      'Gourmet dining',
      'Spa and wellness',
      'Unique experiences'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Ritz-Carlton_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Ritz-Carlton_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Ritz-Carlton_logo.png' }
    ]
  },
  {
    id: 'st-regis',
    name: 'St. Regis Hotels & Resorts',
    logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/St._Regis_Hotels_26_Resorts_logo.png',
    description: 'A luxury hotel brand that is part of Marriott International.',
    website: 'https://www.marriott.com/marriott-brands/st-regis.mi',
    about: 'St. Regis Hotels & Resorts is a luxury hotel brand that is part of Marriott International. Founded by John Jacob Astor IV, with the opening of the St. Regis New York in 1904.',
    services: [
      'Bespoke service',
      'Exquisite dining',
      'Signature rituals',
      'Elegant accommodations'
    ],
    media: [
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/St._Regis_Hotels_26_Resorts_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/St._Regis_Hotels_26_Resorts_logo.png' },
      { type: 'image', src: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/St._Regis_Hotels_26_Resorts_logo.png' }
    ]
  }
]

const totalSlides = computed(() => partner.value?.media?.length || 0)

const currentMedia = computed<MediaItem>(() => {
  const media = partner.value?.media || []
  return media[currentSlide.value] || { type: 'image', src: '' }
})

const currentModalMedia = computed<MediaItem>(() => {
  const media = partner.value?.media || []
  return media[modalImageIndex.value] || { type: 'image', src: '' }
})

const goToSlide = (index: number) => {
  currentSlide.value = index
  stopAutoSlide()
  startAutoSlide()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value
  stopAutoSlide()
  startAutoSlide()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value
  stopAutoSlide()
  startAutoSlide()
}

const openModal = (index: number) => {
  modalImageIndex.value = index
  isModalOpen.value = true
  stopAutoSlide()
}

const closeModal = () => {
  isModalOpen.value = false
  startAutoSlide()
}

const nextModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value + 1) % totalSlides.value
}

const prevModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value - 1 + totalSlides.value) % totalSlides.value
}

const startAutoSlide = () => {
  stopAutoSlide()
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000) as unknown as number // 5 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = undefined
  }
}

watch(isModalOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.scrollTo(0, 0);
  const partnerId = route.params.id as string
  partner.value = allPartners.find(p => p.id === partnerId) || null
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
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