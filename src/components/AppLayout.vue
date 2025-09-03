<template>
  <div class="min-h-screen bg-black text-white">
    <Navigation />
    <main>
      <!-- Dynamic content renderer -->
      <DynamicRenderer 
        v-if="useDynamicContent" 
        page-name="homepage" 
      />
      
      <!-- Fallback to static content if dynamic content is not available -->
      <template v-else>
        <section id="home">
          <HeroSection />
        </section>
        <MediaSliderSection />
        <section id="packages">
          <PackagesSection />
        </section>
        <WhyChooseSection />
        <BookingSection />
      </template>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navigation from './Navigation.vue'
import HeroSection from './HeroSection.vue'
import MediaSliderSection from './MediaSliderSection.vue'
import PackagesSection from './PackagesSection.vue'
import WhyChooseSection from './WhyChooseSection.vue'
import BookingSection from './BookingSection.vue'
import Footer from './Footer.vue'
import DynamicRenderer from './DynamicRenderer.vue'

// Check if we should use dynamic content or fallback to static
const useDynamicContent = ref(false)

onMounted(async () => {
  try {
    // Check if dynamic content is available by trying to fetch the homepage layout
    const response = await fetch(`https://mhwjdkzpnhzmduolfgmy.supabase.co/functions/v1/get-page-layout?page=homepage`, {
      headers: {
        'Authorization': `Bearer sb_publishable_LGovYeBhQtpuj3ixRv9DBw_CfP3iT4X`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      // Use dynamic content if we have sections configured
      if (result.data && result.data.sections && result.data.sections.length > 0) {
        useDynamicContent.value = true
      }
    }
  } catch (error) {
    console.log('Dynamic content not available, using static content:', error)
    // Keep useDynamicContent as false to use static content
  }
})
</script>