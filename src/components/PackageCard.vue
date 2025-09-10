<template>
<div class="flex flex-col">
  <h3 class="text-2xl font-semibold text-white my-5">{{ title }}</h3>
  <div :class="['bg-gray-900 border group hover:border-yellow-400/50 transition-all duration-300 rounded-lg text-center overflow-hidden', isPopular ? 'border-yellow-400' : 'border-gray-800']">
    <div class="relative overflow-hidden bg-gray-600">
      <img
        :src="image"
        :srcset="computedImageSrcset"
        :sizes="imageSizes"
        :alt="title + ' thumbnail'"
        loading="lazy"
        decoding="async"
        class="mx-auto rounded-t-lg drop-shadow"
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
        <router-link
          :to="`/packages/${packageTitleForDetails.toLowerCase().replace(/ /g, '-')}`"
          class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 font-semibold tracking-wider transition-all duration-300 uppercase text-sm block text-center"
        >
          View Details
        </router-link>
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
import { computed, PropType } from 'vue';
import { Crown, Star, CircleAlert } from 'lucide-vue-next';
// Add here any other icons passed as props.icon, e.g., import { Star, Heart } from 'lucide-vue-next'

interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  imageSrcset?: string;
  imageSizes?: string;
  highlights: string[];
  isPopular?: boolean;
  onBookNowClick: () => void;
  packageTitleForDetails: string;
  icon?: string;
}

const props = defineProps({
  title: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  imageSrcset: { type: String, required: false, default: '' },
  image_412w: { type: String, required: false, default: '' },
  image_853w: { type: String, required: false, default: '' },
  imageSizes: { type: String, default: '100vw' },
  highlights: { type: Array as PropType<string[]>, required: true },
  isPopular: { type: Boolean, default: false },
  onBookNowClick: { type: Function as PropType<() => void>, required: true },
  packageTitleForDetails: { type: String, required: true },
  icon: { type: String, default: 'CircleAlert' },
} as const);

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

const computedImageSrcset = computed(() => {
  if (props.imageSrcset) return props.imageSrcset;
  if (props.image_412w && props.image_853w) {
    return `${props.image_412w} 412w, ${props.image_853w} 853w`;
  }
  return '';
});
</script>