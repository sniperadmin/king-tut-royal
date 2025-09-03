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
        <PackageCard
          title="King Tut Royal VIP Package"
          price="€2,900"
          duration="5 Days / 4 Nights (Thursday - Monday)"
          image="/images/vip.jpeg"
          :highlights="[
            '5-star luxury accommodation',
            'Private museum access',
            'Nile dinner cruise',
            'Personal chauffeur',
            'Authentic perfume gift',
          ]"
          :isPopular="true"
          :onBookNow="scrollToBooking"
        />

        <PackageCard
          title="King Tut VIP One Day Package"
          price="€900"
          duration="Full Day Experience per person"
          image="/images/luxury.jpeg"
          :highlights="[
            'Private transport',
            'Museum tour',
            'Luxury lunch',
            'Perfume gift',
          ]"
          :onBookNow="scrollToBooking"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { smoothScroll } from '../utils/smoothScroll'
import PackageCard from './PackageCard.vue'

const scrollToBooking = () => {
  smoothScroll('booking')
}
</script>