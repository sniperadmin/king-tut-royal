<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold text-amber-400 mb-4">Egypt in Style</h3>
          <p class="text-gray-300 mb-4 leading-relaxed">
            Experience the timeless wonders of ancient Egypt with exclusive VIP access,
            luxury accommodations, and unforgettable cultural encounters. Heritage, luxury, and technology combined.
          </p>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/sherin.yousri/" class="text-gray-400 hover:text-amber-400 transition-colors">
              <Facebook :size="24" />
            </a>
            <a href="https://www.instagram.com/sherinyosry/" class="text-gray-400 hover:text-amber-400 transition-colors">
              <Instagram :size="24" />
            </a>
            <a href="https://www.youtube.com/channel/UC-TA4QGzBC1wEt_1uy9dqOg/videos" class="text-gray-400 hover:text-amber-400 transition-colors">
              <Youtube :size="24" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-amber-400 mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><button @click="smoothScroll('packages')" class="text-gray-300 hover:text-amber-400 transition-colors bg-transparent border-none p-0">Packages</button></li>
            <li><button @click="smoothScroll('why-us')" class="text-gray-300 hover:text-amber-400 transition-colors bg-transparent border-none p-0">Why Us</button></li>
            <li><button @click="smoothScroll('booking')" class="text-gray-300 hover:text-amber-400 transition-colors bg-transparent border-none p-0">Book Now</button></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-amber-400 mb-4">Contact Info</h4>
          <div class="space-y-3">
            <div>
              <p class="text-amber-300 font-semibold">SY Consulting FZ-LLC</p>
            </div>
            <div class="flex items-start">
              <svg class="w-5 h-5 text-amber-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-gray-300 text-sm">FOAM1604 Compass Building, Al Shohada Road<br />AL Hamra Industrial Zone-FZ<br />Ras Al Khaimah, United Arab Emirates</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-amber-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.126"/>
              </svg>
              <span class="text-gray-300">+971 58 592 3054</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span class="text-gray-300">www.sherinyosry.com</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-400 text-sm mb-4 md:mb-0">
          © 2025 Egypt in Style. All rights reserved. | Sherin Yosry
        </div>
        <div class="flex space-x-6 text-sm">
          <button
            @click="showPrivacyPolicy = true"
            class="text-gray-400 hover:text-amber-400 transition-colors duration-200"
          >
            Privacy Policy
          </button>
          <a href="#" class="text-gray-400 hover:text-amber-400 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </div>

    <PrivacyPolicy
      :isOpen="showPrivacyPolicy"
      @close="showPrivacyPolicy = false"
    />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Facebook, Instagram, Youtube } from 'lucide-vue-next';
import PrivacyPolicy from './PrivacyPolicy.vue';
import { smoothScroll } from '../utils/smoothScroll';

const showPrivacyPolicy = ref(false);
</script>