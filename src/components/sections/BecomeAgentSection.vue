<template>
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
    <div class="px-2 x-4 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6 font-royal">
          Become a Global Agent
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
          Travel Agents | DMCs | Lifestyle Consultants | Influencers
        </p>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join the prestigious Egypt In Style global network and unlock a world of opportunity. Whether you're a travel agent, destination management company, lifestyle consultant, or luxury concierge, this is your gateway to:
        </p>
      </div>

      <!-- Value Proposition Cards -->
      <div v-if="route.path === '/become-agent'" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

      <p v-if="route.path === '/become-agent'" class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
        Offer your clients the King Tut Royal Experience and other once-in-a-lifetime journeys across Egypt.
        Backed by world-class hotels, luxury experiences, and AI-powered logistics, this is your chance to elevate your business and grow your revenue—effortlessly.
      </p>
      <p v-if="route.path === '/become-agent'" class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                  <div class="mt-1 text-xs text-muted-foreground">
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
                  <div class="mt-1 text-xs text-muted-foreground">
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
                  <div class="mt-1 text-xs text-muted-foreground">
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
              {{ isSubmitting ? 'Submitting...' : 'Apply Now' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()

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
