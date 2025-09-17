<template>
  <section id="packages" class="py-20 bg-light-blue text-foreground">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-4">Choose Your Royal Experience</h2>
        <p class="text-xl text-brownish font-bold max-w-2xl mx-auto">
          Exclusive packages designed for the discerning traveler
        </p>
      </div>
      
      <div class="flex flex-wrap justify-center gap-8">
        <PackageCard
          v-for="pkg in packages.slice(0, 1)"
          :key="pkg.title"
          :title="pkg.title"
          :price="pkg.price"
          :duration="pkg.duration"
          :image="pkg.image"
          :image_412w="pkg.image_412w"
          :image_853w="pkg.image_853w"
          :image-srcset="pkg.imageSrcset ?? (pkg.image_412w && pkg.image_853w ? `${pkg.image_412w} 412w, ${pkg.image_853w} 853w` : '')"
          :highlights="pkg.highlights"
          :isPopular="pkg.isPopular"
          :onBookNowClick="scrollToBooking"
          :packageTitleForDetails="pkg.title"
          :icon="pkg.icon"
        />
      </div>
      <div class="text-center mt-10">
        <router-link to="/packages" class="px-6 py-3 bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10 transition shadow-lg">
          View All Packages
        </router-link>
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

<style scoped>
/* Styles for the packages section */
</style>