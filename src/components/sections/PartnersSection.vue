<template>
  <section class="py-10 bg-light-gray text-foreground">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-2xl font-bold mb-8">Our Official Partners</h2>
      
      <div v-if="loading" class="text-center py-8">
        <p class="text-brownish">Loading partners...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">{{ error }}</p>
      </div>
      
      <div v-else-if="partners.length === 0" class="text-center py-8">
        <p class="text-brownish">No partners available at the moment.</p>
      </div>
      
      <SplideCarousel 
        v-else
        :options="carouselOptions"
        :extensions="{ AutoScroll }"
        aria-label="Our Official Partners"
        class="max-w-6xl mx-auto"
      >
        <SplideSlide v-for="partner in partners" :key="partner.id">
          <router-link 
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-[250px] mx-auto h-[180px] no-underline"
          >
            <img 
              v-if="partner.logo"
              :src="partner.logo.medium" 
              :srcset="`${partner.logo.small} 200w, ${partner.logo.medium} 600w, ${partner.logo.large} 1200w`" 
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px" 
              :alt="partner.name + ' Logo'" 
              class="w-full h-auto object-cover max-h-[150px]" 
              width="200" 
              height="80" 
              loading="lazy"
            />
            <div v-else class="text-center">
              <h3 class="text-xl font-semibold text-brownish mb-2">{{ partner.name }}</h3>
            </div>
          </router-link>
        </SplideSlide>
      </SplideCarousel>
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
import { supabase } from '../../lib/supabase';
import { Partner } from '../../types';
import SplideCarousel from '../SplideCarousel.vue';
import { SplideSlide } from '@splidejs/vue-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const partners = ref<Partner[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const carouselOptions = {
  type: 'loop',
  perPage: 4,
  perMove: 1,
  autoScroll: {
    speed: 0.5,
    pauseOnHover: true,
    direction: 'ltr',
  },
  gap: '0.001rem',
  pagination: false,
  breakpoints: {
    1024: {
      perPage: 3
    },
    768: {
      perPage: 2
    },
    640: {
      perPage: 1
    }
  }
};

onMounted(async () => {
  try {
    console.log('Fetching partners from partners_view...');
    const { data, supabaseError } = await supabase
      .from('partners_view')
      .select('*')

    if (supabaseError) {
      console.error('Error fetching partners:', supabaseError);
      error.value = 'Failed to load partners. Please try again later.';
      return;
    }

    console.log('Partners data received:', data);
    console.log('Number of partners:', data?.length || 0);
    partners.value = data.map(p => p.partner) || [];
  } catch (err) {
    console.error('Unexpected error fetching partners:', err);
    error.value = 'An unexpected error occurred.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Add any section-specific styles here */
</style>