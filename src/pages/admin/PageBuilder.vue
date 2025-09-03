<template>
  <div class="min-h-screen bg-gray-50">
    <AdminLayout>
      <div class="h-screen flex flex-col">
        <!-- Toolbar -->
        <div class="bg-white border-b border-gray-200 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <h1 class="text-lg font-semibold text-gray-900">Page Builder</h1>
              <div class="flex items-center space-x-2">
                <select
                  v-model="selectedPage"
                  @change="handlePageChange"
                  class="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="homepage">Homepage</option>
                  <option value="about">About</option>
                  <option value="contact">Contact</option>
                </select>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div v-if="isLoading" class="flex items-center text-sm text-gray-500">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saveStatus }}
              </div>
              
              <button
                @click="handlePreview"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              
              <button
                @click="handlePublish"
                :disabled="isLoading"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {{ currentLayout?.is_published ? 'Update Live' : 'Publish' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Main Builder Interface -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Left Panel - Section Library -->
          <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
            <SectionLibrary @add-section="handleAddSection" />
          </div>

          <!-- Center Panel - Canvas -->
          <div class="flex-1 bg-gray-100 overflow-auto">
            <CanvasArea
              :sections="sections"
              :selected-section="selectedSection"
              @select-section="handleSelectSection"
              @move-section="handleMoveSection"
              @remove-section="handleRemoveSection"
              @toggle-visibility="handleToggleVisibility"
              @add-section-at="handleAddSectionAt"
            />
          </div>

          <!-- Right Panel - Properties -->
          <div class="w-80 bg-white border-l border-gray-200 flex flex-col">
            <PropertiesPanel
              :selected-section="selectedSection"
              @update-section="handleUpdateSection"
            />
          </div>
        </div>

        <!-- Error Toast -->
        <div
          v-if="error"
          class="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            {{ error }}
            <button @click="error = null" class="ml-2 text-red-500 hover:text-red-700">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </path>
            </svg>
          </button>
        </div>

        <!-- Success Toast -->
        <div
          v-if="successMessage"
          class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ successMessage }}
            <button @click="successMessage = null" class="ml-2 text-green-500 hover:text-green-700">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </path>
            </svg>
          </button>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import SectionLibrary from '@/components/admin/SectionLibrary.vue'
import CanvasArea from '@/components/admin/CanvasArea.vue'
import PropertiesPanel from '@/components/admin/PropertiesPanel.vue'
import { usePageBuilder, type Section } from '@/composables/admin/usePageBuilder'
import type { SectionTemplate } from '@/composables/admin/useSectionTemplates'

const {
  currentLayout,
  sections,
  selectedSection,
  isLoading,
  error,
  loadPageLayout,
  savePageLayout,
  addSection,
  removeSection,
  updateSection,
  moveSection,
  selectSection,
  toggleSectionVisibility
} = usePageBuilder()

const selectedPage = ref('homepage')
const saveStatus = ref('')
const successMessage = ref<string | null>(null)

// Auto-save functionality
let autoSaveTimeout: NodeJS.Timeout | null = null

const triggerAutoSave = () => {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
  autoSaveTimeout = setTimeout(async () => {
    saveStatus.value = 'Auto-saving...'
    await handleSave(false)
  }, 2000)
}

// Watch for changes to trigger auto-save
watch(sections, () => {
  triggerAutoSave()
}, { deep: true })

onMounted(async () => {
  await loadPageLayout(selectedPage.value)
})

const handlePageChange = async () => {
  await loadPageLayout(selectedPage.value)
}

const handleAddSection = (template: SectionTemplate, index?: number) => {
  addSection(template.template, index)
  triggerAutoSave()
}

const handleAddSectionAt = (template: SectionTemplate, index: number) => {
  addSection(template.template, index)
  triggerAutoSave()
}

const handleSelectSection = (section: Section | null) => {
  selectSection(section)
}

const handleMoveSection = (fromIndex: number, toIndex: number) => {
  moveSection(fromIndex, toIndex)
  triggerAutoSave()
}

const handleRemoveSection = (sectionId: string) => {
  removeSection(sectionId)
  triggerAutoSave()
}

const handleToggleVisibility = (sectionId: string) => {
  toggleSectionVisibility(sectionId)
  triggerAutoSave()
}

const handleUpdateSection = (sectionId: string, updates: Partial<Section>) => {
  updateSection(sectionId, updates)
  triggerAutoSave()
}

const handleSave = async (showMessage = true) => {
  if (!currentLayout.value) return
  
  saveStatus.value = 'Saving...'
  const result = await savePageLayout()
  
  if (result?.success) {
    saveStatus.value = 'Saved'
    if (showMessage) {
      successMessage.value = 'Page saved successfully!'
      setTimeout(() => {
        successMessage.value = null
      }, 3000)
    }
  } else {
    saveStatus.value = 'Error saving'
  }
  
  setTimeout(() => {
    saveStatus.value = ''
  }, 2000)
}

const handlePreview = () => {
  // Open preview in new tab
  window.open('/', '_blank')
}

const handlePublish = async () => {
  if (!currentLayout.value) return
  
  // Update the published status
  currentLayout.value.is_published = true
  
  const result = await savePageLayout()
  if (result?.success) {
    successMessage.value = 'Page published successfully!'
    setTimeout(() => {
      successMessage.value = null
    }, 3000)
  }
}
</script>