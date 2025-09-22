<template>
  <section id="booking" class="py-10 bg-light-yellow">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">Book Your Royal Experience</h2>
        <p class="text-lg sm:text-xl text-brownish font-bold max-w-2xl mx-auto">
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
                  :class="`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                    formData.selectedPackage === pkg.slug
                      ? 'bg-primary/20 border-primary'
                      : 'bg-muted border-border hover:border-primary/50'
                  }`"
                  @click="selectPackage(pkg.slug)"
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
                  <option value="" disabled selected>Select number of guests</option>
                  <template v-if="formData.selectedPackage === 'king-tut-vip-one-day'">
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                  </template>
                  
                  <template v-if="formData.selectedPackage === 'king-tut-royal-vip'">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                  </template>
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <Label class="text-foreground">Select Date *</Label>
              <div v-if="formData.selectedPackage === 'king-tut-vip-one-day'" class="relative">
                <LuxuryDatePicker
                  v-model="selectedOneDayDate"
                  placeholder="Choose your exclusive day"
                  :min-date="new Date()"
                  class="w-full"
                />
              </div>
              <div v-else>
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
                Total Price: €{{ calculateTotalPrice(formData.selectedPackage, parseInt(formData.participants)) }}
              </p>
            </div>

            <Button
              type="submit"
              :disabled="!isFormValid || submitting"
              class="w-full h-14 text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary font-semibold disabled:opacity-90"
            >
              <MessageCircle class="mr-2 h-5 w-5" />
              {{ submitting ? 'Processing...' : 'Send inquiry' }}
            </Button>
            <Label v-if="!isFormValid" class="text-red-500 font-bold">Fill in the required fields and we will get back to you.</Label>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, watch, defineAsyncComponent } from 'vue'
import { KING_TUT_VIP_ONE_DAY, KING_TUT_ROYAL_VIP } from '@/constants/packageIds';
import { format } from 'date-fns'
import { MessageCircle } from 'lucide-vue-next'
import { supabase } from '@/lib/supabase'
import { useRoute } from 'vue-router';
import { useToast } from '@/composables/useToast';
import { PackageData } from '@/types';

const PhoneInput = defineAsyncComponent(() => import('@/components/ui/PhoneInput.vue'))

const Card = defineAsyncComponent(() => import('@/components/ui/card.vue'))
const CardHeader = defineAsyncComponent(() => import('@/components/ui/card-header.vue'))
const CardTitle = defineAsyncComponent(() => import('@/components/ui/card-title.vue'))
const CardDescription = defineAsyncComponent(() => import('@/components/ui/card-description.vue'))
const CardContent = defineAsyncComponent(() => import('@/components/ui/card-content.vue'))
const Button = defineAsyncComponent(() => import('@/components/ui/button.vue'))
const Input = defineAsyncComponent(() => import('@/components/ui/input.vue'))
const Label = defineAsyncComponent(() => import('@/components/ui/label.vue'))
const LuxuryDatePicker = defineAsyncComponent(() => import('@/components/LuxuryDatePicker.vue'))

// Define constants for package IDs

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

const packagesData = ref<PackageData[]>([]);
const PACKAGE_PRICING = ref<{[key: string]: number}>({});

onMounted(async () => {
  const { data, error } = await supabase
    .from('packages_view')
    .select('package, sort_rank')
    .limit(1)
    .order('sort_rank', { ascending: true });

  if (error) {
    console.error('Error fetching packages:', error);
    packagesData.value = []; // Provide default empty array to prevent rendering issues
  } else {
    packagesData.value = (data || []).map(pkg => {
      const packageInfo = pkg.package || {};
      const slug = packageInfo.slug || '';
      return {
        key: slug,
        slug: slug,
        id: packageInfo.id || '',
        title: packageInfo.title || 'Unknown',
        price: packageInfo.price || '0',
        duration: packageInfo.details?.itinerary?.length ? `${packageInfo.details.itinerary.length} Days` : 'Full Day',
        image: packageInfo.image || '',
        highlights: packageInfo.highlights || [],
        details: packageInfo.details || {}
      };
    });
    
    PACKAGE_PRICING.value = packagesData.value.reduce((acc, pkg) => {
      const price = pkg.price;
      const cleanPrice = pkg.price.replace(/[^0-9]/g, '');
      acc[pkg.key] = parseFloat(cleanPrice) || 0; // Ensure price is a number, default to 0 if NaN
      console.log('acc', acc);
      return acc;
    }, {} as {[key: string]: number});
  }
  emit('loaded');

  // Resolve preselected package id/slug to a package slug from packagesData
  const resolveToSlug = (input: string | null | undefined) => {
    if (!input) return '';
    const candidate = String(input);
    const found = packagesData.value.find(p => p.slug === candidate || p.id === candidate || p.key === candidate);
    return found ? found.slug : candidate;
  };

  const resolvedPreselected = resolveToSlug(props.preselectedPackageId);
  console.log(resolvedPreselected)

  if (resolvedPreselected) {
    // If an explicit preselected package was provided, use it
    selectPackage(resolvedPreselected);
    if (props.preselectedDate && resolvedPreselected === KING_TUT_VIP_ONE_DAY) {
      selectedOneDayDate.value = new Date(props.preselectedDate);
    }
  } else if (packagesData && Array.isArray(packagesData.value) && packagesData.value.length === 1) {
    // If there's exactly one package available, select it automatically
    const onlyPackage = packagesData.value[0];
    const slug = onlyPackage.slug || onlyPackage.id || onlyPackage.key || KING_TUT_ROYAL_VIP;
    selectPackage(slug);

    // If the single package is the one-day package and a preselected date exists, apply it
    if (props.preselectedDate && slug === KING_TUT_VIP_ONE_DAY) {
      selectedOneDayDate.value = new Date(props.preselectedDate);
    }
  } else {
    // Set default package to 'royal vip' if no preselected package is provided
    selectPackage(KING_TUT_ROYAL_VIP);
  }
  if (props.preselectedWeek && resolvedPreselected === KING_TUT_ROYAL_VIP) {
    formData.selectedWeek = props.preselectedWeek;
  }
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
  selectedPackage: '', // default empty — will be set on mount if only package exists
  specialRequests: '',
  oneDayDate: '' // Store as string directly for date input
})

// Separate reactive for the luxury date picker
const selectedOneDayDate = ref<Date | null>(null)

// State
const availableWeeks = ref<WeeklyBooking[]>([])
const loading = ref(true)
const submitting = ref(false)
let channel: any = null

// Watch for date picker changes
watch(selectedOneDayDate, (newDate) => {
  if (newDate) {
    formData.oneDayDate = format(newDate, 'yyyy-MM-dd')
  } else {
    formData.oneDayDate = ''
  }
})

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
  
  if (!hasName || !hasEmail) return false
  
  if (formData.selectedPackage === KING_TUT_ROYAL_VIP) {
    return formData.selectedWeek && formData.selectedWeek.length > 0
  }
  
  if (formData.selectedPackage === KING_TUT_VIP_ONE_DAY) {
    return selectedOneDayDate.value !== null
  }
  
  return false
})

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

function calculateTotalPrice(packageId: string, guests: number) {
  const pricing = PACKAGE_PRICING.value || {};
  const pricePerPerson = pricing[packageId] || 0;
  const numGuests = isNaN(guests) ? 0 : guests; // Ensure guests is a number, default to 0 if NaN
  return pricePerPerson * numGuests;
}

const selectPackage = (packageId: string) => {
  formData.selectedPackage = packageId;
  if (packageId === KING_TUT_VIP_ONE_DAY) {
    formData.participants = '4';
  } else if (packageId === KING_TUT_ROYAL_VIP) {
    formData.participants = '1';
  }
};

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

  if (formData.selectedPackage === KING_TUT_ROYAL_VIP && !formData.selectedWeek) {
    alert('Please select a week for the Royal VIP package.')
    return
  }

  if (formData.selectedPackage === KING_TUT_VIP_ONE_DAY && !formData.oneDayDate) {
    alert('Please select a date for the One Day package.')
    return
  }

  submitting.value = true

  let bookingDateDisplay = ''
  let newBookingCount = 0
  let remainingSlots = 0

  try {
    if (formData.selectedPackage === KING_TUT_ROYAL_VIP) {
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
    } else if (formData.selectedPackage === KING_TUT_VIP_ONE_DAY && formData.oneDayDate) {
      // For one-day package, no slot booking needed on backend for now
      // Just format the date for display
      bookingDateDisplay = format(new Date(formData.oneDayDate), 'EEEE dd, MMMM yyyy') // e.g., 'Monday 25, October 2024'
      newBookingCount = 0 // Not applicable for one-day
      remainingSlots = 0 // Not applicable for one-day
    }

    const totalPrice = calculateTotalPrice(formData.selectedPackage, parseInt(formData.participants))
    const packageName = formData.selectedPackage === KING_TUT_ROYAL_VIP ? 'King Tut Royal VIP (5 Days / 4 Nights)' : 'King Tut VIP One Day'

    const message = `
🎁 *${packageName}*

📋 *Booking Details:*
${formData.selectedPackage === KING_TUT_ROYAL_VIP ? `🎫 Booking number: ${newBookingCount}` : ''}
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}
👥 Guests: ${formData.participants}
📅 Booking Date: ${bookingDateDisplay}
€ Total Price: €${totalPrice.toLocaleString()}
${formData.selectedPackage === KING_TUT_ROYAL_VIP ? `🎟️ Remaining Slots: ${remainingSlots}` : ''}
${formData.specialRequests ? `📝 Special Requests: ${formData.specialRequests}` : ''}
`

    const whatsappUrl = `https://api.whatsapp.com/send?phone=201270389777&text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    // Refresh available weeks (only relevant for VIP package)
    if (formData.selectedPackage === KING_TUT_ROYAL_VIP) {
      await fetchAvailableWeeks()
    }

    // Reset form
    Object.assign(formData, {
      name: '',
      phone: '',
      email: '',
      selectedWeek: '',
      participants: '1',
      selectedPackage: KING_TUT_ROYAL_VIP,
      specialRequests: '',
      oneDayDate: ''
    })
    selectedOneDayDate.value = null
  } catch (error) {
    console.error('Booking error:', error)
    alert('Booking failed. Please try again.')
  } finally {
    submitting.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await fetchAvailableWeeks()
  
  // Subscribe to realtime changes
  channel = supabase
    .channel('weekly_bookings_changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'weekly_bookings' },
      () => {
        fetchAvailableWeeks()
      }
    )
    .subscribe()
})

onUnmounted(() => {
  if (channel) {
    supabase.removeChannel(channel)
  }
})

// Watch for preselectedPackageId changes to update the selected package and participants
watch(packagesData, (newVal) => {
  if (Array.isArray(newVal) && newVal.length === 1) {
    const onlyPackage = newVal[0];
    const slug = onlyPackage.slug || onlyPackage.id || onlyPackage.key || KING_TUT_ROYAL_VIP;
    selectPackage(slug);
  }
}, { immediate: true });
</script>

<style>
.vue-tel-input {
  background-color: var(--input) !important;
  border-color: var(--border) !important;
  color: var(--foreground) !important;
  border-radius: 0.375rem !important;
}

.vue-tel-input:focus-within {
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.5) !important;
  border-color: var(--primary) !important;
}

.vue-tel-input .vti__dropdown {
  background-color: var(--input) !important;
  border-color: var(--border) !important;
  color: var(--foreground) !important;
}

.vue-tel-input .vti__dropdown.open {
  background-color: var(--input) !important;
  border-color: var(--border) !important;
}

.vue-tel-input .vti__dropdown-item {
  background-color: var(--input) !important;
  color: var(--foreground) !important;
}

.vue-tel-input .vti__dropdown-item.highlighted {
  background-color: var(--accent) !important;
}

.vue-tel-input .vti__input {
  background-color: var(--input) !important;
  border-color: var(--border) !important;
  color: var(--foreground) !important;
  border-radius: 0.375rem !important;
}
</style>