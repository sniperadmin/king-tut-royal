<template>
  <AppLayout>
    <div class="mx-auto py-20 bg-brownish/10 justify-center min-h-screen">
      <div class="container flex flex-col md:flex-row items-center mb-8 w-full max-w-6xl mx-auto">
        <button
          type="button"
          @click="router.push('/')"
          class="rounded-sm border border-brownish hover:bg-brownish hover:text-background text-brownish py-2 px-4 font-semibold tracking-wider transition-all duration-300 uppercase text-sm w-full md:w-auto mb-4 md:mb-0"
        >
          Back to Home
        </button>
        <h1 class="text-4xl font-bold text-center flex-grow md:ml-4">Our Exclusive Packages</h1>
      </div>
      <div :class="gridColsClass" class="container grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full mx-auto justify-items-center">
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
import { ref, defineAsyncComponent, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PACKAGES } from '@/composables/packagesData';
import AppLayout from '@/components/AppLayout.vue';

const PackageCard = defineAsyncComponent(() => import('../components/PackageCard.vue'))
const router = useRouter()

const packages = PACKAGES;

const gridColsClass = computed(() => {
  if (packages.length === 1) {
    return 'lg:grid-cols-1';
  } else if (packages.length === 2) {
    return 'lg:grid-cols-2';
  } else {
    return 'lg:grid-cols-3';
  }
});

onMounted(() => {
  window.scrollTo(0, 0);
})
</script>

<style scoped>
/* Styles for the packages page */
</style>
