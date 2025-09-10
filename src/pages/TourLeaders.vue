<template>
  <AppLayout>
    <div class="container mx-auto p-4 pt-20">
      <h1 class="text-3xl font-bold mb-6 text-center">Our Tour Leaders</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="leader in tourLeaders" :key="leader['Phone Number']" class="bg-gray-900 border border-gray-800 group hover:border-yellow-400/50 transition-all duration-300 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white">
          <div class="relative w-32 h-32 mb-4">
            <img v-if="leader.avatar" :src="leader.avatar" :alt="leader.Name + ' avatar'" class="w-full h-full rounded-full object-cover border-4 border-gray-700 group-hover:border-yellow-400/50 transition-all duration-300 shadow-lg" />
            <div v-else class="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 group-hover:text-yellow-400/50 transition-all duration-300">
              {{ leader.Name.charAt(0) }}
            </div>
          </div>
          <h2 class="text-2xl font-semibold mb-2 text-white">{{ leader.Name }}</h2>
          <div class="space-y-2 text-left w-full">
            <p class="flex items-center text-gray-300"><Phone class="w-5 h-5 mr-2 text-yellow-400" /> Phone: {{ leader['Phone Number'] }}</p>
            <p class="flex items-center text-gray-300"><Globe class="w-5 h-5 mr-2 text-yellow-400" /> Languages: {{ leader.Languages }}</p>
            <p v-if="leader.Age" class="flex items-center text-gray-300"><CalendarDays class="w-5 h-5 mr-2 text-yellow-400" /> Age: {{ leader.Age }}</p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import tourLeadersData from '../utils/tour_leaders.json'
import { Phone, Globe, CalendarDays } from 'lucide-vue-next'

interface TourLeader {
  "Phone Number": string;
  Name: string;
  Languages: string;
  Age: number | null;
  avatar?: string;
}

const tourLeaders = ref<TourLeader[]>(tourLeadersData as TourLeader[]);

onMounted(() => {
  window.scrollTo(0, 0);
})
</script>

<style scoped>
</style>