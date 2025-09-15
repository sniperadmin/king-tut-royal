<template>
  <AppLayout>
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

      <section id="partners">
        <Suspense>
          <PartnersSection />
        </Suspense>
      </section>

      <Suspense>
        <MediaSliderSection />
      </Suspense>

      <Suspense>
        <WhyChooseSection />
      </Suspense>

      <Suspense>
        <featured-tour-leaders />
      </Suspense>

      <Suspense>
        <BookingSection ref="bookingSectionRef" @loaded="handleBookingSectionLoaded" :preselectedPackageId="route.query.packageId" />
      </Suspense>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import { defineAsyncComponent, nextTick, ref } from 'vue'
import { provideAppContext } from '@/composables/useAppContext'
import { useRoute } from 'vue-router'
import { smoothScroll } from '../utils/smoothScroll'
import HeroSection from '../components/HeroSection.vue'
const VideoSection = defineAsyncComponent(() => import('../components/sections/VideoSection.vue'))
const FeaturedTourLeaders = defineAsyncComponent(() => import('../components/FeaturedTourLeaders.vue'))
const MediaSliderSection = defineAsyncComponent(() => import('../components/MediaSliderSection.vue'))
const PackagesSection = defineAsyncComponent(() => import('../components/PackagesSection.vue'))
const PartnersSection = defineAsyncComponent(() => import('../components/PartnersSection.vue'))
const WhyChooseSection = defineAsyncComponent(() => import('../components/WhyChooseSection.vue'))
const BookingSection = defineAsyncComponent(() => import('../components/BookingSection.vue'))

// Provide app context for child components
provideAppContext()

const route = useRoute();
const bookingSectionRef = ref(null);

const handleBookingSectionLoaded = () => {
  if (route.query.scroll === 'booking') {
    nextTick(() => {
      smoothScroll('booking');
    });
  }
};
</script>