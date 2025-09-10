<template>
  <AppLayout>
    <div class="container mx-auto p-4 pt-20">
      <h1 class="text-3xl font-bold mb-2 text-center text-white">{{ packageDetails?.title }}</h1>
      <p v-if="packageDetails?.price" class="text-xl text-center text-yellow-400 mb-6">{{ packageDetails?.price }} per person</p>
      
      <div v-if="packageDetails" class="space-y-8">
        <div v-if="packageDetails.details.images && packageDetails.details.images.length > 0" class="mb-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-white mb-3">Gallery</h3>
          <div class="relative w-full h-80 overflow-hidden rounded-lg mb-4 bg-gray-600">
            <img :src="packageDetails.details.images[currentImageIndex]" alt="Package Image" class="w-full h-full object-contain transition-opacity duration-300" fetchpriority="high" loading="eager" decoding="async" width="800" height="600" />
            <button @click="prevImage" class="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full ml-2">&lt;</button>
            <button @click="nextImage" class="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full mr-2">&gt;</button>
          </div>
          <div class="flex justify-center space-x-2">
            <img v-for="(img, idx) in packageDetails.details.images" :key="idx" :src="img" @click="setCurrentImage(idx)" :class="{'border-2 border-yellow-400': idx === currentImageIndex}" class="w-20 h-16 object-cover rounded-lg cursor-pointer" width="80" height="64" />
          </div>
        </div>

        <div class="mb-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-white mb-3">Overview</h3>
          <p class="text-gray-300 text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.overview }}</p>
        </div>

        <div class="mb-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-white mb-3">Accommodation</h3>
          <p class="text-gray-300 text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.accommodation }}</p>
        </div>

        <div class="mb-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-white mb-4">Itinerary Highlights</h3>
          <div class="stepper">
            <div v-for="(day, index) in packageDetails.details.itinerary" :key="index" class="stepper-item">
              <div class="stepper-item-content">
                <div class="stepper-item-circle">{{ index + 1 }}</div>
                <div class="stepper-item-line"></div>
              </div>
              <div class="stepper-item-details">
                <h3 class="text-xl font-medium text-white">{{ day.day }}</h3>
                <p class="text-gray-300">{{ day.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-white mb-3">Exclusive Benefits</h3>
          <p class="text-gray-300 text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.benefits }}</p>
        </div>

        <div class="mb-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-white mb-3">Booking Information</h3>
          <p class="text-gray-300 text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.booking }}</p>
        </div>

        <div class="text-center mt-8 space-y-4">
          <button @click="bookNow" class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300">
            Inquiry
          </button>
        </div>
      </div>
      <div v-else class="text-white text-center">
        <p>Package not found.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { PACKAGES } from '../composables/packagesData'
import { smoothScroll } from '../utils/smoothScroll'

const route = useRoute()
const router = useRouter()
const packageDetails = ref(null)
const currentImageIndex = ref(0)

onMounted(() => {
  window.scrollTo(0, 0);
  const packageName = route.params.packageName;
  packageDetails.value = PACKAGES.find(pkg => pkg.title.toLowerCase().replace(/ /g, '-') === packageName);
});

const prevImage = () => {
  if (packageDetails.value && packageDetails.value.details.images) {
    currentImageIndex.value = (currentImageIndex.value - 1 + packageDetails.value.details.images.length) % packageDetails.value.details.images.length;
  }
};

const nextImage = () => {
  if (packageDetails.value && packageDetails.value.details.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % packageDetails.value.details.images.length;
  }
};

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index;
};

const bookNow = () => {
  console.log('packageDetails.value?.title:', packageDetails.value?.title);
  const packageKey = packageDetails.value?.title === 'King Tut Royal VIP' ? 'vip' : 'oneday';
  console.log('packageKey:', packageKey);
  router.push({ path: '/', query: { scroll: 'booking', packageId: packageKey } });
};
</script>

<style scoped>
.stepper {
  @apply relative;
}

.stepper-item {
  @apply flex items-start pb-6 last:pb-0;
}

.stepper-item-content {
  @apply flex flex-col items-center mr-4;
}

.stepper-item-circle {
  @apply w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold;
}

.stepper-item-line {
  @apply w-0.5 h-full bg-gray-700 mt-2;
}

.stepper-item-details {
  @apply flex-1;
}
</style>