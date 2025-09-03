<template>
  <section 
    :class="[
      'relative',
      section.styling?.padding || 'py-16',
      section.styling?.textColor || 'text-gray-900'
    ]"
    :style="backgroundStyle"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div v-if="section.content?.title || section.content?.subtitle" class="text-center mb-12">
        <h2 
          v-if="section.content?.title"
          class="text-3xl font-bold mb-4"
          v-html="section.content.title"
        ></h2>
        <p 
          v-if="section.content?.subtitle"
          class="text-xl text-gray-600 max-w-3xl mx-auto"
          v-html="section.content.subtitle"
        ></p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div>
          <h3 class="text-2xl font-semibold mb-6">Get in Touch</h3>
          
          <div class="space-y-6">
            <!-- Address -->
            <div v-if="section.content?.address" class="flex items-start space-x-4">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4 class="font-medium">Address</h4>
                <p class="text-gray-600" v-html="section.content.address"></p>
              </div>
            </div>

            <!-- Phone -->
            <div v-if="section.content?.phone" class="flex items-start space-x-4">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h4 class="font-medium">Phone</h4>
                <a :href="`tel:${section.content.phone}`" class="text-blue-600 hover:text-blue-800">
                  {{ section.content.phone }}
                </a>
              </div>
            </div>

            <!-- Email -->
            <div v-if="section.content?.email" class="flex items-start space-x-4">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 class="font-medium">Email</h4>
                <a :href="`mailto:${section.content.email}`" class="text-blue-600 hover:text-blue-800">
                  {{ section.content.email }}
                </a>
              </div>
            </div>

            <!-- Hours -->
            <div v-if="section.content?.hours" class="flex items-start space-x-4">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 class="font-medium">Hours</h4>
                <p class="text-gray-600" v-html="section.content.hours"></p>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div v-if="section.content?.socialLinks && section.content.socialLinks.length > 0" class="mt-8">
            <h4 class="font-medium mb-4">Follow Us</h4>
            <div class="flex space-x-4">
              <a
                v-for="(social, index) in section.content.socialLinks"
                :key="index"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <span class="sr-only">{{ social.platform }}</span>
                <!-- Social icon placeholder -->
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <h3 class="text-2xl font-semibold mb-6">Send us a Message</h3>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Section } from '@/composables/admin/usePageBuilder'

interface Props {
  section: Section
  previewMode?: boolean
}

const props = defineProps<Props>()

// Form state
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

// Submit form (placeholder implementation)
const submitForm = async () => {
  isSubmitting.value = true
  
  // In production, this would send the form data to your backend
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    alert('Message sent successfully!')
  } catch (error) {
    alert('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Generate background style
const backgroundStyle = computed(() => {
  const bg = props.section.layout?.background
  if (!bg) return {}

  switch (bg.type) {
    case 'color':
      return { backgroundColor: bg.value || '#ffffff' }
    
    case 'image':
      return {
        backgroundImage: `url(${bg.url || bg.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    
    case 'gradient':
      return { background: bg.value || 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }
    
    default:
      return { backgroundColor: '#ffffff' }
  }
})
</script>