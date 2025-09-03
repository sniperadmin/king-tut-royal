<template>
  <div :class="['bg-gray-900 border group hover:border-yellow-400/50 transition-all duration-300 rounded-lg flex flex-col items-center text-center', isPopular ? 'border-yellow-400' : 'border-gray-800']">
    <div v-if="isPopular" class="bg-yellow-400 text-black px-4 py-1 text-sm font-medium text-center">
      MOST POPULAR
    </div>

    <div class="relative h-80 overflow-hidden bg-gray-800">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="p-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <h3 class="text-3xl font-semibold text-white">{{ title }}</h3>
        </div>
        <p class="text-gray-300 text-lg tracking-wide font-medium">{{ duration }}</p>
      </div>

      <div class="text-center mb-8">
        <div class="text-4xl font-semibold text-yellow-400 mb-2">{{ price }}</div>
        <div class="text-gray-300 text-base font-medium">per person</div>
      </div>

      <div class="mb-8">
        <ul class="space-y-4">
          <li v-for="(highlight, index) in highlights.slice(0, 4)" :key="index" class="flex items-start text-base">
            <span class="text-yellow-400 mr-3 mt-1 text-lg">•</span>
            <span class="text-gray-200 font-medium leading-relaxed">{{ highlight }}</span>
          </li>
        </ul>
      </div>

      <button
        @click="onBookNow"
        class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 font-semibold tracking-wider transition-all duration-300 uppercase text-base"
      >
        Book Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  highlights: string[];
  isPopular?: boolean;
  onBookNow: () => void;
}

withDefaults(defineProps<PackageCardProps>(), {
  isPopular: false,
});
</script>