<template>
  <section class="py-10 bg-light-gray text-foreground">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-2xl font-bold mb-8">Our Official Partners</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full mx-auto justify-items-center">
        <template v-for="partner in partners.slice(0, 2)" :key="partner.id">
          <router-link
            v-if="!partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto h-[250px]"
          >
            <img
              v-if="partner.logo"
              :src="partner.logo.medium"
              :srcset="`${partner.logo.small} 200w, ${partner.logo.medium} 600w, ${partner.logo.large} 1200w`"
              sizes="(max-width: 600px) 200px, (max-width: 1200px) 600px, 1200px"
              :alt="partner.name + ' Logo'"
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
import { ref } from 'vue'
import { ALL_PARTNERS, Partner } from '../composables/partnersData'

const partners = ref<Partner[]>(ALL_PARTNERS)
</script>

<style scoped>
/* Add any section-specific styles here */
</style>