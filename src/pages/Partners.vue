<template>
  <AppLayout>
    <div class="container mx-auto px-4 py-20">
      <h1 class="text-4xl font-bold text-center mb-10">Our Esteemed Partners</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="partner in partners" :key="partner.id">
          <router-link
            v-if="!partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto"
          >
            <img
              v-if="partner.logo"
              :src="partner.logo.medium"
              :srcset="`${partner.logo.small} 200w, ${partner.logo.medium} 600w, ${partner.logo.large} 1200w`"
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px"
              :alt="partner.name + ' Logo'"
              class="w-full h-auto mb-6"
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
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ALL_PARTNERS, Partner } from '@/composables/partnersData'
import AppLayout from '@/components/AppLayout.vue';

const partners = ref<Partner[]>(ALL_PARTNERS)
</script>

<style scoped>
/* Styles for the partners page */
</style>