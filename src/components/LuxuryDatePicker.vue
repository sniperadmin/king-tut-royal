<template>
  <div class="relative luxury-date-picker">
    <div 
      class="luxury-date-input h-12 w-full bg-gray-800 border border-gray-600 rounded-md px-3 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-colors select-none"
      @click="toggleCalendar"
    >
      <span :class="selectedDate ? 'text-white' : 'text-gray-400'">
        {{ selectedDate ? formatSelectedDate(selectedDate) : placeholder }}
      </span>
      <CalendarIcon class="h-5 w-5 text-amber-400" />
    </div>

    <!-- Calendar dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        class="absolute top-full left-0 mt-2 w-full bg-gray-900 border border-amber-400/30 rounded-lg shadow-2xl z-[9999] overflow-hidden"
        style="position: absolute; z-index: 9999; min-width: 300px;"
        @click.stop
      >
        <!-- Calendar Header -->
        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-400/10 to-amber-600/10">
          <button
            @click.stop.prevent="previousMonth"
            class="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 rounded-full transition-all focus:outline-none"
            type="button"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>

          <div class="text-center">
            <h3 class="text-lg font-semibold text-white">
              {{ format(currentMonth, 'MMMM yyyy') }}
            </h3>
          </div>
          
          <button
            @click.stop.prevent="nextMonth"
            class="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 rounded-full transition-all focus:outline-none"
            type="button"
            aria-label="Next month"
          >
            <ChevronRight class="h-5 w-5" />
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="p-4">
          <!-- Weekday Headers -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div 
              v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
              :key="day"
              class="text-center text-xs font-medium text-gray-400 py-2"
            >
              {{ day }}
            </div>
          </div>

          <!-- Days Grid -->
          <div class="grid grid-cols-7 gap-1">
            <!-- Empty cells for days before month starts -->
            <div 
              v-for="n in firstDayOfMonth"
              :key="`empty-${n}`"
              class="h-10"
            />
            
            <!-- Actual days -->
            <button
              v-for="day in daysInMonth"
              :key="day.toISOString()"
              @click.stop.prevent="selectDate(day)"
              :class="getDayClasses(day)"
              class="h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200"
              type="button"
            >
              <span class="relative">
                {{ format(day, 'd') }}
                <span 
                  v-if="hasEvent(day)"
                  class="absolute -top-1 -right-1 h-2 w-2 bg-amber-400 rounded-full"
                />
              </span>
            </button>
          </div>
        </div>

        <!-- Calendar Footer -->
        <div class="border-t border-amber-400/20 p-4 bg-gray-800/50">
          <div class="flex items-center justify-between">
            <button
              @click.stop="selectToday"
              class="text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              Today
            </button>
            <button
              @click.stop="closeCalendar"
              class="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, isBefore, startOfToday } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  modelValue?: Date | null
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  events?: Date[]
}

interface Emits {
  'update:modelValue': [date: Date | null]
  'date-selected': [date: Date]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select date',
  minDate: () => startOfToday(),
  maxDate: () => new Date(new Date().getFullYear() + 1, 11, 31),
  events: () => []
})

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const currentMonth = ref(new Date())
const selectedDate = ref<Date | null>(props.modelValue || null)

// Computed properties
const firstDayOfMonth = computed(() => {
  const firstDay = startOfMonth(currentMonth.value).getDay()
  return firstDay
})

const daysInMonth = computed(() => {
  const start = startOfMonth(currentMonth.value)
  const end = endOfMonth(currentMonth.value)
  return eachDayOfInterval({ start, end })
})

// Methods
const toggleCalendar = () => {
  console.log('Calendar clicked, opening...')
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    currentMonth.value = selectedDate.value || new Date()
  }
}

const closeCalendar = () => {
  isOpen.value = false
}

const previousMonth = () => {
  currentMonth.value = subMonths(currentMonth.value, 1)
}

const nextMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, 1)
}

const selectDate = (date: Date) => {
  if (isDateDisabled(date)) return
  
  selectedDate.value = date
  emit('update:modelValue', date)
  emit('date-selected', date)
  closeCalendar()
}

const selectToday = () => {
  const today = new Date()
  if (!isDateDisabled(today)) {
    selectDate(today)
  }
}

const isDateDisabled = (date: Date) => {
  if (props.minDate && isBefore(date, props.minDate)) return true
  if (props.maxDate && isBefore(props.maxDate, date)) return true
  return false
}

const hasEvent = (date: Date) => {
  return props.events.some(eventDate => isSameDay(eventDate, date))
}

const getDayClasses = (date: Date) => {
  const classes = []
  
  if (isDateDisabled(date)) {
    classes.push('text-gray-600 cursor-not-allowed')
  } else if (isSameDay(date, selectedDate.value || new Date())) {
    classes.push('bg-amber-400 text-black font-bold hover:bg-amber-500')
  } else if (isToday(date)) {
    classes.push('text-amber-400 font-semibold hover:bg-amber-400/20')
  } else {
    classes.push('text-white hover:bg-amber-400/10')
  }
  
  return classes.join(' ')
}

const formatSelectedDate = (date: Date) => {
  return format(date, 'EEEE, MMMM d, yyyy')
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const datePicker = target.closest('.luxury-date-picker')
  if (!datePicker || !datePicker.contains(target)) {
    closeCalendar()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  selectedDate.value = newValue
})
</script>

<style scoped>
.luxury-date-input {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(55, 65, 81, 0.8));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(156, 163, 175, 0.3);
  transition: all 0.3s ease;
}

.luxury-date-input:hover {
  border-color: #fbbf24;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.1);
}

.calendar-dropdown {
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.day-button {
  position: relative;
  overflow: hidden;
}

.day-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent);
  transition: left 0.5s;
}

.day-button:hover::before {
  left: 100%;
}
</style>