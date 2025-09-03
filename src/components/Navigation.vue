<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-400/20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-2xl font-royal font-bold text-yellow-400">EGYPT IN STYLE</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <button @click="scrollToSection('home')" class="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0">Home</button>
          <button @click="scrollToSection('packages')" class="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0">Packages</button>
          <button @click="scrollToSection('why-us')" class="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0">Why Us</button>
          <button 
            @click="scrollToSection('booking')"
            class="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Book Now
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="text-white hover:text-yellow-400 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-yellow-400/20">
        <div class="flex flex-col space-y-4">
          <button @click="scrollToSection('home')" class="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Home</button>
          <button @click="scrollToSection('packages')" class="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Packages</button>
          <button @click="scrollToSection('experiences')" class="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Experiences</button>
          <button 
            @click="scrollToSection('booking')"
            class="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold w-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { smoothScroll } from '../utils/smoothScroll'

const isMenuOpen = ref(false)

const scrollToSection = (id: string) => {
  smoothScroll(id)
  isMenuOpen.value = false // Close mobile menu if open
}
</script>