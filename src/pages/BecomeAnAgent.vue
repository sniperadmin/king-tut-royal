<template>
<AppLayout>
  <div class="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
    <div class="container mx-auto px-4 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6 font-royal">
          Become an Agent
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join our exclusive network of luxury travel agents and unlock premium opportunities. 
          Partner with Egypt's most prestigious travel brand and offer your clients 
          unparalleled luxury experiences.
        </p>
      </div>

      <!-- Value Proposition Cards -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Premium Commissions</h3>
          <p class="text-muted-foreground">Earn competitive commissions on luxury bookings with our transparent partnership model.</p>
        </div>

        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Exclusive Access</h3>
          <p class="text-muted-foreground">Get priority access to our premium packages and exclusive luxury travel experiences.</p>
        </div>

        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Dedicated Support</h3>
          <p class="text-muted-foreground">Receive personalized support from our dedicated agent partnership team.</p>
        </div>
      </div>

      <!-- Form Section -->
      <div class="max-w-2xl mx-auto">
        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h2 class="text-2xl font-bold text-primary mb-6 text-center">
            Apply to Become an Agent
          </h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Required Fields -->
            <div>
              <label for="fullName" class="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                required
                class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              >
            </div>

            <div>
              <label for="companyName" class="block text-sm font-medium text-foreground mb-2">
                Company Name *
              </label>
              <input
                id="companyName"
                v-model="formData.companyName"
                type="text"
                required
                class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your company name"
              >
            </div>

            <div>
              <label for="phoneNumber" class="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <PhoneInput
                v-model="formData.phoneNumber"
                :inputOptions="{
                  id: 'phoneNumber',
                  required: true,
                  placeholder: 'Enter your phone number',
                  class: 'w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200'
                }"
              />
            </div>

            <!-- Social Media Profiles -->
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label for="linkedin" class="block text-sm font-medium text-foreground mb-2">
                  LinkedIn Profile *
                </label>
                <input
                  id="linkedin"
                  v-model="formData.linkedin"
                  type="url"
                  required
                  class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="https://linkedin.com/in/username"
                >
              </div>

              <div>
                <label for="instagram" class="block text-sm font-medium text-foreground mb-2">
                  Instagram Profile *
                </label>
                <input
                  id="instagram"
                  v-model="formData.instagram"
                  type="url"
                  required
                  class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="https://instagram.com/username"
                >
              </div>

              <div>
                <label for="facebook" class="block text-sm font-medium text-foreground mb-2">
                  Facebook Profile *
                </label>
                <input
                  id="facebook"
                  v-model="formData.facebook"
                  type="url"
                  required
                  class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="https://facebook.com/username"
                >
              </div>
            </div>

            <!-- Optional Fields -->
            <div>
              <label for="website" class="block text-sm font-medium text-foreground mb-2">
                Website URL (Optional)
              </label>
              <input
                id="website"
                v-model="formData.website"
                type="url"
                class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="https://yourwebsite.com"
              >
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-foreground mb-2">
                Message / Notes (Optional)
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us about your experience, target market, or any specific requirements..."
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Submitting...' : 'Apply Now via WhatsApp' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="text-center mt-16">
        <p class="text-muted-foreground mb-4">
          Prefer to contact us directly?
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/20123456789"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.413 3.106"/>
            </svg>
            WhatsApp Direct
          </a>
          <a
            href="mailto:agents@egyptinstyle.com"
            class="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Us
          </a>
        </div>
      </div>
    </div>
  </div>
</AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/AppLayout.vue'
import PhoneInput from '@/components/ui/PhoneInput.vue'

interface AgentFormData {
  fullName: string
  email: string
  companyName: string
  phoneNumber: string
  linkedin: string
  instagram: string
  facebook: string
  website: string
  message: string
}

onMounted(() => {
  window.scrollTo(0, 0)
})

const { toast } = useToast()

const formData = ref<AgentFormData>({
  fullName: '',
  email: '',
  companyName: '',
  phoneNumber: '',
  linkedin: '',
  instagram: '',
  facebook: '',
  website: '',
  message: ''
})

const isSubmitting = ref(false)

const formatWhatsAppMessage = (data: AgentFormData): string => {
  const message = `🎯 *NEW AGENT APPLICATION* 🎯

👤 *Full Name:* ${data.fullName}
📧 *Email:* ${data.email}
🏢 *Company:* ${data.companyName}
📱 *Phone:* ${data.phoneNumber}

🔗 *Social Media Profiles:*
• LinkedIn: ${data.linkedin}
• Instagram: ${data.instagram}
• Facebook: ${data.facebook}

🌐 *Website:* ${data.website || 'Not provided'}

💬 *Message:*
${data.message || 'No additional message provided'}

---
📅 *Submission Date:* ${new Date().toLocaleString()}
🕐 *Time Zone:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}`

  return encodeURIComponent(message)
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Validate form data
    if (!formData.value.fullName || !formData.value.email || !formData.value.companyName || 
        !formData.value.phoneNumber || !formData.value.linkedin || 
        !formData.value.instagram || !formData.value.facebook) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields marked with *',
        variant: 'destructive'
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      })
      return
    }

    // Validate social media URLs
    const urlRegex = /^https?:\/\/.+/
    const socialUrls = [formData.value.linkedin, formData.value.instagram, formData.value.facebook]
    
    for (const url of socialUrls) {
      if (!urlRegex.test(url)) {
        toast({
          title: 'Invalid Social Media URL',
          description: 'Please enter valid URLs for social media profiles (starting with http:// or https://)',
          variant: 'destructive'
        })
        return
      }
    }

    // Format WhatsApp message
    const whatsappMessage = formatWhatsAppMessage(formData.value)
    
    // WhatsApp Business API number (replace with your actual number)
    const whatsappNumber = '201270389777' // TODO: Replace with actual WhatsApp Business number
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Show success message
    toast({
      title: 'Application Submitted Successfully!',
      description: 'Your application has been sent via WhatsApp. We will contact you within 24 hours.',
      variant: 'default'
    })
    
    // Reset form
    formData.value = {
      fullName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      website: '',
      message: ''
    }
    
  } catch (error) {
    toast({
      title: 'Submission Error',
      description: 'An error occurred while submitting your application. Please try again.',
      variant: 'destructive'
    })
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>