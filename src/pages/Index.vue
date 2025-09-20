<template>
  <AppLayout>
    <section id="home">
        <HeroSection />
      </section>

      <section id="packages">
        <Suspense>
          <template #fallback>
            <PackagesSkeleton />
          </template>
          <PackagesSection />
        </Suspense>
      </section>

      <section id="partners">
        <section class="py-12">
          <Suspense>
            <template #fallback>
              <PartnersSkeleton />
            </template>
            <PartnersSection />
          </Suspense>
        </section>
        <Suspense>
          <template #fallback>
            <NewsletterSkeleton />
          </template>
          <NewsletterSection id="newsletter" />
        </Suspense>
        <Suspense>
          <template #fallback>
            <FeaturedTourLeadersSkeleton />
          </template>
          <FeaturedTourLeaders id="tour-leaders" />
        </Suspense>
      </section>

      <Suspense>
        <template #fallback>
          <MediaSliderSkeleton />
        </template>
        <MediaSliderSection />
      </Suspense>

      <Suspense>
        <template #fallback>
          <WhyChooseSkeleton />
        </template>
        <WhyChooseSection />
      </Suspense>

      <Suspense>
        <template #fallback>
          <BookingSkeleton />
        </template>
        <BookingSection ref="bookingSectionRef" @loaded="handleBookingSectionLoaded" :preselectedPackageId="route.query.packageId" />
      </Suspense>

      <Suspense>
        <VideoSection />
      </Suspense>

      <ContactSection />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue'
import { defineAsyncComponent, nextTick, ref, onMounted, watch } from 'vue'
import { provideAppContext } from '@/composables/useAppContext'
import { useRoute } from 'vue-router'
import { smoothScroll } from '../utils/smoothScroll'
import HeroSection from '../components/HeroSection.vue'
import PackagesSection from '../components/PackagesSection.vue'
import PartnersSection from '../components/PartnersSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import WhyChooseSection from '../components/WhyChooseSection.vue'
import BookingSection from '../components/BookingSection.vue'
import ContactSection from '../components/ContactSection.vue'
import PackagesSkeleton from '../components/skeletons/PackagesSkeleton.vue'
import PartnersSkeleton from '../components/skeletons/PartnersSkeleton.vue'
import MediaSliderSkeleton from '../components/skeletons/MediaSliderSkeleton.vue'
import WhyChooseSkeleton from '../components/skeletons/WhyChooseSkeleton.vue'
import BookingSkeleton from '../components/skeletons/BookingSkeleton.vue'
import NewsletterSkeleton from '../components/skeletons/NewsletterSkeleton.vue'
import FeaturedTourLeadersSkeleton from '../components/skeletons/FeaturedTourLeadersSkeleton.vue'

const VideoSection = defineAsyncComponent(() => import('../components/sections/VideoSection.vue'))
const FeaturedTourLeaders = defineAsyncComponent(() => import('../components/FeaturedTourLeaders.vue'))
const MediaSliderSection = defineAsyncComponent(() => import('../components/MediaSliderSection.vue'))

// Provide app context for child components
provideAppContext()

const route = useRoute();
const bookingSectionRef = ref(null);

// Handle scrolling for non-booking targets on mount and when query.scroll changes
onMounted(() => {
  const scrollTarget = route.query.scroll;
  if (scrollTarget && scrollTarget !== 'booking') {
    nextTick(() => {
      smoothScroll(String(scrollTarget));
    });
  }
});

watch(() => route.query.scroll, (newVal) => {
  if (!newVal) return;
  if (newVal === 'booking') return;
  nextTick(() => {
    smoothScroll(String(newVal));
  });
});

const handleBookingSectionLoaded = () => {
  if (route.query.scroll === 'booking') {
    nextTick(() => {
      smoothScroll('booking');
    });
  }
};
</script>