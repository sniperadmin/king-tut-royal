<template>
<div class="flex flex-col h-full w-full">
  <h3 class="text-2xl font-semibold text-foreground my-5">{{ title }}</h3>
  <div :class="['bg-card border group hover:border-primary/50 transition-all duration-300 rounded-lg text-center overflow-hidden w-full', isPopular ? 'border-primary' : 'border-border']">
    <div class="relative overflow-hidden bg-muted">
      <img
        :src="image"
        :srcset="computedImageSrcset"
        :sizes="imageSizes"
        :alt="title + ' thumbnail'"
        loading="lazy"
        decoding="async"
        class="w-full rounded-t-lg drop-shadow h-48 object-contain"
        width="412"
        height="240"
      />
      <div v-if="isPopular" class="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
        Popular
      </div>
    </div>

    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center justify-center mb-3">
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
          <component :is="LucideIcon" :size="20" class="text-primary-foreground" />
        </div>
        <h3 class="text-xl font-semibold text-foreground">{{ title }} Package</h3>
      </div>
      <p class="text-muted-foreground text-sm tracking-wide font-medium mb-2">{{ duration }}</p>
      <div class="text-2xl font-semibold text-primary mb-4">{{ price }} <span class="text-muted-foreground text-sm font-medium">per person</span></div>

      <div class="mb-6 flex-grow">
        <ul class="space-y-2 text-left">
          <li v-for="(highlight, index) in highlights" :key="index" class="flex items-start text-sm">
            <span class="text-primary mr-2 text-base">•</span>
            <span class="text-foreground font-medium leading-tight">{{ highlight }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-auto space-y-3">
        <router-link
          :to="`/packages/${packageTitleForDetails.toLowerCase().replace(/ /g, '-')}`"
          class="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 font-semibold tracking-wider transition-all duration-300 uppercase text-sm block text-center"
        >
          View Details
        </router-link>
        <button
          @click="console.log('Emitting bookNow with slug:', props.packageSlug); emit('bookNow', props.packageSlug)"
          class="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 font-semibold tracking-wider transition-all duration-300 uppercase text-sm"
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
  packageTitleForDetails: string;
  packageSlug: string; // Add new prop
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
  imageSizes: { type: String, default: '(max-width: 768px) 100vw, 50vw' },
  highlights: { type: Array as PropType<string[]>, required: true },
  isPopular: { type: Boolean, default: false },
  packageTitleForDetails: { type: String, required: true },
  packageSlug: { type: String, required: true }, // Add new prop
  icon: { type: String, default: 'CircleAlert' },
} as const);

const emit = defineEmits(['bookNow']);

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