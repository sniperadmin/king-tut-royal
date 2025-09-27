<template>
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
    <div class="x-4 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6 font-royal">
          Become a Global Partner
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
          Travel Agents | DMCs | Lifestyle Consultants | Influencers
        </p>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join the prestigious Egypt In Style global network and unlock a world of opportunity. Whether you're a travel agent, destination management company, lifestyle consultant, or luxury concierge, this is your gateway to:
        </p>
      </div>

      <!-- Value Proposition Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Gem class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Premium VIP Travel Packages</h3>
          <p class="text-muted-foreground">Access to exclusive luxury travel experiences and VIP packages that set you apart from the competition.</p>
        </div>

        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <DollarSign class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Attractive Commissions & High Earning Potential</h3>
          <p class="text-muted-foreground">Earn competitive commissions on luxury bookings with our transparent partnership model and high earning potential.</p>
        </div>

        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Globe class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Global Collaboration from Any Country</h3>
          <p class="text-muted-foreground">Work with us from anywhere in the world and collaborate globally with our international network of partners.</p>
        </div>

        <div class="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
          <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Trophy class="w-6 h-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Partnership with Egypt's Most Iconic Tourism Experience</h3>
          <p class="text-muted-foreground">Partner with Egypt In Style, the premier luxury travel brand offering Egypt's most exclusive and iconic tourism experiences.</p>
        </div>
      </div>

      <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
        Offer your clients the King Tut Royal Experience and other once-in-a-lifetime journeys across Egypt.
        Backed by world-class hotels, luxury experiences, and AI-powered logistics, this is your chance to elevate your business and grow your revenue—effortlessly.
      </p>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Apply now and become a certified Egypt In Style agent.
        Let your clients travel like royalty — and earn like one, too.
      </p>

      <!-- Form Section -->
      <div class="max-w-2xl mx-auto form-font">
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
                WhatsApp Number *
              </label>
              <PhoneInput
                v-model="formData.phoneNumber"
                :inputOptions="{
                  id: 'phoneNumber',
                  required: true,
                  placeholder: 'Enter your WhatsApp number',
                  class: 'w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200'
                }"
              />
            </div>

            <!-- Social Media Profiles -->
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label for="instagram" class="block text-sm font-medium text-foreground mb-2">
                  Instagram Username *
                </label>
                <div class="relative">
                  <input
                    id="instagram"
                    v-model="formData.instagram"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    :placeholder="formData.instagram ? `instagram.com/${formData.instagram}` : 'Enter username only (e.g., johnsmith)'"
                  >
                  <div v-if="formData.instagram" class="mt-1 text-xs text-muted-foreground">
                    Preview: instagram.com/{{ formData.instagram }}
                  </div>
                </div>
              </div>

              <div>
                <label for="linkedin" class="block text-sm font-medium text-foreground mb-2">
                  LinkedIn Username (Optional)
                </label>
                <div class="relative">
                  <input
                    id="linkedin"
                    v-model="formData.linkedin"
                    type="text"
                    class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    :placeholder="formData.linkedin ? `linkedin.com/in/${formData.linkedin}` : 'Enter username only (e.g., johnsmith)'"
                  >
                  <div v-if="formData.linkedin" class="mt-1 text-xs text-muted-foreground">
                    Preview: linkedin.com/in/{{ formData.linkedin }}
                  </div>
                </div>
              </div>

              <div>
                <label for="x" class="block text-sm font-medium text-foreground mb-2">
                  X Username (Optional)
                </label>
                <div class="relative">
                  <input
                    id="x"
                    v-model="formData.x"
                    type="text"
                    class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    :placeholder="formData.x ? `x.com/${formData.x}` : 'Enter username only (e.g., johnsmith)'"
                  >
                  <div v-if="formData.x" class="mt-1 text-xs text-muted-foreground">
                    Preview: x.com/{{ formData.x }}
                  </div>
                </div>
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
                type="text"
                class="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="yourwebsite.com"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import AppLayout from '@/components/AppLayout.vue'
import PhoneInput from '@/components/ui/PhoneInput.vue'
import { Gem, DollarSign, Globe, Trophy } from 'lucide-vue-next'

interface AgentFormData {
  fullName: string
  companyName: string
  phoneNumber: string
  linkedin: string
  instagram: string
  x: string
  website: string
  message: string
}

onMounted(() => {
  window.scrollTo(0, 0)
})

const { toast } = useToast()

const formData = ref<AgentFormData>({
  fullName: '',
  companyName: '',
  phoneNumber: '',
  linkedin: '',
  instagram: '',
  x: '',
  website: '',
  message: ''
})

const isSubmitting = ref(false)

const formatWhatsAppMessage = (data: AgentFormData): string => {
  const message = `🎯 *NEW AGENT APPLICATION* 🎯

👤 *Full Name:* ${data.fullName}
🏢 *Company:* ${data.companyName}
📱 *WhatsApp:* ${data.phoneNumber}

🔗 *Social Media Profiles:*
• LinkedIn: ${data.linkedin}
• Instagram: ${data.instagram}
• X: ${data.x}

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
    if (!formData.value.fullName || !formData.value.companyName || 
        !formData.value.phoneNumber || !formData.value.instagram) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields marked with *',
        variant: 'destructive'
      })
      return
    }


    // Helper function to validate usernames
    const validateUsername = (username: string): boolean => {
      if (!username) return true // Optional fields can be empty
      // Username validation: alphanumeric, underscores, dots, hyphens (common social media username patterns)
      const usernameRegex = /^[a-zA-Z0-9._-]+$/
      return usernameRegex.test(username)
    }

    // Helper function to construct full URLs from usernames
    const constructSocialUrls = (data: any) => {
      return {
        instagram: data.instagram ? `https://instagram.com/${data.instagram}` : '',
        linkedin: data.linkedin ? `https://linkedin.com/in/${data.linkedin}` : '',
        x: data.x ? `https://x.com/${data.x}` : '',
        website: data.website ? (data.website.startsWith('http') ? data.website : `https://${data.website}`) : ''
      }
    }

    // Validate Instagram username (required)
    if (!validateUsername(formData.value.instagram)) {
      toast({
        title: 'Invalid Instagram Username',
        description: 'Please enter a valid Instagram username (letters, numbers, dots, underscores, and hyphens only)',
        variant: 'destructive'
      })
      return
    }

    // Validate optional social media usernames
    const optionalFields = [
      { username: formData.value.linkedin, name: 'LinkedIn' },
      { username: formData.value.x, name: 'X' }
    ]
    
    for (const { username, name } of optionalFields) {
      if (username && !validateUsername(username)) {
        toast({
          title: `Invalid ${name} Username`,
          description: `Please enter a valid ${name} username (letters, numbers, dots, underscores, and hyphens only)`,
          variant: 'destructive'
        })
        return
      }
    }

    // Validate website URL separately (if provided)
    if (formData.value.website) {
      const websiteUrl = formData.value.website.startsWith('http') ? formData.value.website : `https://${formData.value.website}`
      const urlRegex = /^https?:\/\/.+\..+/
      if (!urlRegex.test(websiteUrl)) {
        toast({
          title: 'Invalid Website URL',
          description: 'Please enter a valid website URL',
          variant: 'destructive'
        })
        return
      }
    }

    // Construct full URLs for WhatsApp message
    const socialUrls = constructSocialUrls(formData.value)

    // Create data object with full URLs for WhatsApp message
    const messageData = {
      ...formData.value,
      instagram: socialUrls.instagram,
      linkedin: socialUrls.linkedin,
      x: socialUrls.x,
      website: socialUrls.website
    }

    // Format WhatsApp message
    const whatsappMessage = formatWhatsAppMessage(messageData)
    
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
      companyName: '',
      phoneNumber: '',
      linkedin: '',
      instagram: '',
      x: '',
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

<style scoped>
/* Font normalization for the entire component */
.form-font {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

/* Smaller placeholder text for form inputs */
input::placeholder,
textarea::placeholder {
  font-size: 0.75rem; /* 12px - smaller than default */
  color: rgb(156 163 175); /* text-gray-400 equivalent */
}

/* Ensure input text remains normal size */
input,
textarea {
  font-size: 1rem; /* 16px - normal size for actual input text */
}
</style>
