<template>
  <section id="booking" class="py-10 bg-light-yellow font-sans">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-2xl font-bold text-foreground mb-4">Book Your Royal Experience</h2>
        <p class="text-md sm:text-md text-brownish font-bold max-w-2xl mx-auto">
          Limited to 50 bookings per week - Secure your spot now!
        </p>
      </div>

      <Card class="bg-card border border-primary/20 shadow-xl">
        <CardHeader class="text-center border-b border-border">
          <CardTitle class="flex items-center justify-center gap-2 text-xl sm:text-2xl text-foreground">
            Booking Details
          </CardTitle>
          <CardDescription class="text-sm sm:text-base text-muted-foreground">Choose your preferred date</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 p-8">
          <!-- Package Selection -->
          <div class="space-y-4 mb-8">
            <Label class="text-foreground text-base sm:text-lg">Your Package *</Label>
            <div class="grid md:grid-cols-1 gap-4">
              <template v-for="(pkg, index) in packagesData" :key="pkg.key || index">
                <div 
                  class="cursor-pointer rounded-lg p-4 border-2 transition-all bg-primary/20 border-primary"
                >
                  <h3 class="text-base sm:text-lg font-semibold text-primary mb-2">{{ pkg.title }}</h3>
                  <p class="text-lg sm:text-2xl font-bold text-foreground">{{ pkg.price }}</p>
                  <p v-if="pkg.details?.itinerary" class="text-xs sm:text-sm text-muted-foreground">{{ pkg.details.itinerary.length }} Days / {{ pkg.details.itinerary.length ? pkg.details.itinerary.length - 1 : 0 }} Nights</p>
                  <p v-else class="text-xs sm:text-sm text-muted-foreground">Full Day Experience</p>
                  <p v-if="pkg.details?.per_person" class="text-xs sm:text-sm text-muted-foreground">per person</p>
                </div>
              </template>
            </div>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="name" class="text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="h-12 bg-input border-border text-foreground focus:border-primary"
                />
              </div>
              
              <div class="space-y-2">
                <Label for="email" class="text-foreground">Email *</Label>
                <Input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="h-12 bg-input border-border text-foreground focus:border-primary"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="phone" class="text-foreground">Phone *</Label>
                <PhoneInput
                  id="phone"
                  v-model="formData.phone"
                  mode="international"
                  :inputOptions="{ placeholder: 'Enter your phone number' }"
                  class="h-12 bg-input border-border text-foreground focus:border-primary"
                />
                <p class="text-primary text-sm mt-1">Please enter a valid phone number, including country code.</p>
              </div>

              <div class="space-y-2">
                <Label for="participants" class="text-foreground">Number of Guests *</Label>
                <select
                  v-model="formData.participants"
                  class="h-12 w-full bg-input border border-border text-foreground rounded-md px-3 focus:border-primary focus:outline-none"
                  style="-webkit-appearance: none; -moz-appearance: none; appearance: none; padding-right: 32px;"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <Label class="text-foreground">Select Date *</Label>
              <div>
                <select
                  v-model="formData.selectedWeek"
                  required
                  class="h-12 w-full bg-input border border-border text-foreground rounded-md px-3 focus:border-primary focus:outline-none"
                >
                  <option value="">{{ loading ? "Loading dates..." : "Choose your Thursday" }}</option>
                  <template v-for="week in availableWeeks" :key="week.id">
                    <template v-if="new Date(week.week_start_date) >= new Date()">
                      <option 
                        :value="week.week_start_date"
                        :class="{
                          'text-green-500': getAvailableSlots(week) > 25,
                          'text-yellow-500': getAvailableSlots(week) > 12 && getAvailableSlots(week) <= 25,
                          'text-orange-500': getAvailableSlots(week) <= 12
                        }"
                      >
                        {{ getThursdayDate(week.week_start_date) }} - {{ getAvailableSlots(week) }} slots available
                      </option>
                    </template>
                  </template>
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="requests" class="text-foreground">Special requests</Label>
              <textarea
                id="requests"
                v-model="formData.specialRequests"
                rows="4"
                class="w-full p-3 bg-input border border-border rounded-md text-foreground focus:border-primary focus:outline-none"
                placeholder="Any special requests or requirements..."
              />
            </div>

            <div class="mt-8 text-center">
              <p class="text-primary text-2xl font-bold">
                Total Price: €{{ totalPrice.toLocaleString() }}
              </p>
            </div>

            <Button
              type="submit"
              class="w-full h-14 text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary font-semibold disabled:opacity-90"
            >
              <MessageCircle class="mr-2 h-5 w-5" />
              {{ submitting ? 'Processing...' : 'Send inquiry' }}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, watch, defineAsyncComponent } from 'vue'
import { KING_TUT_ROYAL_VIP } from '@/constants/packageIds';
import { format } from 'date-fns'
import { MessageCircle } from 'lucide-vue-next'
import { supabase } from '@/lib/supabase'
import { useRoute } from 'vue-router';
import { useToast } from '@/composables/useToast';
import type { PackageData } from '@/types';

const PhoneInput = defineAsyncComponent(() => import('@/components/ui/PhoneInput.vue'))

const Card = defineAsyncComponent(() => import('@/components/ui/card.vue'))
const CardHeader = defineAsyncComponent(() => import('@/components/ui/card-header.vue'))
const CardTitle = defineAsyncComponent(() => import('@/components/ui/card-title.vue'))
const CardDescription = defineAsyncComponent(() => import('@/components/ui/card-description.vue'))
const CardContent = defineAsyncComponent(() => import('@/components/ui/card-content.vue'))
const Button = defineAsyncComponent(() => import('@/components/ui/button.vue'))
const Input = defineAsyncComponent(() => import('@/components/ui/input.vue'))
const Label = defineAsyncComponent(() => import('@/components/ui/label.vue'))

const props = defineProps({
  preselectedPackageId: {
    type: String,
    default: KING_TUT_ROYAL_VIP
  },
  preselectedDate: {
    type: String,
    default: null
  },
  preselectedWeek: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['loaded']);

const PACKAGE_PRICING = ref<{[key: string]: number}>({});

onMounted(async () => {
  try {
    // Fetch only the Royal VIP package (limit 1)
    const { data, error } = await supabase
      .from('packages_view')
      .select('package, sort_rank')
      .eq('package->>slug', KING_TUT_ROYAL_VIP)
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching package:', error);
      return;
    }

    // Populate packagesData with the single package
    packagesData.value = data ? [data.package] : [];

    // Build pricing map keyed by slug from priceAmountCents (fallback to booking.price_amount_cents)
    PACKAGE_PRICING.value = {};
    packagesData.value.forEach((pkg: any) => {
      const cents = pkg?.priceAmountCents ?? pkg?.details?.booking?.price_amount_cents ?? 0;
      if (pkg?.slug && cents) {
        PACKAGE_PRICING.value[pkg.slug] = cents / 100;
      }
    });

    // Set default selected package
    formData.selectedPackage = KING_TUT_ROYAL_VIP;
  } catch (error) {
    console.error('Error in onMounted:', error);
  }
  
  emit('loaded');
  
  if (props.preselectedWeek) {
    formData.selectedWeek = props.preselectedWeek;
  }

  // Fetch available weeks for booking
  await fetchAvailableWeeks()
  
  // Subscribe to real-time updates for weekly bookings
  channel = supabase
    .channel('weekly_bookings_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'weekly_bookings' },
      () => {
        fetchAvailableWeeks()
      }
    )
    .subscribe()
});

interface WeeklyBooking {
  id: number
  week_start_date: string
  booking_count: number
}

const MAX_CAPACITY = 50

// Reactive form data - simplified structure
const formData = reactive({
  name: '',
  phone: '',
  email: '',
  selectedWeek: '',
  participants: '1',
  selectedPackage: KING_TUT_ROYAL_VIP, // Always set to Royal VIP
  specialRequests: ''
})

// State
const availableWeeks = ref<WeeklyBooking[]>([])
const loading = ref(true)
const submitting = ref(false)
let channel: any = null

// Watch for phone input changes to sanitize and ensure single leading plus is preserved
watch(() => formData.phone, (newValue) => {
  if (newValue) {
    let cleaned = newValue.replace(/[^0-9+]/g, '')
    const hasPlus = cleaned.includes('+')
    // Remove all plus signs then, if any were present, prefix a single plus
    const numeric = cleaned.replace(/\+/g, '')
    formData.phone = hasPlus ? `+${numeric}` : numeric
  }
})

// Computed for form validation
const isFormValid = computed(() => {
  const hasName = formData.name && formData.name.trim().length > 0
  const hasEmail = formData.email && formData.email.trim().length > 0
  const hasSelectedWeek = formData.selectedWeek && formData.selectedWeek.length > 0
  
  return hasName && hasEmail && hasSelectedWeek
})

// Computed for reactive total price calculation
const totalPrice = computed(() => {
  const pricing = PACKAGE_PRICING.value || {};
  const selectedSlug = formData.selectedPackage || KING_TUT_ROYAL_VIP;
  const pricePerPerson = pricing[selectedSlug] || 0;
  const numGuests = parseInt(formData.participants) || 1;
  return pricePerPerson * numGuests;
});

// Methods
const fetchAvailableWeeks = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-weekly-bookings')
    if (error) throw error
    
    // Filter weeks that have available slots (less than MAX_CAPACITY bookings)
    const available = data.data.filter((week: WeeklyBooking) => week.booking_count < MAX_CAPACITY)
    availableWeeks.value = available
  } catch (error) {
    console.error('Error fetching available weeks:', error);
    availableWeeks.value = []; // Provide default empty array to prevent rendering issues
  } finally {
    loading.value = false
  }
}

const getThursdayDate = (weekStartDate: string) => {
  const selectedDate = new Date(weekStartDate)
  return format(selectedDate, 'EEEE dd, MMMM yyyy')
}

const getAvailableSlots = (weekData: WeeklyBooking) => {
  return MAX_CAPACITY - weekData.booking_count
}

const selectPackage = (packageId: string) => {
  formData.selectedPackage = KING_TUT_ROYAL_VIP; // Always ensure Royal VIP is selected
  formData.participants = '1'; // Default to 1 guest for Royal VIP
};

// Add missing packagesData ref
const packagesData = ref<PackageData[]>([]);

// Fetch packages data in the existing onMounted hook
// This code will be merged with the existing onMounted

const handleSubmit = async () => {
  if (!formData.name.trim()) {
    alert('Please enter your full name.')
    return
  }

  if (!formData.phone.trim()) {
    alert('Please enter your phone number.')
    return
  }

  // Require international code (must start with + and country code)
  const phoneIntlRegex = /^\+\d{6,15}$/
  if (!phoneIntlRegex.test(formData.phone.trim())) {
    alert('Please provide your phone number with the international country code (e.g. +971589123456) and do not remove the + sign.')
    return
  }

  if (!formData.participants || parseInt(formData.participants) <= 0) {
    alert('Please enter the number of guests.')
    return
  }

  if (!formData.selectedWeek) {
    alert('Please select a week for the Royal VIP package.')
    return
  }

  submitting.value = true

  let bookingDateDisplay = ''
  let newBookingCount = 0
  let remainingSlots = 0

  try {
    // Check if enough slots are available
    const selectedWeekData = availableWeeks.value.find(w => w.week_start_date === formData.selectedWeek)
    if (!selectedWeekData) {
      throw new Error('Selected week data not found')
    }
    
    const availableSlots = getAvailableSlots(selectedWeekData)
    const requestedParticipants = parseInt(formData.participants)
    
    if (requestedParticipants > availableSlots) {
      alert(`Not enough slots available. Requested: ${requestedParticipants}, Available: ${availableSlots}`)
      submitting.value = false
      return
    }

    // Book the slot for VIP package
    const { data, error } = await supabase.functions.invoke('book-weekly-slot', {
      body: { weekStartDate: formData.selectedWeek, participants: requestedParticipants }
    })

    if (error) throw error
    if (!data.success) throw new Error(data.message)

    newBookingCount = data.newCount
    bookingDateDisplay = getThursdayDate(formData.selectedWeek)
    remainingSlots = MAX_CAPACITY - newBookingCount

    const totalPriceValue = totalPrice.value
    
    // Get the actual package name from packagesData
    const packageName = 'King Tut Royal VIP' // Hardcoded since we only have one package

    const message = `
📋 *Booking Details:*
${packageName}
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}
👥 Guests: ${formData.participants}
📅 Booking Date: ${bookingDateDisplay}
€ Total Price: €${totalPriceValue.toLocaleString()}
🎟️ Remaining Slots: ${remainingSlots}
${formData.specialRequests ? `📝 Special Requests: ${formData.specialRequests}` : ''}
`

    const whatsappUrl = `https://api.whatsapp.com/send?phone=201270389777&text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    // Refresh available weeks
    await fetchAvailableWeeks()

    // Reset form but keep Royal VIP selected
    Object.assign(formData, {
      name: '',
      phone: '',
      email: '',
      selectedWeek: '',
      participants: '1',
      selectedPackage: KING_TUT_ROYAL_VIP, // Always keep Royal VIP selected
      specialRequests: ''
    })
  } catch (error) {
    console.error('Booking error:', error)
    alert('Booking failed. Please try again.')
  } finally {
    submitting.value = false
  }
}



onUnmounted(() => {
  if (channel) {
    supabase.removeChannel(channel)
  }
})
</script>

<style scoped>
/* Font normalization for the entire component */
* {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>