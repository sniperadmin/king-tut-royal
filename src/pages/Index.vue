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
          <!-- <NewsMediaSection id="news-media" /> -->
        </Suspense>
      </section>

      <Suspense>
        <template #fallback>
          <MediaSliderSkeleton />
        </template>
        <MediaSliderSection />
      </Suspense>

      <ArticleCard v-for="(post, index) in posts1" :key="index" :post="post" />

      <Suspense>
        <template #fallback>
          <WhyChooseSkeleton />
        </template>
        <WhyChooseSection />
      </Suspense>

      <Suspense>
        <template #fallback>
          <FeaturedTourLeadersSkeleton />
        </template>
        <FeaturedTourLeaders id="tour-leaders" />
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
// import NewsMediaSection from '../components/NewsMediaSection.vue'
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
import ArticleCard from '../components/ArticleCard.vue'
const VideoSection = defineAsyncComponent(() => import('../components/sections/VideoSection.vue'))
const FeaturedTourLeaders = defineAsyncComponent(() => import('../components/FeaturedTourLeaders.vue'))
const MediaSliderSection = defineAsyncComponent(() => import('../components/MediaSliderSection.vue'))

// Provide app context for child components
provideAppContext()

const route = useRoute();
const bookingSectionRef = ref(null);

const posts1 = ref([
   {
    title: "Sherin Yosry Consulting FZ-LLC: Crafting Unique Luxury Experiences with the King Tut Royal Package",
    excerpt: "In the heart of Egypt, where the majestic Pyramids of Giza stand watch over the land, a monumental cultural event is unfolding. The Grand Egyptian Museum (GEM), set to open its doors on November 1, 2025, will forever change the global tourism landscape.",
    image: "https://framerusercontent.com/images/mYzqsDBWUVLpvmQ534wIe1N58to.png?width=1200&height=600",
    link: "/media/sherin-yosry-consulting-fz-llc-crafting-unique-luxury-experiences-with-the-king-tut-royal-package",
    internal: false,
  }
])

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