<template>
  <section id="packages" class="py-20 bg-black">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">Choose Your Royal Experience</h2>
        <p class="text-xl text-amber-400 max-w-2xl mx-auto">
          Exclusive packages designed for the discerning traveler
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Royal VIP Package -->
        <div class="bg-gray-900 border border-amber-400 rounded-lg p-8">
          <h3 class="text-2xl font-bold text-amber-400 mb-4">King Tut Royal VIP</h3>
          <p class="text-4xl font-bold text-white mb-4">€2,900</p>
          <p class="text-gray-300 mb-6">5 Days / 4 Nights per person</p>
          <ul class="text-gray-300 space-y-2 mb-8">
            <li>• 5-star luxury accommodation</li>
            <li>• Private museum access</li>
            <li>• Nile dinner cruise</li>
            <li>• Personal chauffeur</li>
            <li>• Authentic perfume gift</li>
          </ul>
          <button 
            @click="scrollToBooking"
            class="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black py-3 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-700 transition-all"
          >
            Book Royal VIP
          </button>
        </div>
        
        <!-- One Day Package -->
        <div class="bg-gray-900 border border-gray-600 rounded-lg p-8">
          <h3 class="text-2xl font-bold text-white mb-4">King Tut VIP One Day</h3>
          <p class="text-4xl font-bold text-white mb-4">€900</p>
          <p class="text-gray-300 mb-6">Full Day Experience per person</p>
          <ul class="text-gray-300 space-y-2 mb-8">
            <li>• Private transport</li>
            <li>• Museum tour</li>
            <li>• Luxury lunch</li>
            <li>• Perfume gift</li>
            <li>• 4-6 guests only</li>
          </ul>
          <button 
            @click="scrollToBooking"
            class="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
          >
            Book One Day
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'

const scrollToBooking = () => {
  smoothScroll('booking')
}
</script>