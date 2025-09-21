<template>
  <footer class="bg-light-blue text-foreground py-8 flex flex-col justify-between min-h-[400px]" role="contentinfo" aria-label="Site Footer">
    <!-- TODO: Add Container only when needed -->
    <div class="mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold text-primary mb-4">Egypt in Style</h3>
          <p class="text-muted-foreground mb-4 leading-relaxed">
            Experience the timeless wonders of ancient Egypt with exclusive VIP access,
            luxury accommodations, and unforgettable cultural encounters. Heritage, luxury, and technology combined.
          </p>
          <nav aria-label="Social media" class="flex space-x-4">
            <a href="https://www.facebook.com/sherin.yousri/" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors" aria-label="Facebook" target="_blank" rel="noopener">
              <Facebook :size="24" />
            </a>
            <a href="https://www.instagram.com/sherinyosry/" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors" aria-label="Instagram" target="_blank" rel="noopener">
              <Instagram :size="24" />
            </a>
            <a href="https://www.youtube.com/channel/UC-TA4QGzBC1wEt_1uy9dqOg/videos" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors" aria-label="YouTube" target="_blank" rel="noopener">
              <Youtube :size="24" />
            </a>
          </nav>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-primary mb-4">Quick Links</h4>
          <ul class="space-y-2" aria-label="Quick Links">
            <li><router-link to="/packages" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent border-none p-0 transition-colors" aria-label="Packages section link">Packages</router-link></li>
            <li><router-link to="/partners" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent border-none p-0 transition-colors" aria-label="Partners section link">Partners</router-link></li>
            <li><button @click="scrollToSection('why-us')" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent border-none p-0 transition-colors" aria-label="Why Us section link">Why Us</button></li>
            <li><button @click="scrollToSection('newsletter')" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent border-none p-0 transition-colors" aria-label="Newsletter section link">Newsletter</button></li>
            <li><button @click="scrollToSection('tour-leaders')" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent border-none p-0 transition-colors" aria-label="Tour Leaders section link">Tour Leaders</button></li>
            <li><button @click="scrollToSection('booking')" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary bg-transparent border-none p-0 transition-colors" aria-label="Inquiry section link">Inquiry</button></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-primary mb-4">Contact Info</h4>
          <div class="space-y-3">
            <div>
              <p class="text-primary-foreground font-semibold">SY Consulting FZ-LLC</p>
            </div>
            <div class="flex items-start justify-center">
              <svg class="w-5 h-5 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-muted-foreground text-sm" tabindex="0">FOAM1604 Compass Building, Al Shohada Road<br />AL Hamra Industrial Zone-FZ<br />Ras Al Khaimah, United Arab Emirates</span>
            </div>
            <div class="flex items-center justify-center">
              <svg class="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.126"/>
              </svg>
              <span class="text-muted-foreground" tabindex="0" role="link" aria-label="Phone number">+201270389777</span>
            </div>
            <div class="flex items-center justify-center">
              <svg class="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <a href="https://www.sherinyosry.com" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors" target="_blank" rel="noopener" aria-label="Website">www.sherinyosry.com</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-muted-foreground text-sm mb-4 md:mb-0">
          © 2025 Egypt in Style. All rights reserved. | SY Consulting FZ-LLC
        </div>
        <div class="flex items-center mt-4 md:mt-0 gap-2 md:gap-6 w-full md:w-auto justify-between md:justify-end min-h-[44px]">
          <button
            @click="showPrivacyPolicy = true"
            class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors duration-200"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </button>
          <!-- <a href="#" class="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors duration-200" aria-label="Terms of Service">Terms of Service</a> -->
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
import { ref, nextTick } from 'vue';
import { Facebook, Instagram, Youtube } from 'lucide-vue-next';
import PrivacyPolicy from './PrivacyPolicy.vue';
import { smoothScroll } from '../utils/smoothScroll';
import { useRouter } from 'vue-router';

const showPrivacyPolicy = ref(false);

const router = useRouter();

const headerHeight = () => {
  const nav = typeof document !== 'undefined' ? document.querySelector('nav') : null;
  return nav ? (nav as HTMLElement).offsetHeight : 64;
};

const scrollToSection = (id: string) => {
  const pushToHomeWithQuery = (scrollId: string) => router.push({ path: '/', query: { scroll: scrollId } })
  if (router.currentRoute.value.path !== '/') {
    // When navigating from another route, include the scroll target in the query so the destination can handle lazy-mounted sections.
    if (id === 'booking') {
      pushToHomeWithQuery(id).then(() => {
        // booking handled via query on the home page; no immediate scroll from footer
      })
    } else {
      pushToHomeWithQuery(id).then(() => {
        nextTick(() => {
          smoothScroll(id, { offset: headerHeight() });
        });
      });
    }
  } else {
    nextTick(() => {
      smoothScroll(id, { offset: headerHeight() });
    });
  }
};
</script>

<script lang="ts">
export default {
  name: 'Footer'
}
</script>