<template>
  <section id="packages" class="py-10 bg-black">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4">Choose Your Royal Experience</h2>
        <p class="text-xl text-amber-400 max-w-2xl mx-auto">
          Exclusive packages designed for the discerning traveler
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <PackageCard
          v-for="pkg in packages"
          :key="pkg.title"
          :title="pkg.title"
          :price="pkg.price"
          :duration="pkg.duration"
          :image="pkg.image"
          :image_412w="pkg.image_412w"
          :image_853w="pkg.image_853w"
          :highlights="pkg.highlights"
          :isPopular="pkg.isPopular"
          :onBookNowClick="scrollToBooking"
          :packageTitleForDetails="pkg.title"
          :icon="pkg.icon"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'
import { ref, defineAsyncComponent } from 'vue'
import { PACKAGES } from '@/composables/packagesData';

const PackageCard = defineAsyncComponent(() => import('./PackageCard.vue'))
const scrollToBooking = () => {
  smoothScroll('booking')
}

const packages = PACKAGES;
</script>