<template>
  <section id="booking" class="py-20 bg-black">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">Book Your Royal Experience</h2>
        <p class="text-xl text-amber-400 max-w-2xl mx-auto">
          Limited to 50 bookings per week - Secure your spot now!
        </p>
      </div>

      <Card class="bg-gray-900 border border-amber-400 shadow-xl">
        <CardHeader class="text-center border-b border-amber-400/20">
          <CardTitle class="flex items-center justify-center gap-2 text-2xl text-white">
            Select Your Package
          </CardTitle>
          <CardDescription class="text-gray-300">Choose your preferred package and date</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6 p-8">
          <!-- Package Selection -->
          <div class="space-y-4 mb-8">
            <Label class="text-white text-lg">Select Package *</Label>
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                :class="`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                  values.selectedPackage === 'vip' 
                    ? 'bg-amber-400/20 border-amber-400' 
                    : 'bg-gray-800 border-gray-600 hover:border-amber-400/50'
                }`"
                @click="selectPackage('vip')"
              >
                <h3 class="text-lg font-semibold text-amber-400 mb-2">King Tut Royal VIP</h3>
                <p class="text-white text-2xl font-bold">€2,900</p>
                <p class="text-gray-300 text-sm">5 Days / 4 Nights</p>
                <p class="text-gray-300 text-sm">per person</p>
              </div>
              <div 
                :class="`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                  values.selectedPackage === 'oneday' 
                    ? 'bg-amber-400/20 border-amber-400' 
                    : 'bg-gray-800 border-gray-600 hover:border-amber-400/50'
                }`"
                @click="selectPackage('oneday')"
              >
                <h3 class="text-lg font-semibold text-white mb-2">King Tut VIP One Day</h3>
                <p class="text-white text-2xl font-bold">€900</p>
                <p class="text-gray-300 text-sm">Full Day Experience</p>
                <p class="text-gray-300 text-sm">per person</p>
              </div>
            </div>
            <ErrorMessage name="selectedPackage" class="text-red-400 text-sm mt-2" />
          </div>
          
          <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="name" class="text-white">Full Name *</Label>
                <Field name="name" v-slot="{ field, errorMessage }">
                  <Input
                    id="name"
                    v-bind="field"
                    type="text"
                    :class="`h-12 bg-gray-800 border-gray-600 text-white focus:border-amber-400 ${errorMessage ? 'border-red-400' : ''}`"
                  />
                </Field>
                <ErrorMessage name="name" class="text-red-400 text-sm" />
              </div>
              
              <div class="space-y-2">
                <Label for="email" class="text-white">Email *</Label>
                <Field name="email" v-slot="{ field, errorMessage }">
                  <Input
                    id="email"
                    v-bind="field"
                    type="email"
                    :class="`h-12 bg-gray-800 border-gray-600 text-white focus:border-amber-400 ${errorMessage ? 'border-red-400' : ''}`"
                  />
                </Field>
                <ErrorMessage name="email" class="text-red-400 text-sm" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="phone" class="text-white">Phone *</Label>
                <Field name="phone" v-slot="{ field, errorMessage }">
                  <VueTelInput
                    id="phone"
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                    mode="international"
                    :inputOptions="{ placeholder: 'Enter your phone number' }"
                    :class="`h-12 bg-gray-800 border-gray-600 text-white focus:border-amber-400 ${errorMessage ? 'border-red-400' : ''}`"
                  />
                </Field>
                <ErrorMessage name="phone" class="text-red-400 text-sm" />
              </div>

              <div class="space-y-2">
                <Label for="participants" class="text-white">Number of Guests *</Label>
                <Field name="participants" v-slot="{ field, errorMessage }">
                  <select
                    v-bind="field"
                    :class="`h-12 w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 focus:border-amber-400 focus:outline-none ${errorMessage ? 'border-red-400' : ''}`"
                    style="-webkit-appearance: none; -moz-appearance: none; appearance: none; padding-right: 32px;"
                  >
                    <option value="" disabled>Select number of guests</option>
                    <template v-if="values.selectedPackage === 'oneday'">
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                    </template>
                    
                    <template v-if="values.selectedPackage === 'vip'">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                    </template>
                  </select>
                </Field>
                <ErrorMessage name="participants" class="text-red-400 text-sm" />
              </div>
            </div>

            <div class="space-y-2">
              <Label class="text-white">Select Date *</Label>
              <div v-if="values.selectedPackage === 'oneday'" class="relative">
                <LuxuryDatePicker
                  v-model="selectedOneDayDate"
                  placeholder="Choose your exclusive day"
                  :min-date="new Date()"
                  class="w-full"
                />
                <ErrorMessage name="oneDayDate" class="text-red-400 text-sm mt-2" />
              </div>
              <div v-else>
                <Field name="selectedWeek" v-slot="{ field, errorMessage }">
                  <select
                    v-bind="field"
                    :class="`h-12 w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 focus:border-amber-400 focus:outline-none ${errorMessage ? 'border-red-400' : ''}`"
                  >
                    <option value="">{{ loading ? "Loading dates..." : "Choose your Thursday" }}</option>
                    <template v-for="week in availableWeeks" :key="week.id">
                      <template v-if="new Date(week.week_start_date) >= new Date()">
                        <option 
                          :value="week.week_start_date"
                          :class="{
                            'text-green-400': getAvailableSlots(week) > 25,
                            'text-yellow-400': getAvailableSlots(week) > 12 && getAvailableSlots(week) <= 25,
                            'text-orange-400': getAvailableSlots(week) <= 12
                          }"
                        >
                          {{ getThursdayDate(week.week_start_date) }} - {{ getAvailableSlots(week) }} slots available
                        </option>
                      </template>
                    </template>
                  </select>
                </Field>
                <ErrorMessage name="selectedWeek" class="text-red-400 text-sm mt-2" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="requests" class="text-white">Special requests</Label>
              <Field name="specialRequests" v-slot="{ field, errorMessage }">
                <textarea
                  id="requests"
                  v-bind="field"
                  rows="4"
                  :class="`w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-amber-400 focus:outline-none ${errorMessage ? 'border-red-400' : ''}`"
                  placeholder="Any special requests or requirements..."
                />
              </Field>
              <ErrorMessage name="specialRequests" class="text-red-400 text-sm" />
            </div>

            <div class="mt-8 text-center">
              <p class="text-primary text-2xl font-bold">
                Total Price: €{{ calculateTotalPrice(values.selectedPackage, parseInt(values.participants || '1')).toLocaleString() }}
              </p>
            </div>

            <Button
              type="submit"
              :disabled="!isFormValid || submitting"
              class="w-full h-14 text-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 font-semibold"
            >
              <MessageCircle class="mr-2 h-5 w-5" />
              {{ submitting ? 'Processing...' : 'Secure Your Booking' }}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue'
import { format } from 'date-fns'
import { MessageCircle } from 'lucide-vue-next'
import { supabase } from '@/lib/supabase'
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/card-header.vue'
import CardTitle from '@/components/ui/card-title.vue'
import CardDescription from '@/components/ui/card-description.vue'
import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import LuxuryDatePicker from '@/components/LuxuryDatePicker.vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

interface WeeklyBooking {
  id: number
  week_start_date: string
  booking_count: number
}

const MAX_CAPACITY = 50

// Zod validation schema
const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  participants: z
    .string()
    .refine((val) => {
      const num = parseInt(val)
      return num >= 1 && num <= 6
    }, 'Number of guests must be between 1 and 6'),
  selectedPackage: z.enum(['vip', 'oneday'], {
    errorMap: () => ({ message: 'Please select a package' })
  }),
  selectedWeek: z
    .string()
    .optional()
    .refine((val, ctx) => {
      const packageType = ctx.parent.selectedPackage
      if (packageType === 'vip') {
        return val && val.trim().length > 0
      }
      return true
    }, 'Please select a week for VIP package'),
  oneDayDate: z
    .string()
    .optional()
    .refine((val, ctx) => {
      const packageType = ctx.parent.selectedPackage
      if (packageType === 'oneday') {
        if (!val || val.trim().length === 0) {
          return false
        }
        // Check if the date is in the future
        const selectedDate = new Date(val)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate >= today
      }
      return true
    }, 'Please select a future date for One Day package'),
  specialRequests: z
    .string()
    .max(500, 'Special requests must not exceed 500 characters')
    .optional()
})

type BookingFormData = z.infer<typeof bookingSchema>

// Initialize form with vee-validate
const { handleSubmit, errors, values, setFieldValue, resetForm } = useForm<BookingFormData>({
  validationSchema: toTypedSchema(bookingSchema),
  initialValues: {
    name: '',
    phone: '',
    email: '',
    selectedWeek: '',
    participants: '1',
    selectedPackage: 'vip',
    specialRequests: '',
    oneDayDate: ''
  }
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
    setFieldValue('oneDayDate', format(newDate, 'yyyy-MM-dd'))
  } else {
    setFieldValue('oneDayDate', '')
  }
})

// Computed for form validation
const isFormValid = computed(() => {
  // Check if there are any validation errors
  const hasErrors = Object.keys(errors.value).length > 0
  
  // Check required fields based on package type
  const hasRequiredFields = values.name && 
    values.email && 
    values.phone && 
    values.participants &&
    values.selectedPackage
  
  if (!hasRequiredFields || hasErrors) return false
  
  if (values.selectedPackage === 'vip') {
    return values.selectedWeek && values.selectedWeek.length > 0
  }
  
  if (values.selectedPackage === 'oneday') {
    return values.oneDayDate && values.oneDayDate.length > 0
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
    console.error('Error fetching available weeks:', error)
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

const calculateTotalPrice = (packageType: string, guests: number) => {
  const pricePerPerson = packageType === 'vip' ? 2900 : 900
  return pricePerPerson * guests
}

const selectPackage = (packageType: 'vip' | 'oneday') => {
  setFieldValue('selectedPackage', packageType)
  if (packageType === 'oneday') {
    setFieldValue('participants', '4') // Set minimum for one day package
  }
}

const onSubmit = handleSubmit(async (formData: BookingFormData) => {
  submitting.value = true

  let bookingDateDisplay = ''
  let newBookingCount = 0
  let remainingSlots = 0

  try {
    if (formData.selectedPackage === 'vip') {
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
      bookingDateDisplay = getThursdayDate(formData.selectedWeek!)
      remainingSlots = MAX_CAPACITY - newBookingCount
    } else if (formData.selectedPackage === 'oneday' && formData.oneDayDate) {
      // For one-day package, no slot booking needed on backend for now
      // Just format the date for display
      bookingDateDisplay = format(new Date(formData.oneDayDate), 'EEEE dd, MMMM yyyy') // e.g., 'Monday 25, October 2024'
      newBookingCount = 0 // Not applicable for one-day
      remainingSlots = 0 // Not applicable for one-day
    }

    const totalPrice = calculateTotalPrice(formData.selectedPackage, parseInt(formData.participants))
    const packageName = formData.selectedPackage === 'vip' ? 'King Tut Royal VIP (5 Days / 4 Nights)' : 'King Tut VIP One Day'

    const message = `
🎁 *${packageName}*

📋 *Booking Details:*
${formData.selectedPackage === 'vip' ? `🎫 Booking number: ${newBookingCount}` : ''}
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}
👥 Guests: ${formData.participants}
📅 Booking Date: ${bookingDateDisplay}
€ Total Price: €${totalPrice.toLocaleString()}
${formData.selectedPackage === 'vip' ? `🎟️ Remaining Slots: ${remainingSlots}` : ''}
${formData.specialRequests ? `📝 Special Requests: ${formData.specialRequests}` : ''}
`

    const whatsappUrl = `https://api.whatsapp.com/send?phone=971585923054&text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    // Refresh available weeks (only relevant for VIP package)
    if (formData.selectedPackage === 'vip') {
      await fetchAvailableWeeks()
    }

    // Reset form
    resetForm()
    selectedOneDayDate.value = null
  } catch (error) {
    console.error('Booking error:', error)
    alert('Booking failed. Please try again.')
  } finally {
    submitting.value = false
  }
})

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
</script>

<style>
.vue-tel-input {
  background-color: #1f2937 !important; /* bg-gray-800 */
  border-color: #4b5563 !important; /* border-gray-600 */
  color: #ffffff !important; /* text-white */
  border-radius: 0.375rem !important; /* rounded-md */
}

.vue-tel-input:focus-within {
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.5) !important; /* focus:border-amber-400 with shadow */
  border-color: #fbbf24 !important; /* focus:border-amber-400 */
}

.vue-tel-input .vti__dropdown {
  background-color: #1f2937 !important; /* bg-gray-800 */
  border-color: #4b5563 !important; /* border-gray-600 */
  color: #ffffff !important; /* text-white */
}

.vue-tel-input .vti__dropdown.open {
  background-color: #1f2937 !important; /* bg-gray-800 */
  border-color: #4b5563 !important; /* border-gray-600 */
}

.vue-tel-input .vti__dropdown-item {
  background-color: #1f2937 !important; /* bg-gray-800 */
  color: #ffffff !important; /* text-white */
}

.vue-tel-input .vti__dropdown-item.highlighted {
  background-color: #2d3748 !important; /* A slightly lighter gray for hover/focus */
}

.vue-tel-input .vti__input {
  background-color: #1f2937 !important; /* bg-gray-800 */
  border-color: #4b5563 !important; /* border-gray-600 */
  color: #ffffff !important; /* text-white */
  border-radius: 0.375rem !important; /* rounded-md */
}
</style>