<template>
  <div class="min-h-screen bg-black text-white">
    <Navigation />
    <main>
      <section id="home">
        <HeroSection />
      </section>
      <MediaSliderSection />
      <section id="packages">
        <PackagesSection />
      </section>
      <WhyChooseSection />
      <BookingSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from './Navigation.vue'
import HeroSection from './HeroSection.vue'
import MediaSliderSection from './MediaSliderSection.vue'
import PackagesSection from './PackagesSection.vue'
import WhyChooseSection from './WhyChooseSection.vue'
import BookingSection from './BookingSection.vue'
import Footer from './Footer.vue'
</script>