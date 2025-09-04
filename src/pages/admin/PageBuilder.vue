<template>
  <div class="min-h-screen bg-gray-900">
    <AdminLayout>
      <div class="h-screen flex flex-col">
        <!-- Toolbar -->
        <div class="bg-gray-800 border-b border-gray-700 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <h1 class="text-lg font-semibold text-gray-100">Page Builder</h1>
              <div class="flex items-center space-x-2">
                <select
                  v-model="selectedPage"
                  @change="loadPage"
                  class="block w-40 pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
                >
                  <option value="homepage">Homepage</option>
                  <option value="about">About</option>
                  <option value="contact">Contact</option>
                </select>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div v-if="isLoading" class="flex items-center text-sm text-gray-400">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
              
              <button
                @click="handlePreview"
                class="inline-flex items-center px-3 py-2 border border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              
              <button
                @click="handleSave"
                :disabled="isLoading"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>

        <!-- Main content area -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Left sidebar: Section Library -->
          <SectionLibrary />

          <!-- Canvas area -->
          <CanvasArea />

          <!-- Right sidebar: Properties Panel -->
          <PropertiesPanel />
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import SectionLibrary from '@/components/admin/SectionLibrary.vue'
import CanvasArea from '@/components/admin/CanvasArea.vue'
import PropertiesPanel from '@/components/admin/PropertiesPanel.vue'
import { usePageBuilder } from '@/composables/admin/usePageBuilder'

const route = useRoute()
const { loadPageLayout, savePageLayout, isLoading } = usePageBuilder()

const selectedPage = ref<string>('homepage')

const loadPage = async () => {
  await loadPageLayout(selectedPage.value)
}

const handleSave = async () => {
  await savePageLayout()
}

const handlePreview = () => {
  const previewUrl = `${window.location.origin}/?preview=true&page=${selectedPage.value}`
  window.open(previewUrl, '_blank')
}

onMounted(() => {
  if (route.query.page) {
    selectedPage.value = route.query.page as string
  }
  loadPage()
})
</script>

<style scoped>
/* Add any specific styles for PageBuilder here */
</style>