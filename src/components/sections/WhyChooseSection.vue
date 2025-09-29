<template>
  <section id="why-us" class="py-10 bg-light-blue text-foreground">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-foreground mb-4">Why Us?</h2>
        <p class="text-xl text-brownish max-w-2xl text-bold mx-auto">
          Experience the difference with our premium service and attention to detail
        </p>
      </div>
      
      <SplideCarousel 
        :options="carouselOptions"
        :extensions="{ AutoScroll }"
        aria-label="Why Choose Us"
        class="max-w-5xl mx-auto"
      >
        <SplideSlide v-for="item in whyChooseItems" :key="item.id">
          <div class="text-center px-4">
            <div class="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-primary-foreground text-2xl font-bold">{{ item.icon }}</span>
            </div>
            <h3 class="text-xl font-bold text-foreground mb-4">{{ item.title }}</h3>
            <p class="text-muted-foreground">{{ item.description }}</p>
          </div>
        </SplideSlide>
      </SplideCarousel>
      
      <div class="text-center mt-12">
        <router-link to="/why-us" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Learn More
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SplideCarousel from '../SplideCarousel.vue';
import { SplideSlide } from '@splidejs/vue-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

interface WhyChooseItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const whyChooseItems = ref<WhyChooseItem[]>([
  {
    id: 1,
    icon: '★',
    title: 'Exclusive Access',
    description: 'Private tours and exclusive access to restricted areas'
  },
  {
    id: 2,
    icon: '♔',
    title: 'Luxury Service',
    description: '5-star accommodations and premium transportation'
  },
  {
    id: 3,
    icon: '◆',
    title: 'Expert Guides',
    description: 'Knowledgeable Egyptologists and local experts'
  }
]);

const carouselOptions = {
  type: 'loop',
  perPage: 3,
  perMove: 1,
  gap: '1rem',
  autoScroll: {
    speed: 0.3,
    pauseOnHover: true,
    direction: 'ltr',
  },
  pagination: false,
  breakpoints: {
    1024: {
      perPage: 2
    },
    768: {
      perPage: 1
    }
  }
};
</script>