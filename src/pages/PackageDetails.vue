<template>
  <AppLayout>
    <div class="container mx-auto p-4 pt-20">
      <h1 class="text-3xl font-bold mb-2 text-center text-foreground">{{ packageDetails?.title }}</h1>
      <p v-if="packageDetails?.price" class="text-xl text-center text-primary mb-6">{{ packageDetails?.price }} per person</p>
      
      <div v-if="packageDetails" class="space-y-8">
        <div v-if="videos?.length" class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Video</h3>
          <VideoPlayer :videos="videos" />
        </div>

        <div v-if="packageDetails.partners && packageDetails.partners.length > 0" class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Our Partners</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div v-for="partner in packageDetails.partners" :key="partner.name" class="flex flex-col items-center p-4 bg-muted rounded-lg shadow-sm">
              <img
                :src="partner.logo.large"
                :srcset="`${partner.logo.small} 640w, ${partner.logo.medium} 1024w, ${partner.logo.large} 1920w`"
                :sizes="`(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px`"
                :alt="partner.name"
                class="w-full h-auto object-contain mb-2"
              />
            </div>
          </div>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Overview</h3>
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.overview }}</p>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Accommodation</h3>
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.accommodation }}</p>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-4">Itinerary Highlights</h3>
          <div class="stepper">
            <div v-for="(day, index) in packageDetails.details.itinerary" :key="index" class="stepper-item">
              <div class="stepper-item-content">
                <div class="stepper-item-circle">{{ index + 1 }}</div>
                <div class="stepper-item-line"></div>
              </div>
              <div class="stepper-item-details">
                <h3 class="text-xl font-medium text-foreground">{{ day.day }}</h3>
                <ul class="list-disc pl-5 text-muted-foreground">
                  <li v-for="(item, itemIndex) in day.description" :key="itemIndex">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Exclusive Benefits</h3>
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ packageDetails.details.benefits }}</p>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Booking Information</h3>
          <div class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
            <p><strong>Company:</strong> {{ packageDetails.details.booking.companyName }}</p>
            <p><strong>Address:</strong> {{ packageDetails.details.booking.address }}</p>
            <p><strong>Website:</strong> <a :href="`https://${packageDetails.details.booking.website}`" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">{{ packageDetails.details.booking.website }}</a></p>
            <p><strong>WhatsApp:</strong> <a :href="`https://wa.me/${packageDetails.details.booking.whatsapp.replace(/\s/g, '')}`" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">{{ packageDetails.details.booking.whatsapp }}</a></p>
            <p><strong>Price:</strong> {{ packageDetails.details.booking.price }}</p>
          </div>
        </div>

        <div v-if="packageDetails.details.images && packageDetails.details.images.length > 0" class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Gallery</h3>
          <div class="relative mx-auto h-52 sm:h-60 md:h-80 overflow-hidden rounded-lg mb-4 w-full max-w-[900px] min-w-[200px] md:min-w-[320px] sm:min-w-[120px]">
            <img
              :src="packageDetails.details.images[currentImageIndex]"
              :srcset="`
                ${packageDetails.details.images[currentImageIndex].replace('.webp', '-412w.webp')} 412w,
                ${packageDetails.details.images[currentImageIndex].replace('.webp', '-853w.webp')} 853w
              `"
              sizes="(max-width: 768px) 412px, 853px"
              alt="Package Image"
              class="w-full h-full object-contain transition-opacity duration-300 max-h-52 sm:max-h-60 md:max-h-80"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              width="800"
              height="600"
            />
            <button @click="prevImage" class="absolute left-0 top-1/2 -translate-y-1/2 bg-card/50 text-foreground p-2 rounded-full ml-2">&lt;</button>
            <button @click="nextImage" class="absolute right-0 top-1/2 -translate-y-1/2 bg-card/50 text-foreground p-2 rounded-full mr-2">&gt;</button>
          </div>
          <div class="flex justify-center space-x-2 overflow-x-auto p-1 max-w-full">
            <img
              v-for="(img, idx) in packageDetails.details.images"
              :key="idx"
              :src="img"
              :srcset="`
                ${img.replace('.webp', '-412w.webp')} 412w,
                ${img.replace('.webp', '-853w.webp')} 853w
              `"
              sizes="(max-width: 768px) 412px, 853px"
              @click="setCurrentImage(idx)"
              :class="{'border-2 border-primary': idx === currentImageIndex}"
              class="w-20 h-16 object-contain rounded-lg cursor-pointer flex-shrink-0"
              width="80"
              height="64"
            />
          </div>
        </div>

        <div class="text-center mt-8 space-y-4">
          <button @click="bookNow" class="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300">
            Inquiry
          </button>
        </div>

      </div>
      <div v-else class="text-foreground text-center">
        <p>Package not found.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import VideoPlayer from '../components/ui/VideoPlayer.vue'
import { PACKAGES } from '../composables/packagesData'
import { smoothScroll } from '../utils/smoothScroll'

const route = useRoute()
const router = useRouter()
const packageDetails = ref(null)
const currentImageIndex = ref(0)

const videos = computed(() => packageDetails.value?.videos || []);

onMounted(() => {
  window.scrollTo(0, 0);
  const packageName = route.params.packageName;
  packageDetails.value = PACKAGES.find(pkg => pkg.title.toLowerCase().replace(/ /g, '-') === packageName);
  console.log('Package Details:', packageDetails.value);
});

const prevImage = () => {
  if (packageDetails.value && packageDetails.value.details.images) {
    currentImageIndex.value = (currentImageIndex.value - 1 + packageDetails.value.details.images.length) % packageDetails.value.details.images.length;
  }
};

const nextImage = () => {
  if (packageDetails.value && packageDetails.value.details.images) {
    currentImageIndex.value = (currentImageIndex.value + 1) % packageDetails.value.details.images.length;
  }
};

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index;
};

const bookNow = () => {
  console.log('packageDetails.value?.title:', packageDetails.value?.title);
  const packageKey = packageDetails.value?.title === 'King Tut Royal VIP' ? 'vip' : 'oneday';
  console.log('packageKey:', packageKey);
  router.push({ path: '/', query: { scroll: 'booking', packageId: packageKey } });
};
</script>

<style scoped>
.stepper {
  @apply relative;
}

.stepper-item {
  @apply flex items-start pb-6 last:pb-0;
}

.stepper-item-content {
  @apply flex flex-col items-center mr-4;
}

.stepper-item-circle {
  @apply w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold;
}

.stepper-item-line {
  @apply w-0.5 h-full bg-border mt-2;
}

.stepper-item-details {
  @apply flex-1;
}
</style>