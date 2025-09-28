<template>
  <AppLayout>
    <div class="mx-auto py-20 justify-center min-h-screen">
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
      <div :class="gridColsClass" class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full mx-auto justify-items-center">
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
          @bookNow="bookNow(pkg.slug)" 
          :packageTitleForDetails="pkg.title"
          :packageSlug="pkg.slug"
          :icon="pkg.iconLabel"
        /> <!-- Placeholder for now -->
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSeo, seoConfigs } from '@/composables/useSeo'
import { useStructuredData } from '@/composables/useStructuredData'
import AppLayout from '@/components/AppLayout.vue';
import { supabase } from '../lib/supabase';
import { PackageData } from '../types';
import { KING_TUT_VIP_ONE_DAY, KING_TUT_ROYAL_VIP } from '@/constants/packageIds';

// SEO Configuration
useSeo(seoConfigs.packages)

// Structured Data
const { addOrganizationSchema, addBreadcrumbSchema } = useStructuredData()


const PackageCard = defineAsyncComponent(() => import('../components/PackageCard.vue'))
const router = useRouter()

const packages = ref<PackageData[]>([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from('packages_view')
    .select('package, sort_rank')
    .limit(1)
    .order('sort_rank', { ascending: true });

  if (error) {
    console.error('Error fetching packages:', error);
    return;
  }

  packages.value = data.map((row: { package: PackageData }) => row.package);
});

const gridColsClass = computed(() => {
  if (packages.value.length === 1) {
    return 'lg:grid-cols-1';
  } else if (packages.value.length === 2) {
    return 'lg:grid-cols-2';
  } else {
    return 'lg:grid-cols-3';
  }
});

const bookNow = (packageSlug: string) => {
  console.log('bookNow', packageSlug)
  router.push({ path: '/', query: { scroll: 'booking', packageId: packageSlug } })
}

onMounted(() => {
  window.scrollTo(0, 0);
  addOrganizationSchema()
  addBreadcrumbSchema([
    { name: 'Home', url: 'https://kingtutroyal.com/' },
    { name: 'Packages', url: 'https://kingtutroyal.com/packages' }
  ])
})
</script>

<style scoped>
/* Styles for the packages page */
</style>
