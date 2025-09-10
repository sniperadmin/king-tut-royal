<template>
  <div class="min-h-screen bg-black text-white">
    <Navigation />
    <main>
      <section id="home">
        <HeroSection />
      </section>
      <VideoSection />
      <section id="packages">
        <PackagesSection />
      </section>
      <MediaSliderSection />
      <WhyChooseSection />
      <BookingSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Navigation from './Navigation.vue'
import HeroSection from './HeroSection.vue'

const MediaSliderSection = defineAsyncComponent(() => import('./MediaSliderSection.vue'))
const PackagesSection = defineAsyncComponent(() => import('./PackagesSection.vue'))
const VideoSection = defineAsyncComponent(() => import('./sections/VideoSectionOptimized.vue'))
const WhyChooseSection = defineAsyncComponent(() => import('./WhyChooseSection.vue'))
const BookingSection = defineAsyncComponent(() => import('./BookingSection.vue'))
const Footer = defineAsyncComponent(() => import('./Footer.vue'))
</script>