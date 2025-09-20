<template>
  <section class="py-10 bg-light-gray text-foreground">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-2xl font-bold mb-8">Our Official Partners</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full mx-auto justify-items-center">
        <template v-for="partner in partners.slice(0, 2)" :key="partner.id">
          <router-link
            v-if="!partner.partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto h-[250px]"
          >
            <img
              v-if="partner.partner.logo"
              :src="logoSrc(partner.partner)"
              :srcset="logoSrcSet(partner.partner)"
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px"
              :alt="partner.partner.name + ' Logo'"
              class="w-full h-auto mb-6 max-h-[150px]"
              width="200"
              height="80"
            />
          </router-link>
          <div
            v-else
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto"
          >
            <h3 class="text-xl font-semibold text-center text-brownish mb-2">{{ partner.name }}</h3>
            <p class="text-sm text-muted-foreground">Coming Soon...</p>
          </div>
        </template>
      </div>
      <div class="w-full flex justify-center mt-8">
        <router-link to="/partners" class="px-6 py-3 bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10 transition shadow-lg">
          View All Partners
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase';
import { Partner } from '../types';

const partners = ref<Partner[]>([]);

function logoSrc(partner: any, size = 'medium') {
  
  if (!partner || !partner.hasOwnProperty('logo') || partner.logo === null || partner.logo === undefined) return '/images/default-logo.webp';
  if (typeof partner.logo === 'string') return partner.logo;
  // partner.logo is assumed to be an object with sized variants
  return partner.logo?.[size] ?? partner.logo?.medium ?? partner.logo?.small ?? partner.logo?.large ?? '/images/default-logo.webp';
}

function logoSrcSet(partner: any) {
  if (!partner || !partner.hasOwnProperty('logo') || partner.logo === null || partner.logo === undefined) return '/images/default-logo.webp 600w';
  if (typeof partner.logo === 'string') return `${partner.logo} 600w`;
  const small = partner.logo?.small ?? '/images/default-logo.webp';
  const medium = partner.logo?.medium ?? '/images/default-logo.webp';
  const large = partner.logo?.large ?? '/images/default-logo.webp';
  return `${small} 200w, ${medium} 600w, ${large} 1200w`;
}

onMounted(async () => {
  const { data, error } = await supabase
    .from('partners_view')
    .select('*');

  if (error) {
    console.error('Error fetching partners:', error);
    return;
  }

  partners.value = data;
});
</script>

<style scoped>
/* Add any section-specific styles here */
</style>