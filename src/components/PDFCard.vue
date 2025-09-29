<template>
  <BaseCard
    variant="default"
    :image="itinerary.thumbnail_url || '/placeholder.svg'"
    :imageAlt="itinerary.title"
    :hoverable="true"
    :group="true"
    :overlay="true"
    customClass="pdf-card bg-white"
    :mediaClass="'relative h-48 w-full overflow-hidden'"
    :contentClass="'p-4'"
  >
    <template #media-overlay>
      <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
        <h3 class="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">Download Itinerary</h3>
        <p class="text-xl text-white font-bold">{{ itinerary.title }}</p>
      </div>
    </template>

    <template #content>
      <div class="flex justify-between items-center mb-4 text-gray-500 text-xs">
        <span>{{ itinerary.file_size ? itinerary.file_size.toFixed(1) + ' KB' : 'N/A' }}</span>
        <span>{{ new Date(itinerary.created_at).toLocaleDateString() }}</span>
      </div>
    </template>

    <template #actions>
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
          Download Itinerary
        </a>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './ui/BaseCard.vue';
import type { ItineraryPDF } from '../types';

const props = defineProps<{ itinerary: ItineraryPDF }>();
const emit = defineEmits(['preview']);
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>