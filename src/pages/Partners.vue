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
        <h1 class="text-4xl font-bold text-center flex-grow md:ml-4">Our Esteemed Partners</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full mx-auto justify-items-center">
        <template v-for="partner in partners" :key="partner.id">
          <router-link
            v-if="!partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs h-[250px]"
          >
            <img
              v-if="partner.partner.logo"
              :src="partner.partner.logo?.medium || '/images/default-logo.webp'"
              :srcset="`${partner.partner.logo?.small || '/images/default-logo.webp'} 200w, ${partner.partner.logo?.medium || '/images/default-logo.webp'} 600w, ${partner.partner.logo?.large || '/images/default-logo.webp'} 1200w`"
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px"
              :alt="partner.partner.name + ' Logo'"
              class="w-full h-auto mb-6 object-contain max-h-[150px]"
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
import AppLayout from '@/components/AppLayout.vue';
import { supabase } from '../lib/supabase';
import { Partner } from '../types';

const partners = ref<Partner[]>([]);
const router = useRouter()

onMounted(async () => {
  window.scrollTo(0, 0);
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
/* Styles for the partners page */
</style>