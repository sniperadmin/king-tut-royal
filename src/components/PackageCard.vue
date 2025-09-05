<template>
  <div :class="['bg-gray-900 border group hover:border-yellow-400/50 transition-all duration-300 rounded-lg flex flex-col text-center overflow-hidden', isPopular ? 'border-yellow-400' : 'border-gray-800']">
    <div class="relative w-full h-48 overflow-hidden bg-gray-600">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
      />
      <div v-if="isPopular" class="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 text-xs font-medium rounded-full">
        Popular
      </div>
    </div>

    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center justify-center mb-3">
        <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
          <component :is="LucideIcon" :size="20" class="text-black" />
        </div>
        <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
      </div>
      <p class="text-gray-300 text-sm tracking-wide font-medium mb-2">{{ duration }}</p>
      <div class="text-2xl font-semibold text-yellow-400 mb-4">{{ price }} <span class="text-gray-300 text-sm font-medium">per person</span></div>

      <div class="mb-6 flex-grow">
        <ul class="space-y-2 text-left">
          <li v-for="(highlight, index) in highlights.slice(0, 3)" :key="index" class="flex items-start text-sm">
            <span class="text-yellow-400 mr-2 text-base">•</span>
            <span class="text-gray-200 font-medium leading-tight">{{ highlight }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-auto space-y-3">
        <button
          @click="onViewDetailsClick"
          class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 font-semibold tracking-wider transition-all duration-300 uppercase text-sm"
        >
          View Details
        </button>
        <button
          @click="onBookNowClick"
          class="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black py-3 font-semibold tracking-wider transition-all duration-300 uppercase text-sm"
        >
          INQUIRY
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import * as icons from "lucide-vue-next";

interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  highlights: string[];
  isPopular?: boolean;
  onBookNowClick: () => void;
  onViewDetailsClick: () => void;
  icon: string;
}

const props = withDefaults(defineProps<PackageCardProps>(), {
  isPopular: false,
});

const LucideIcon = computed(() => icons[props.icon]);
</script>