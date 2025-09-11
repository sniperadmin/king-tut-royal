<template>
  <AppLayout>
    <div class="container mx-auto p-4 pt-20">
      <h1 class="text-3xl font-bold mb-6 text-center">Our Tour Leaders <span class="text-yellow-300">({{ tourLeaders.length }} total)</span></h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="leader in tourLeaders" :key="leader.phone" class="bg-gray-900 border border-gray-800 group hover:border-yellow-400/50 transition-all duration-300 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-white justify-between">
          <div class="flex flex-col items-center text-center">
            <div class="relative w-32 h-32 mb-4">
              <img v-if="leader.avatar" :src="leader.avatar" :alt="leader.name + ' avatar'" class="w-full h-full rounded-full object-cover border-4 border-gray-700 group-hover:border-yellow-400/50 transition-all duration-300 shadow-lg" />
              <div v-else class="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 group-hover:text-yellow-400/50 transition-all duration-300">
                {{ leader.name.charAt(0) }}
              </div>
            </div>
            <h2 class="text-2xl font-semibold mb-2 text-white">{{ leader.name }}</h2>
            <div class="space-y-2 text-left w-full flex-grow">
              <p class="flex items-center text-gray-300"><Globe class="w-5 h-5 mr-2 text-yellow-400" /> Languages: {{ Array.isArray(leader.languages) ? leader.languages.join(', ') : leader.languages }}</p>
              <p v-if="leader.age" class="flex items-center text-gray-300"><CalendarDays class="w-5 h-5 mr-2 text-yellow-400" /> Age: {{ leader.age }}</p>
            </div>
          </div>
          <router-link :to="`/tour-leaders/${getSlug(leader.name)}`" class="mt-4 inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-full shadow-lg hover:scale-105 transform transition">
            View More
          </router-link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import tourLeadersData from '../utils/tour_leaders.json'
import { Globe, CalendarDays } from 'lucide-vue-next'

interface TourLeader {
  phone: string;
  name: string;
  languages: string[];
  age: number | null;
  avatar?: string;
  portfolio: any;
  engagement: any;
}

const tourLeaders = ref<TourLeader[]>(tourLeadersData as TourLeader[]);

const getSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

onMounted(() => {
  window.scrollTo(0, 0);
})
</script>

<style scoped>
</style>