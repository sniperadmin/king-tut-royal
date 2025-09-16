<template>
  <section class="py-10 bg-light-gray text-foreground">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-2xl font-bold mb-8">Our Official Partners</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <template v-for="partner in partners" :key="partner.id">
          <router-link
            v-if="!partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto"
          >
            <img v-if="partner.logo" :src="partner.logo" :alt="partner.name + ' Logo'" class="w-full h-auto mb-6" />
            <!-- <h3 class="text-xl font-semibold text-center text-brownish">{{ partner.name }}</h3>
            <button v-if="partner.id === 'semiramis-intercontinental'" class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-dark transition-colors duration-300">
              Show More
            </button> -->
          </router-link>
          <div
            v-else
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto"
          >
            <h3 class="text-xl font-semibold text-center text-brownish mb-2">{{ partner.name }}</h3>
            <p class="text-sm text-muted-foreground">Coming Soon...</p>
          </div>
        </template>
        <div v-if="partners.length === 0" class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary w-full max-w-xs mx-auto">
          <h3 class="text-2xl font-semibold text-center text-brownish">More Partners Coming Soon...</h3>
        </div>
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