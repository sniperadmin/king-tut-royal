<template>
  <div class="dynamic-page-renderer">
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
        <p class="text-gray-600">{{ error }}</p>
        <button 
          @click="loadPage" 
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>

    <div v-else>
      <!-- Render each section dynamically -->
      <component
        v-for="section in visibleSections"
        :key="section.id"
        :is="getSectionComponent(section.type)"
        :section="section"
        :preview-mode="previewMode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { usePageBuilder, type Section } from '@/composables/admin/usePageBuilder'

interface Props {
  pageName?: string
  previewMode?: boolean
  sections?: Section[]
}

const props = withDefaults(defineProps<Props>(), {
  pageName: 'homepage',
  previewMode: false,
  sections: undefined
})

const { loadPageLayout, currentLayout, isLoading, error } = usePageBuilder()

// Dynamic component imports for different section types
const sectionComponents = {
  hero: defineAsyncComponent(() => import('@/components/sections/HeroSectionDynamic.vue')),
  text: defineAsyncComponent(() => import('@/components/sections/TextSectionDynamic.vue')),
  gallery: defineAsyncComponent(() => import('@/components/sections/GallerySectionDynamic.vue')),
  video: defineAsyncComponent(() => import('@/components/sections/VideoSectionDynamic.vue')),
  features: defineAsyncComponent(() => import('@/components/sections/FeaturesSectionDynamic.vue')),
  cta: defineAsyncComponent(() => import('@/components/sections/CTASectionDynamic.vue')),
  contact: defineAsyncComponent(() => import('@/components/sections/ContactSectionDynamic.vue')),
  // Fallback for existing static sections
  packages: defineAsyncComponent(() => import('@/components/PackagesSection.vue')),
  booking: defineAsyncComponent(() => import('@/components/BookingSection.vue')),
  'why-choose': defineAsyncComponent(() => import('@/components/WhyChooseSection.vue')),
  media: defineAsyncComponent(() => import('@/components/MediaSliderSection.vue'))
}

// Get the appropriate component for a section type
const getSectionComponent = (type: string) => {
  return sectionComponents[type as keyof typeof sectionComponents] || sectionComponents.text
}

// Get visible sections (either from props or loaded layout)
const visibleSections = computed(() => {
  console.log('DynamicRenderer: currentLayout.value', currentLayout.value)
  console.log('DynamicRenderer: props.sections', props.sections)
  if (props.sections) {
    return props.sections.filter(section => section.visible !== false)
  }
  
  if (currentLayout.value?.sections) {
    return currentLayout.value.sections.filter(section => section.visible !== false)
  }
  
  return []
})

// Load page data
const loadPage = async () => {
  if (!props.sections) {
    await loadPageLayout(props.pageName)
  }
}

onMounted(() => {
  loadPage()
})
</script>

<style scoped>
.dynamic-page-renderer {
  min-height: 100vh;
}
</style>