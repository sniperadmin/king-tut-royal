<template>
  <v-container fluid class="pa-0">
    <LazyUiVideoPlayer :videos="[{ url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/hero/king-hero.m3u8' }]" aspect-ratio="unset" title="King Tut Montage" class="hero-video" />

    <SectionsPackagesSection />

    <SectionsPartnersSection />

    <v-container fluid>
      <!-- Carousel -->
      <v-row justify="center" class="mb-4">
        <v-col cols="12" md="8" class="text-center">
            <!-- <h4 class="text-h4 text-center font-weight-bold text-primary">Choose Your Royal Experience</h4> -->
            <p class="text-subtitle-1 text-center text-secondary">Immerse yourself in luxury Egyptian experiences</p>
        </v-col>
      </v-row>

      <v-carousel
        height="280"
        cycle
        class="mb-6"
        hide-delimiters
      >
        <v-carousel-item v-for="image in mediaItems" :key="image.id">
          <v-img
            :src="image.src"
            :srcset="`${image.src_412w} 412w, ${image.src_853w} 853w, ${image.src}`"
            :alt="image.description"
            contain
          />
        </v-carousel-item>
      </v-carousel>
      <!-- ./Carousel -->
    </v-container>

    <!-- New Card Section -->
    <v-container fluid class="bg-blue-grey-lighten-5">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card link :href="post1.link" target="_blank" class="text-center">
            <v-img :src="post1.image" height="200px"></v-img>
            <v-card-title class="text-wrap">{{ post1.title }}</v-card-title>
            <v-card-subtitle class="text-wrap">{{ post1.excerpt }}</v-card-subtitle>
            <v-card-actions class="justify-center">
              <v-btn color="primary" :href="post1.link" target="_blank">Read More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- End of New Card Section -->

    <!-- Why Us Section -->
    <v-container fluid class="why-us-section py-12">
      <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="text-h4 text-primary font-weight-bold mb-2">Why Choose King Tut?</h2>
          <p class="text-subtitle-1 text-secondary">Discover what sets us apart for your perfect Egyptian adventure</p>
        </v-col>
      </v-row>
      <v-row justify="center" align="stretch" class="why-us-features">
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <v-card flat class="pa-6 text-center" elevation="2">
            <v-icon color="primary" size="40">mdi-crown</v-icon>
            <div class="text-h6 font-weight-bold mt-3 mb-1">Authentic Royal Experiences</div>
            <div class="text-body-2">Curated luxury packages that envelop you in Egypt\'s rich culture with exclusive access and premium services.</div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <v-card flat class="pa-6 text-center" elevation="2">
            <v-icon color="primary" size="40">mdi-shield-star</v-icon>
            <div class="text-h6 font-weight-bold mt-3 mb-1">Trusted Local Expertise</div>
            <div class="text-body-2">Guided by passionate experts and dedicated partners for safe, seamless, and unforgettable journeys.</div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="pa-6 text-center" elevation="2">
            <v-icon color="primary" size="40">mdi-diamond-stone</v-icon>
            <div class="text-h6 font-weight-bold mt-3 mb-1">Unrivaled Luxury & Service</div>
            <div class="text-body-2">Enjoy 5-star accommodations, private events, and attention to every detail as we transform your dream trip into reality.</div>
          </v-card>

        </v-col>
      </v-row>

      <v-row class="text-center justify-center my-7">
        <v-btn color="primary" variant="outlined" @click="$router.push('/why-us')">
          View More
        </v-btn>
      </v-row>
    </v-container>
    <!-- ./Why Us Section -->

    <SectionsTourLeadersSection />

    <v-container fluid class="bg-blue-grey-lighten-5">
       <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8" class="text-center">
          <p class="text-subtitle-1 text-secondary">Step into timeless elegance with King's Tut Royal Luxury Experiences.</p>
        </v-col>
       </v-row>

       <UiVideoPlayer :videos="[{ id: 4, url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/king/king.m3u8', title: 'King Tut Package', muted: true },]" />
    </v-container>

    <v-container fluid>
      <section class="bg-center py-10 text-white text-center bg-black contact-section-bg flex items-center justify-center min-h-screen">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-2xl font-bold mb-4">More information</h2>
          <p class="text-lg mb-8">Send us a WhatsApp message:</p>
          <v-btn
            href="https://wa.me/201270389777"
            color="primary"
            size="large"
            class="mb-4"
            prepend-icon="mdi-whatsapp"
            target="_blank"
          >
            Click here
          </v-btn>
        </div>
      </section>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const mediaItems = [
  {
    id: 0,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/bus-853w.webp",
    title: "Bus Experience",
    description: "Luxury transportation"
  },
  {
    id: 1,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/perfume.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/perfume-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/perfume-853w.webp",
    title: "Perfume Experience",
    description: "Unforgettable perfume package"
  },
  {
    id: 2,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-light.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-light-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-light-853w.webp",
    title: "Pyramid",
    description: "Unforgettable pyramid experience"
  },
  {
    id: 3,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ticket.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ticket-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ticket-853w.webp",
    title: "Core Services",
    description: "Luxury accommodations and premium experiences"
  },
  {
    id: 4,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/tut.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/tut-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/tut-853w.webp",
    title: "King Tut Monuments",
    description: "Unforgettable King Tut experience"
  },
  {
    id: 5,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/CROHA%20Exterior%20ByDay-853w.webp",
    title: "CROHA",
    description: "Unforgettable CROHA experience"
  },
  {
    id: 6,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/ICSemiramis%20lobby-853w.webp",
    title: "ICSemiramis",
    description: "Unforgettable ICSemiramis experience"
  },
  {
    id: 7,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9166-853w.webp",
    title: "ICSemiramis",
    description: "ICSemiramis rooms experience"
  },
  {
    id: 8,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/Intercontinental%20rooms9196-853w.webp",
    title: "ICSemiramis",
    description: "ICSemiramis rooms experience"
  },
  {
    id: 9,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-out-853w.webp",
    title: "Museum",
    description: "Unforgettable museum experience"
  },
  {
    id: 10,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/museum-in-853w.webp",
    title: "Museum",
    description: "Unforgettable museum experience"
  },
  {
    id: 11,
    src: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car.webp",
    src_412w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car-412w.webp",
    src_853w: "https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/car-853w.webp",
    title: "Car",
    description: "Unforgettable museum experience"
  },
];

const post1 = ref({
    title: "Sherin Yosry Consulting FZ-LLC: Crafting Unique Luxury Experiences with the King Tut Royal Package",
    excerpt: "In the heart of Egypt, where the majestic Pyramids of Giza stand watch over the land, a monumental cultural event is unfolding. The Grand Egyptian Museum (GEM), set to open its doors on November 1, 2025, will forever change the global tourism landscape.",
    image: "https://framerusercontent.com/images/mYzqsDBWUVLpvmQ534wIe1N58to.png?width=1200&height=600",
    link: "https://usanews.com/newsroom/sherin-yosry-consulting-fz-llc-crafting-unique-luxury-experiences-with-the-king-tut-royal-package",
    internal: false,
  })
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 700px;
  overflow: hidden;
}
.why-us-section {
  background: #f5f7fa;
}
.why-us-features .v-card {
  transition: box-shadow 0.3s, transform 0.3s;
}
.why-us-features .v-card:hover {
  box-shadow: 0 8px 24px rgba(40, 40, 80, 0.10);
  transform: translateY(-4px) scale(1.03);
}

.contact-section-bg {
  background-repeat: no-repeat;
  background-size: contain; /* Default for tablet and desktop */
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
    url('https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/media-slider/pyramid-night.webp'); */
}

/* For mobile screens */
@media (max-width: 767px) {
  .contact-section-bg {
    background-size: contain;
    min-height: 100%;
    /* width: 100%; */
  }
}
</style>
