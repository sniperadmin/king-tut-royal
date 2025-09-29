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

      <ItineraryPDFSection />

      <ContactSection />

      <Suspense>
        <template #fallback>
          <BookingSkeleton />
        </template>
        <BookingSection ref="bookingSectionRef" @loaded="handleBookingSectionLoaded" :preselectedPackageId="route.query?.packageId" />
      </Suspense>

      <!-- Luxury Announcement Section -->
      <LuxuryAnnouncementSection />

      <section id="partners">
        <section class="py-12">
          <Suspense>
            <template #fallback>
              <PartnersSkeleton />
            </template>
            <PartnersSection />
          </Suspense>
        </section>
      </section>

      <!-- https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/new/hero-air-cairo.m3u8 -->
      <VideoPlayer :videos="[{ id: 3, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/new/hero-air-cairo.m3u8', title: 'hotels', muted: true }]" />

      <BecomeAgentSection />

      <Suspense>
        <VideoSection />
      </Suspense>

      <Suspense>
        <template #fallback>
          <WhyChooseSkeleton />
        </template>
        <WhyChooseSection />
      </Suspense>

      <section class="container">
        <ArticleCard v-for="(post, index) in posts1" :key="index" :post="post" />
      </section>

      <Suspense>
        <template #fallback>
          <FeaturedTourLeadersSkeleton />
        </template>
        <FeaturedTourLeaders id="tour-leaders" />
      </Suspense>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSeo, seoConfigs } from '@/composables/useSeo'
import { useStructuredData } from '@/composables/useStructuredData'
import AppLayout from '@/components/AppLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import PackagesSection from '@/components/sections/PackagesSection.vue'
import WhyChooseSection from '@/components/sections/WhyChooseSection.vue'
import FeaturedTourLeaders from '@/components/sections/FeaturedTourLeaders.vue'
import PartnersSection from '@/components/sections/PartnersSection.vue'
import MediaSliderSection from '@/components/sections/MediaSliderSection.vue'
// import NewsMediaSection from '@/components/sections/NewsMediaSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import BookingSection from '@/components/sections/BookingSection.vue'
import LuxuryAnnouncementSection from '@/components/sections/LuxuryAnnouncementSection.vue'
import VideoPlayer from '@/components/ui/VideoPlayer.vue'
import BecomeAgentSection from '@/components/sections/BecomeAgentSection.vue'
import ArticleCard from '@/components/ui/ArticleCard.vue'
import ItineraryPDFSection from '@/components/sections/ItineraryPDFSection.vue'
import VideoSection from '@/components/sections/VideoSection.vue'
// SEO Configuration
useSeo(seoConfigs.home)

// Router
const route = useRoute()

const posts1 = ref([
   {
    title: "Sherin Yosry Consulting FZ-LLC: Crafting Unique Luxury Experiences with the King Tut Royal Package",
    excerpt: "In the heart of Egypt, where the majestic Pyramids of Giza stand watch over the land, a monumental cultural event is unfolding. The Grand Egyptian Museum (GEM), set to open its doors on November 1, 2025, will forever change the global tourism landscape.",
    image: "https://framerusercontent.com/images/mYzqsDBWUVLpvmQ534wIe1N58to.png?width=1200&height=600",
    link: "https://usanews.com/newsroom/sherin-yosry-consulting-fz-llc-crafting-unique-luxury-experiences-with-the-king-tut-royal-package",
    internal: false,
  }
])


// Structured Data
const { addOrganizationSchema, addWebsiteSchema } = useStructuredData()

onMounted(() => {
  // Add organization and website structured data
  addOrganizationSchema()
  addWebsiteSchema()
})
</script>