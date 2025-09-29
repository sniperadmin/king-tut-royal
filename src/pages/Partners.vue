<template>
  <AppLayout>
    <div class="mx-auto px-4 py-20 bg-brownish/10">
      <div class="flex flex-col md:flex-row items-center mb-8">
        <button
          type="button"
          @click="router.push('/')"
          class="rounded-sm border border-brownish hover:bg-brownish hover:text-background text-brownish py-2 px-4 font-semibold tracking-wider transition-all duration-300 uppercase text-sm w-full md:w-auto mb-4 md:mb-0"
        >
          Back to Home
        </button>
        <h1 class="text-2xl font-bold text-center capitalize flex-grow md:ml-4">King tut royal experience official partners</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full mx-auto justify-items-center">
        <template v-for="partner in partners" :key="partner.id">
          <router-link
            v-if="!partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs h-[200px]"
          >
            <img
              v-if="partner.partner.logo"
              :src="partner.partner.logo?.medium || '/images/default-logo.webp'"
              :srcset="`${partner.partner.logo?.small || '/images/default-logo.webp'} 200w, ${partner.partner.logo?.medium || '/images/default-logo.webp'} 600w, ${partner.partner.logo?.large || '/images/default-logo.webp'} 1200w`"
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px"
              :alt="partner.partner.name + ' Logo'"
              class="w-full h-auto mb-6 object-cover max-h-[100px]"
              width="200"
              height="80"
            />
          </router-link>
          <div
            v-else
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs h-[250px]"
          >
            <h3 class="text-xl font-semibold text-center text-brownish mb-2">{{ partner.name }}</h3>
            <p class="text-sm text-muted-foreground">Coming Soon...</p>
          </div>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSeo, seoConfigs } from '@/composables/useSeo'
import { useStructuredData } from '@/composables/useStructuredData'
import AppLayout from '@/components/AppLayout.vue';
import { supabase } from '../lib/supabase';
import { Partner } from '../types';

const partners = ref<Partner[]>([]);
const router = useRouter()

// SEO and Structured Data
const { addOrganizationSchema, addBreadcrumbSchema } = useStructuredData()

// Apply SEO configuration - must be called directly in setup, not in onMounted
console.log('Partners.vue: Calling useSeo with partners config:', seoConfigs.partners)
useSeo(seoConfigs.partners)
console.log('Partners.vue: useSeo called')

onMounted(async () => {
  window.scrollTo(0, 0);
  
  // Add structured data
  addOrganizationSchema()
  addBreadcrumbSchema([
    { name: 'Home', url: 'https://kingtutroyal.com/' },
    { name: 'Partners', url: 'https://kingtutroyal.com/partners' }
  ])
  
  const { data, error } = await supabase
    .from('partners_view')
    .select('partner, id, sort_rank')
    .order('sort_rank', { ascending: true })
    .order('partner->>name', { ascending: true })
    .neq('id', 'orascom-pyramids-entertainment');

  if (error) {
    console.error('Error fetching partners:', error);
    return;
  }

  partners.value = data;
});
</script>

<style scoped>
/* Styles for the partners page */
</style>