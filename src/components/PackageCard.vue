<template>
<div class="flex flex-col">
  <h3 class="text-2xl font-semibold text-white my-5">{{ title }}</h3>
  <div :class="['bg-gray-900 border group hover:border-yellow-400/50 transition-all duration-300 rounded-lg text-center overflow-hidden', isPopular ? 'border-yellow-400' : 'border-gray-800']">
    <div class="relative overflow-hidden bg-gray-600">
      <img
        :src="image"
        :srcset="imageSrcset"
        sizes="(max-width: 600px) 600px, 400px"
        :alt="title + ' thumbnail'"
        loading="lazy"
        decoding="async"
        class="mx-auto rounded-t-lg drop-shadow"
        width="800"
        height="294"
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
        <h3 class="text-xl font-semibold text-white">{{ title }} Package</h3>
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

</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Crown, Star, CircleAlert } from 'lucide-vue-next';
// Add here any other icons passed as props.icon, e.g., import { Star, Heart } from 'lucide-vue-next'

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

const LucideIcon = computed(() => {
  // Map possible icon strings to components
  const iconMap = {
    Crown,
    Star,
    CircleAlert,
    // Add other mappings, e.g., Star, Heart, etc. as needed.
  };
  return iconMap[props.icon] || CircleAlert;
});

const imageSrcset = computed(() => {
  return `${props.image} 400w, ${props.image} 800w`;
});
</script>