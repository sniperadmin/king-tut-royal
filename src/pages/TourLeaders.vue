<template>
  <AppLayout>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6 text-center">Our Tour Leaders</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="leader in tourLeaders" :key="leader['Phone Number']" class="bg-gray-900 border border-gray-800 group hover:border-yellow-400/50 transition-all duration-300 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white">
          <img v-if="leader.avatar" :src="leader.avatar" :alt="leader.Name + ' avatar'" class="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-700 group-hover:border-yellow-400/50 transition-all duration-300" />
          <div v-else class="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-2xl font-bold text-gray-500 group-hover:text-yellow-400/50 transition-all duration-300">
            {{ leader.Name.charAt(0) }}
          </div>
          <h2 class="text-xl font-semibold mb-2 text-white">{{ leader.Name }}</h2>
          <p class="text-gray-300">Phone: {{ leader['Phone Number'] }}</p>
          <p class="text-gray-300">Languages: {{ leader.Languages }}</p>
          <p v-if="leader.Age" class="text-gray-300">Age: {{ leader.Age }}</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import tourLeadersData from '../utils/tour_leaders.json'

interface TourLeader {
  "Phone Number": string;
  Name: string;
  Languages: string;
  Age: number | null;
  avatar?: string;
}

const tourLeaders = ref<TourLeader[]>(tourLeadersData as TourLeader[]);
</script>

<style scoped>
</style>