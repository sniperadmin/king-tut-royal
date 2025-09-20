<template>
  <AppLayout>
    <div class="container mx-auto p-4 pt-20">
      <h1 class="text-3xl font-bold mb-2 text-center text-foreground">{{ packageItem?.title }}</h1>
      <p v-if="packageItem?.price" class="text-xl text-center text-primary mb-6">{{ packageItem?.price }} per person</p>
      
      <div v-if="loading" class="text-center text-foreground text-lg">Loading package details...</div>

      <div v-else-if="packageItem" class="space-y-8">
        <div v-if="videos?.length" class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Video</h3>
          <VideoPlayer :videos="videos" />
        </div>

        <div v-if="packageItem.partners && packageItem.partners.length > 0" class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Our Partners</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div v-for="partner in packageItem.partners" :key="partner.name" class="flex flex-col items-center p-4 bg-muted rounded-lg shadow-sm">
              <img
                :src="(partner.logo?.large) || '/images/default-logo.webp'"
                :srcset="`${partner.logo?.small || '/images/default-logo.webp'} 640w, ${partner.logo?.medium || '/images/default-logo.webp'} 1024w, ${partner.logo?.large || '/images/default-logo.webp'} 1920w`"
                sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024w, 1920px"
                :alt="partner.name || 'Partner Logo'"
                class="w-full h-auto object-contain mb-2"
              />
            </div>
          </div>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Overview</h3>
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ packageItem.details.overview }}</p>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Accommodation</h3>
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ packageItem.details.accommodation }}</p>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-4">Itinerary Highlights</h3>
          <div class="stepper">
            <div v-for="(day, index) in packageItem.details.itinerary" :key="index" class="stepper-item">
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
          <p class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{{ packageItem.details.benefits }}</p>
        </div>

        <div class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Booking Information</h3>
          <div class="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
            <p><strong>Company:</strong> {{ packageItem.details.booking.companyName }}</p>
            <p><strong>Address:</strong> {{ packageItem.details.booking.address }}</p>
            <p><strong>Website:</strong> <a :href="`https://${packageItem.details.booking.website}`" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">{{ packageItem.details.booking.website }}</a></p>
            <p><strong>WhatsApp:</strong> <a :href="`https://wa.me/${packageItem.details.booking.whatsapp.replace(/\s/g, '')}`" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">{{ packageItem.details.booking.whatsapp }}</a></p>
            <p><strong>Price:</strong> {{ packageItem.details.booking.price }}</p>
          </div>
        </div>

        <div v-if="packageItem.details.images && packageItem.details.images.length > 0" class="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 class="text-2xl font-semibold text-foreground mb-3">Gallery</h3>
          <div class="relative mx-auto h-52 sm:h-60 md:h-80 overflow-hidden rounded-lg mb-4 w-full max-w-[900px] min-w-[200px] md:min-w-[320px] sm:min-w-[120px]">
            <img
              :src="getImageUrl(packageItem.details.images[currentImageIndex])"
              :srcset="`
                ${String(getImageUrl(packageItem.details.images[currentImageIndex])).replace('.webp', '-412w.webp')} 412w,
                ${String(getImageUrl(packageItem.details.images[currentImageIndex])).replace('.webp', '-853w.webp')} 853w
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
              v-for="(img, idx) in packageItem.details.images"
              :key="idx"
              :src="getImageUrl(img)"
              :srcset="`
                ${String(getImageUrl(img)).replace('.webp', '-412w.webp')} 412w,
                ${String(getImageUrl(img)).replace('.webp', '-853w.webp')} 853w
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
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import VideoPlayer from '../components/ui/VideoPlayer.vue'
import { supabase } from '../lib/supabase'
import { PackageData } from '../types'
import { KING_TUT_VIP_ONE_DAY, KING_TUT_ROYAL_VIP } from '@/constants/packageIds';

const route = useRoute()
const router = useRouter()
const packageItem = ref<PackageData | null>(null)
const currentImageIndex = ref(0)
const loading = ref(true) // Add loading state

const videos = computed(() => packageItem.value?.videos || [])

const getImageUrl = (img: any): string => {
  if (!img) return '/images/default.webp'
  if (typeof img === 'string') return img
  if (typeof img === 'object') {
    return img.url ?? img.src ?? img.large ?? img.path ?? img.key ?? '/images/default.webp'
  }
  return String(img)
}

onMounted(async () => {
  window.scrollTo(0, 0)
  loading.value = true // Set loading to true before fetching data

  // Accept either an id or a slug/title param. Try id first, then fall back to slug/title matching.
  const param = (route.params.id ?? route.params.title) as string | undefined
  if (!param) {
    loading.value = false // Set loading to false if no param
    return
  }

  // Try fetching directly by id first
  try {
    const { data: byIdData, error: byIdError } = await supabase
      .from('packages_view')
      .select('package, sort_rank')
      .eq('id', param)
      .single()

    if (!byIdError && byIdData?.package) {
      packageItem.value = byIdData.package
      loading.value = false // Set loading to false after successful fetch
      return
    }
  } catch (e) {
    console.error('Error fetching package by id:', e)
  }

  // Fallback: fetch all packages and match by normalized title or slug
  const { data, error } = await supabase
    .from('packages_view')
    .select('package, sort_rank')
    .order('sort_rank', { ascending: true })
  if (data) { loading.value = false }
  if (error) {
    console.error('Error fetching packages:', error)
    loading.value = false // Set loading to false on error
    return
  }

  const packages = data.map((row: { package: PackageData }) => row.package)
  const routeParam = (param || '').toLowerCase()
  const normalizedRoute = routeParam.replace(/-/g, ' ').trim()
  const slugify = (s: string) => s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .trim()

  packageItem.value = packages.find((p) => {
    if (!p?.title) return false
    const titleLower = p.title.toLowerCase()
    return titleLower === normalizedRoute || slugify(p.title) === routeParam
  }) ?? null

  console.log('Package Details:', packageItem.value)
})

const prevImage = () => {
  if (packageItem.value?.details?.images?.length) {
    const len = packageItem.value.details.images.length
    currentImageIndex.value = (currentImageIndex.value - 1 + len) % len
  }
}

const nextImage = () => {
  if (packageItem.value?.details?.images?.length) {
    const len = packageItem.value.details.images.length
    currentImageIndex.value = (currentImageIndex.value + 1) % len
  }
}

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index
}

const bookNow = () => {
  const title = packageItem.value?.slug ?? ''
  const packageKey = title === KING_TUT_ROYAL_VIP ? KING_TUT_ROYAL_VIP : KING_TUT_VIP_ONE_DAY
  router.push({ path: '/', query: { scroll: 'booking', packageId: packageKey } })
}
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