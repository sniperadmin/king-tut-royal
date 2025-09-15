<template>
  <section class="py-20 bg-light-gray text-foreground">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-4xl font-bold mb-12">Our Official Partners</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="partner in partners" :key="partner.id">
          <router-link
            v-if="!partner.comingSoon"
            :to="{ name: 'PartnerDetails', params: { id: partner.id } }"
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary"
          >
            <img v-if="partner.logo" :src="partner.logo" :alt="partner.name + ' Logo'" class="max-h-28 object-contain mb-6" />
            <h3 class="text-xl font-semibold text-center text-brownish">{{ partner.name }}</h3>
            <button v-if="partner.id === 'semiramis-intercontinental'" class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-dark transition-colors duration-300">
              Show More
            </button>
          </router-link>
          <div
            v-else
            class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary"
          >
            <h3 class="text-xl font-semibold text-center text-brownish mb-2">{{ partner.name }}</h3>
            <p class="text-sm text-muted-foreground">Coming Soon...</p>
          </div>
        </template>
        <div v-if="partners.length === 0" class="bg-card p-8 rounded-xl border border-primary shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-primary">
          <h3 class="text-2xl font-semibold text-center text-brownish">More Partners Coming Soon...</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Partner = { id: string; name: string; logo?: string; link?: string; comingSoon?: boolean }
const props = withDefaults(defineProps<{ partners?: Partner[] }>(), {
  partners: () => [
    {
      id: 'semiramis-intercontinental',
      name: 'Semiramis Intercontinental Hotels & Resorts',
      logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/3D_logo1_RGB_LP_SC.png',
      link: 'https://www.ihg.com/intercontinental/hotels/us/en/cairo/caica/hoteldetail'
    },
    {
      id: 'four-seasons',
      name: 'Four Seasons Hotels & Resorts',
      // logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Four_Seasons_Hotels_and_Resorts_logo.png',
      // link: 'https://www.fourseasons.com/',
      comingSoon: true
    },
    {
      id: 'hilton',
      name: 'Hilton Hotels & Resorts',
      // logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Hilton_Hotels_and_Resorts_logo.png',
      // link: 'https://www.hilton.com/en/',
      comingSoon: true
    },
    {
      id: 'marriott',
      name: 'Marriott International',
      // logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Marriott_International_logo.png',
      // link: 'https://www.marriott.com/',
      comingSoon: true
    },
    {
      id: 'ritz-carlton',
      name: 'The Ritz-Carlton',
      // logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/Ritz-Carlton_logo.png',
      // link: 'https://www.ritzcarlton.com/',
      comingSoon: true
    },
    {
      id: 'st-regis',
      name: 'St. Regis Hotels & Resorts',
      // logo: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/images/homepage/partners/St._Regis_Hotels_26_Resorts_logo.png',
      // link: 'https://www.marriott.com/marriott-brands/st-regis.mi',
      comingSoon: true
    }
  ]
})
const partners = ref<Partner[]>(props.partners)
</script>

<style scoped>
/* Add any section-specific styles here */
</style>