<template>
  <AppLayout>
    <div class="mx-auto pt-20">
      <button
          type="button"
          @click="router.push('/')"
          class="rounded-sm border border-brownish hover:bg-brownish hover:text-background text-brownish py-2 px-4 font-semibold tracking-wider transition-all duration-300 uppercase text-sm w-full md:w-auto mb-4 md:mb-0"
        >
          Back to Home
      </button>
      <h1 class="text-3xl font-bold mb-2 text-center text-foreground">Book Your Luxury Experience</h1>
      <p class="text-xl text-center text-primary mb-6">Secure your exclusive King Tut Royal VIP package</p>
      
      <Suspense>
        <template #fallback>
          <BookingSkeleton />
        </template>
        <BookingSection ref="bookingSectionRef" @loaded="handleBookingSectionLoaded" :preselectedPackageId="route.query.packageId" />
      </Suspense>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import BookingSection from '@/components/BookingSection.vue'
import BookingSkeleton from '@/components/skeletons/BookingSkeleton.vue'
import { smoothScroll } from '@/utils/smoothScroll'

const route = useRoute()
const router = useRouter()
const bookingSectionRef = ref(null)

onMounted(() => {
  window.scrollTo(0, 0)
  
  if (route.query.scroll === 'booking') {
    nextTick(() => {
      smoothScroll('booking')
    })
  }
})

const handleBookingSectionLoaded = () => {
  if (route.query.scroll === 'booking') {
    nextTick(() => {
      smoothScroll('booking')
    })
  }
}
</script>