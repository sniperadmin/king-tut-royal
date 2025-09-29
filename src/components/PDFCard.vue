<template>
  <div class="pdf-card relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl group">
    <div class="relative h-48 w-full overflow-hidden">
      <img
        :src="itinerary.thumbnail_url || '/placeholder.svg'"
        :alt="itinerary.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
        <h3 class="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">{{ itinerary.title }}</h3>
        <p class="text-sm text-gray-300">{{ itinerary.category }}</p>
      </div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-center mb-4 text-gray-500 text-xs">
        <span>{{ itinerary.file_size ? itinerary.file_size.toFixed(1) + ' KB' : 'N/A' }}</span>
        <span>{{ new Date(itinerary.created_at).toLocaleDateString() }}</span>
      </div>
      <div class="flex space-x-4">
        <button
          @click="emit('preview', itinerary.file_url)"
          class="flex-1 bg-gold text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 text-sm font-medium"
        >
          Preview Itinerary
        </button>
        <a
          :href="itinerary.file_url"
          download
          target="_blank"
          class="flex-1 text-center border border-gold text-gold py-2 px-4 rounded-md hover:bg-gold hover:text-white transition duration-300 text-sm font-medium"
        >
          Download
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItineraryPDF } from '../types';

const props = defineProps<{ itinerary: ItineraryPDF }>();
const emit = defineEmits(['preview']);
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>