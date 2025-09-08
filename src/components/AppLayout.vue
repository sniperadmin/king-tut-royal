<template>
  <div class="min-h-screen bg-black text-white">
    <Navigation />
    <main>
      <section id="home">
        <HeroSection />
      </section>
      <Suspense>
        <VideoSection />
      </Suspense>
      <section id="packages">
        <Suspense>
          <PackagesSection />
        </Suspense>
      </section>

      <Suspense>
        <MediaSliderSection />
      </Suspense>

      <Suspense>
        <WhyChooseSection />
      </Suspense>
      <Suspense>
        <BookingSection />
      </Suspense>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Navigation from './Navigation.vue'
import HeroSection from './HeroSection.vue'
const VideoSection = defineAsyncComponent(() => import('./sections/VideoSection.vue'))
const MediaSliderSection = defineAsyncComponent(() => import('./MediaSliderSection.vue'))
const PackagesSection = defineAsyncComponent(() => import('./PackagesSection.vue'))
const WhyChooseSection = defineAsyncComponent(() => import('./WhyChooseSection.vue'))
const BookingSection = defineAsyncComponent(() => import('./BookingSection.vue'))
import Footer from './Footer.vue'
</script>
