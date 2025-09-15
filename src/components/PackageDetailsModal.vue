<template>
  <div v-if="isOpen" class="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
    <div class="bg-card text-foreground p-8 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
      <button @click="closeModal" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl">&times;</button>
      <h2 class="text-4xl font-bold text-primary mb-6 text-center">{{ package.title }}</h2>

      <div v-if="package.details.images && package.details.images.length > 0" class="mb-8">
        <h3 class="text-2xl font-semibold text-foreground mb-3">Gallery</h3>
        <div class="relative w-full h-80 overflow-hidden rounded-lg mb-4 bg-muted">
          <img :src="package.details.images[currentImageIndex]" alt="Package Image" class="w-full h-full object-contain transition-opacity duration-300" loading="lazy" decoding="async" width="800" height="600" />
          <button @click="prevImage" class="absolute left-0 top-1/2 -translate-y-1/2 bg-card/50 text-foreground p-2 rounded-full ml-2">&lt;</button>
          <button @click="nextImage" class="absolute right-0 top-1/2 -translate-y-1/2 bg-card/50 text-foreground p-2 rounded-full mr-2">&gt;</button>
        </div>
        <div class="flex justify-center space-x-2">
          <img v-for="(img, idx) in package.details.images" :key="idx" :src="img" @click="setCurrentImage(idx)" :class="{'border-2 border-primary': idx === currentImageIndex}" class="w-20 h-16 object-cover rounded-lg cursor-pointer" loading="lazy" width="80" height="64" />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-foreground mb-3">Overview</h3>
        <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ package.details.overview }}</p>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-foreground mb-3">Accommodation</h3>
        <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ package.details.accommodation }}</p>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-foreground mb-4">Itinerary Highlights</h3>
        <div v-for="(item, index) in package.details.itinerary" :key="index" class="mb-6 last:mb-0">
          <h4 class="text-xl font-semibold text-primary mb-2">{{ item.day }}</h4>
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ item.description }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-foreground mb-3">Exclusive Benefits</h3>
        <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ package.details.benefits }}</p>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-foreground mb-3">Booking Information</h3>
        <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ package.details.booking }}</p>
      </div>

      <div class="text-center mt-8 space-y-4">
        <button @click="bookNowAndClose" class="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300">
          Inquiry
        </button>
        <button @click="closeModal" class="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { smoothScroll } from '../utils/smoothScroll';

const currentImageIndex = ref(0);

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + props.package.details.images.length) % props.package.details.images.length;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.package.details.images.length;
};

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index;
};

interface PackageDetails {
  overview: string;
  accommodation: string;
  itinerary: { day: string; description: string }[];
  benefits: string;
  booking: string;
  images: string[];
}

interface Package {
  title: string;
  price: string;
  duration: string;
  image: string;
  highlights: string[];
  isPopular?: boolean;
  details: PackageDetails;
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  package: {
    type: Object as () => Package,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const bookNowAndClose = () => {
  closeModal();
  smoothScroll('booking');
};
</script>

<style scoped>
/* Add any specific styles for the modal here if needed */
</style>