<template>
  <div class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-8">Admin Debug Panel</h1>
      
      <div class="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-white mb-4">Homepage Data Population</h2>
        <p class="text-gray-400 mb-4">Populate the database with current homepage content as dynamic sections.</p>
        
        <button 
          @click="handlePopulateData"
          :disabled="isLoading"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-md mr-4"
        >
          {{ isLoading ? 'Populating...' : 'Populate Homepage Data' }}
        </button>
        
        <button 
          @click="handleTestPageBuilder"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Test Page Builder
        </button>
        
        <div v-if="message" class="mt-4 p-4 rounded-md" :class="messageClass">
          {{ message }}
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-white mb-4">Current Homepage Layout</h2>
        <div v-if="currentLayout">
          <p class="text-gray-400 mb-2">Sections: {{ currentLayout.sections?.length || 0 }}</p>
          <div v-if="currentLayout.sections" class="space-y-2">
            <div 
              v-for="section in currentLayout.sections" 
              :key="section.id"
              class="bg-gray-700 p-3 rounded-md"
            >
              <div class="flex items-center justify-between">
                <span class="text-white font-medium">{{ section.content?.title || section.type }}</span>
                <span class="text-gray-400 text-sm">{{ section.type }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="isLoadingLayout">
          <p class="text-gray-400">Loading layout...</p>
        </div>
        <div v-else>
          <p class="text-gray-400">No layout found. Click "Populate Homepage Data" to create it.</p>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Live Preview Test</h2>
        <p class="text-gray-400 mb-4">Test the dynamic renderer with current homepage content:</p>
        
        <div class="border border-gray-600 rounded-lg overflow-hidden">
          <DynamicRenderer 
            v-if="currentLayout && currentLayout.sections" 
            page-name="homepage" 
            :sections="currentLayout.sections"
            :preview-mode="true"
          />
          <div v-else class="p-8 text-center text-gray-400">
            No dynamic content available. Please populate data first.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DynamicRenderer from '@/components/DynamicRenderer.vue'
import { populateHomepageData } from '@/utils/populateHomepageData'
import { usePageBuilder } from '@/composables/admin/usePageBuilder'

const router = useRouter()
const { loadPageLayout, currentLayout } = usePageBuilder()

const isLoading = ref(false)
const isLoadingLayout = ref(false)
const message = ref('')
const messageClass = ref('')

const handlePopulateData = async () => {
  isLoading.value = true
  message.value = ''
  
  try {
    const result = await populateHomepageData()
    if (result.success) {
      message.value = result.message
      messageClass.value = 'bg-green-900 text-green-200 border border-green-700'
      // Reload the layout after populating
      await loadCurrentLayout()
    } else {
      message.value = result.error || 'Failed to populate data'
      messageClass.value = 'bg-red-900 text-red-200 border border-red-700'
    }
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'Unknown error occurred'
    messageClass.value = 'bg-red-900 text-red-200 border border-red-700'
  } finally {
    isLoading.value = false
  }
}

const handleTestPageBuilder = () => {
  router.push('/admin/builder')
}

const loadCurrentLayout = async () => {
  isLoadingLayout.value = true
  try {
    await loadPageLayout('homepage')
  } catch (error) {
    console.error('Error loading layout:', error)
  } finally {
    isLoadingLayout.value = false
  }
}

onMounted(() => {
  loadCurrentLayout()
})
</script>