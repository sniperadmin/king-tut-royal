<template>
  <!-- style="background-image: url('/path/to/your/background-image.jpg');" -->
  <section class="bg-center py-20 text-white text-center bg-black contact-section-bg flex items-center justify-center min-h-screen">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold mb-4">More information</h2>
      <p class="text-lg mb-8">Send us a WhatsApp message:</p>
      <a href="https://wa.me/201270389777" class="bg-primary text-primary-foreground px-8 py-4 rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300 text-xl font-semibold mb-4 inline-block">Send us a message</a>
    </div>
  </section>
</template>

<style scoped>
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
    min-height: 100vh; /* Ensure it takes full viewport height on mobile */
    width: 100%;
  }
}
</style>

<script setup lang="ts">
// No script needed for this simple component
</script>