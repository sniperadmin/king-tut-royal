<template>
  <section 
    class="relative w-full py-24 mt-10 bg-black text-center cursor-pointer transition-all duration-300 hover:bg-gray-900 group"
    @click="navigateToPackages"
  >
    <!-- Top decorative star -->
    <div class="flex justify-center mb-8">
      <svg 
        class="w-8 h-8 text-gold transition-transform duration-300 group-hover:scale-110" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
      </svg>
    </div>

    <!-- Main heading -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-light text-gold mb-6 tracking-wider leading-tight">
        A NEW ERA OF<br>
        LUXURY TRAVEL
      </h2>
      
      <p class="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase">
        IS COMING...
      </p>
    </div>

    <!-- Bottom decorative star -->
    <div class="flex justify-center mt-8">
      <svg 
        class="w-8 h-8 text-gold transition-transform duration-300 group-hover:scale-110" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
      </svg>
    </div>

    <!-- Subtle hover indicator -->
    <div class="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-colors duration-300 pointer-events-none"></div>
    
    <!-- Click hint -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p class="text-gold/60 text-sm font-light tracking-wide">Click to explore packages</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToPackages = () => {
  router.push('/packages')
}
</script>

<style scoped>
.text-gold {
  color: #C8A24A;
}
</style>