<template>
  <AppLayout>
    <div class="container mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-center mb-10">Our Exclusive Packages</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PackageCard
          v-for="pkg in packages"
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
          :onBookNowClick="() => {}" 
          :packageTitleForDetails="pkg.title"
          :icon="pkg.icon"
        /> <!-- Placeholder for now -->
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { PACKAGES } from '@/composables/packagesData';
import AppLayout from '@/components/AppLayout.vue';

const PackageCard = defineAsyncComponent(() => import('../components/PackageCard.vue'))

const packages = PACKAGES;
</script>

<style scoped>
/* Styles for the packages page */
</style>
