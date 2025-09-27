<template>
  <section class="py-20 bg-light-blue text-foreground">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <!-- <h2 class="text-3xl font-bold text-foreground mb-4">Choose Your Royal Experience</h2> -->
        <p class="text-2xl text-brownish font-bold max-w-2xl mx-auto mb-4">
          Unlock Egypt’s Hidden Luxury – Exclusively for the World’s Elite.
        </p>
        <p class="text-2xl text-primary font-bold max-w-2xl mx-auto">
          Limited Edition to 50 travellers per week
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
          :packageTitleForDetails="pkg.title"
          :packageSlug="pkg.slug"
          :icon="pkg.iconLabel"
          @bookNow="router.push('/booking')"
        />
      </div>
      <!-- <div class="text-center mt-10">
        <router-link to="/packages" class="px-6 py-3 bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10 transition shadow-lg">
          View All Packages
        </router-link>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase';
import { PackageData } from '../types';

const router = useRouter()
const PackageCard = defineAsyncComponent(() => import('./PackageCard.vue'))

const packages = ref<PackageData[]>([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from('packages_view')
    .select('package, sort_rank')
    .order('sort_rank', { ascending: true });

  if (error) {
    console.error('Error fetching packages:', error);
    return;
  }

  packages.value = (data || []).map((row: { package: PackageData }) => row.package);
});
</script>

<style scoped>
/* Styles for the packages section */
</style>