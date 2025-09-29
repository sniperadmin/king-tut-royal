<template>
  <AppLayout>
    <div class="p-4 mx-auto pt-20">
      <button
          type="button"
          @click="router.push('/packages')"
          class="rounded-sm border border-brownish hover:bg-brownish hover:text-background text-brownish py-2 px-4 font-semibold tracking-wider transition-all duration-300 uppercase text-sm w-full md:w-auto mb-4 md:mb-0"
        >
          Back to Packages
      </button>
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
          <div v-for="(day, index) in packageItem.details.itinerary" :key="index" class="mb-4 last:mb-0">
            <h3 class="text-xl font-bold text-foreground text-left">{{ day.day }}</h3>
            <ul class="fancy-list text-lg text-muted-foreground text-left">
              <li v-for="(item, itemIndex) in day.description" :key="itemIndex">
                <Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />
                <span v-html="item"></span>
              </li>
            </ul>
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
          <button @click="router.push('/booking')" class="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300">
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
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { useStructuredData } from '@/composables/useStructuredData'
import AppLayout from '@/components/AppLayout.vue'
import VideoPlayer from '../components/ui/VideoPlayer.vue'
import { supabase } from '../lib/supabase'
import { PackageData } from '../types'
import { KING_TUT_VIP_ONE_DAY, KING_TUT_ROYAL_VIP } from '@/constants/packageIds'
import { Sparkles } from 'lucide-vue-next';

const route = useRoute()
const router = useRouter()
const packageItem = ref<PackageData | null>(null)
const currentImageIndex = ref(0)
const loading = ref(true) // Add loading state

const videos = computed(() => packageItem.value?.videos || [])

// SEO and Structured Data - Initialize safely
const { updateSeo } = useSeo()
const { addTravelPackageSchema, addBreadcrumbSchema } = useStructuredData()

console.log('SEO Composables initialized:', { updateSeo: !!updateSeo, addTravelPackageSchema: !!addTravelPackageSchema, addBreadcrumbSchema: !!addBreadcrumbSchema })

// Update SEO when package data changes - with proper safeguards
watch(packageItem, (newPackage) => {
  console.log('SEO Watch triggered:', { newPackage, loading: loading.value })
  if (newPackage && !loading.value) {
    console.log('Updating SEO for package:', newPackage.title)
    try {
      // Only update SEO if we have valid package data
      const title = newPackage.title || 'Luxury Egypt Travel Package'
      const description = newPackage.details?.overview?.substring(0, 160) || 
        `Experience the luxury of ${title} with exclusive amenities and personalized service.`
      const imageUrl = newPackage.images?.[0] ? getImageUrl(newPackage.images[0]) : '/og.webp'
      
      console.log('SEO Data:', { title, description, imageUrl })
      
      updateSeo({
        title: `${title} | Luxury Egypt Travel Package`,
        description: description,
        keywords: `${title}, luxury Egypt tour, premium travel package, exclusive Egypt experience`,
        image: imageUrl,
        type: 'article'
      })

      // Add travel package structured data with safe property access
      const packageImages = newPackage.images?.map(img => getImageUrl(img)) || [imageUrl]
      const priceValue = newPackage.price ? newPackage.price.replace(/[^0-9]/g, '') : '0'
      
      addTravelPackageSchema({
        name: title,
        description: newPackage.details?.overview || `Luxury travel package: ${title}`,
        image: packageImages,
        offers: {
          price: priceValue,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        duration: newPackage.duration || '1 day',
        location: [{
          '@type': 'Place',
          name: 'Egypt',
          address: 'Egypt'
        }]
      })

      // Add breadcrumb
      addBreadcrumbSchema([
        { name: 'Home', url: 'https://kingtutroyal.com/' },
        { name: 'Packages', url: 'https://kingtutroyal.com/packages' },
        { name: title, url: `https://kingtutroyal.com${route.path}` }
      ])
      
      console.log('SEO updated successfully')
    } catch (error) {
      console.error('Error updating SEO:', error)
    }
  }
})

const getImageUrl = (img: any): string => {
  if (!img) return '/images/default.webp'
  if (typeof img === 'string') return img
  if (typeof img === 'object') {
    return img.url ?? img.src ?? img.large ?? img.path ?? img.key ?? '/images/default.webp'
  }
  return String(img)
}

onMounted(async () => {
  console.log('PackageDetails onMounted started')
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

  // Always set loading to false after all fetch attempts
  loading.value = false
  console.log('Package Details:', packageItem.value)
  
  // Direct SEO update after package is loaded
  if (packageItem.value) {
    console.log('Direct SEO update after onMounted')
    try {
      const title = packageItem.value.title || 'Luxury Egypt Travel Package'
      const description = packageItem.value.details?.overview?.substring(0, 160) || 
        `Experience the luxury of ${title} with exclusive amenities and personalized service.`
      const imageUrl = packageItem.value.images?.[0] ? getImageUrl(packageItem.value.images[0]) : '/og.webp'
      
      console.log('Direct SEO Data:', { title, description, imageUrl })
      
      updateSeo({
        title: `${title} | Luxury Egypt Travel Package`,
        description: description,
        keywords: `${title}, luxury Egypt tour, premium travel package, exclusive Egypt experience`,
        image: imageUrl,
        type: 'article'
      })
      
      console.log('Direct SEO update completed')
    } catch (error) {
      console.error('Error in direct SEO update:', error)
    }
  }
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
</script>
<style scoped>
.fancy-list li {
  @apply flex items-start mb-2;
}

.fancy-list li .lucide {
  @apply flex-shrink-0;
}
</style>
