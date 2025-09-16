<template>
  <AppLayout>
    <div class="container mx-auto p-4 pt-20">
      <h1 class="text-3xl font-bold mb-6 text-center text-foreground">Our Tour Leaders <span class="text-primary">({{ tourLeaders.length }} total)</span></h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="leader in tourLeaders" :key="leader.phone" class="bg-card border border-border group hover:border-primary/50 transition-all duration-300 rounded-lg shadow-md p-6 flex flex-col items-center text-center text-foreground justify-between">
          <div class="flex flex-col items-center text-center">
            <div class="relative w-32 h-32 mb-4">
              <img v-if="leader.avatar" :src="leader.avatar" :alt="leader.name + ' avatar'" class="w-full h-full rounded-full object-cover border-4 border-border group-hover:border-primary/50 transition-all duration-300 shadow-lg" />
              <div v-else class="w-full h-full rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground group-hover:text-primary/50 transition-all duration-300">
                {{ leader.name.charAt(0) }}
              </div>
            </div>
            <h2 class="text-2xl font-semibold mb-2 text-foreground">{{ leader.name }}</h2>
            <div class="space-y-2 text-left w-full flex-grow">
              <p class="flex items-center text-muted-foreground"><Globe class="w-5 h-5 mr-2 text-primary" /> Languages: {{ Array.isArray(leader.languages) ? leader.languages.join(', ') : leader.languages }}</p>
              <p v-if="leader.age" class="flex items-center text-muted-foreground"><CalendarDays class="w-5 h-5 mr-2 text-primary" /> Age: {{ leader.age }}</p>
            </div>
          </div>
          <router-link :to="`/tour-leaders/${getSlug(leader.name)}`" class="mt-4 inline-flex items-center justify-center px-5 py-2 text-primary-foreground bg-primary font-semibold rounded-full shadow-lg hover:scale-105 transform transition">
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