<template>
  <div class="h-full flex flex-col">
    <!-- Canvas Header -->
    <div class="bg-white border-b border-gray-200 px-4 py-3">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Page Canvas</h3>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">{{ sections.length }} sections</span>
          <div class="flex items-center space-x-1">
            <button
              @click="zoomLevel = Math.max(0.5, zoomLevel - 0.1)"
              class="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="text-xs text-gray-500 min-w-[3rem] text-center">{{ Math.round(zoomLevel * 100) }}%</span>
            <button
              @click="zoomLevel = Math.min(1.5, zoomLevel + 0.1)"
              class="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas Content -->
    <div class="flex-1 overflow-auto bg-gray-100 p-4">
      <div
        class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }"
      >
        <!-- Empty State -->
        <div
          v-if="sections.length === 0"
          class="min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg m-4"
          @drop="handleDrop($event, 0)"
          @dragover.prevent
          @dragenter.prevent
        >
          <svg class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Start Building Your Page</h3>
          <p class="text-gray-500 text-center max-w-sm">
            Drag sections from the library on the left to start building your page layout.
          </p>
        </div>

        <!-- Sections List -->
        <VueDraggable
          v-else
          v-model="sectionsModel"
          :animation="200"
          ghost-class="ghost"
          chosen-class="chosen"
          drag-class="drag"
          @start="onDragStart"
          @end="onDragEnd"
          class="min-h-full"
        >
          <template v-for="(section, index) in sections" :key="section.id">
            <!-- Drop Zone Above Section -->
            <div
              v-if="showDropZones"
              class="h-2 bg-indigo-100 border-2 border-dashed border-indigo-300 mx-4 rounded opacity-0 transition-opacity duration-200"
              :class="{ 'opacity-100': isDragOver === index }"
              @drop="handleDrop($event, index)"
              @dragover.prevent="isDragOver = index"
              @dragleave="isDragOver = null"
              @dragenter.prevent
            ></div>

            <!-- Section Item -->
            <div
              class="relative group"
              :class="{
                'ring-2 ring-indigo-500 ring-opacity-50': selectedSection?.id === section.id,
                'opacity-50': !section.visible
              }"
              @click="$emit('select-section', section)"
            >
              <!-- Section Content Preview -->
              <div class="relative bg-white border-l-4 border-transparent group-hover:border-indigo-300 transition-colors duration-150">
                <SectionPreview :section="section" />
                
                <!-- Section Overlay Controls -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-150">
                  <!-- Top Controls -->
                  <div class="absolute top-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <div class="flex items-center space-x-2">
                      <!-- Drag Handle -->
                      <div class="drag-handle cursor-move bg-white rounded p-1 shadow-sm">
                        <svg class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>
                      </div>
                      
                      <!-- Section Type Badge -->
                      <span class="bg-white text-gray-700 text-xs px-2 py-1 rounded shadow-sm">
                        {{ formatSectionType(section.type) }}
                      </span>
                    </div>

                    <div class="flex items-center space-x-1">
                      <!-- Visibility Toggle -->
                      <button
                        @click.stop="$emit('toggle-visibility', section.id)"
                        class="bg-white rounded p-1 shadow-sm hover:bg-gray-50"
                        :title="section.visible ? 'Hide section' : 'Show section'"
                      >
                        <svg
                          v-if="section.visible"
                          class="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg
                          v-else
                          class="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3.122-3.122L12 12m0 0l3.878 3.878M12 12l6.878-6.878" />
                        </svg>
                      </button>

                      <!-- Delete Button -->
                      <button
                        @click.stop="handleDeleteSection(section.id)"
                        class="bg-white rounded p-1 shadow-sm hover:bg-red-50 text-red-600"
                        title="Delete section"
                      >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add Section Button (Between Sections) -->
              <div
                v-if="index < sections.length - 1"
                class="relative h-8 flex items-center justify-center group-hover:bg-gray-50"
              >
                <button
                  @click="showAddSectionModal(index + 1)"
                  class="opacity-0 group-hover:opacity-100 bg-indigo-600 text-white rounded-full p-1 hover:bg-indigo-700 transition-all duration-150 shadow-sm"
                  title="Add section here"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </template>

          <!-- Final Drop Zone -->
          <div
            v-if="showDropZones && sections.length > 0"
            class="h-2 bg-indigo-100 border-2 border-dashed border-indigo-300 mx-4 rounded opacity-0 transition-opacity duration-200"
            :class="{ 'opacity-100': isDragOver === sections.length }"
            @drop="handleDrop($event, sections.length)"
            @dragover.prevent="isDragOver = sections.length"
            @dragleave="isDragOver = null"
            @dragenter.prevent
          ></div>
        </VueDraggable>

        <!-- Add Section at End -->
        <div v-if="sections.length > 0" class="p-4 text-center border-t border-gray-200">
          <button
            @click="showAddSectionModal(sections.length)"
            class="inline-flex items-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Section
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="showDeleteModal = false"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Delete Section</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete this section? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-center space-x-3 mt-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { Section } from '@/composables/admin/usePageBuilder'
import type { SectionTemplate } from '@/composables/admin/useSectionTemplates'
import SectionPreview from './SectionPreview.vue'

interface Props {
  sections: Section[]
  selectedSection: Section | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'select-section': [section: Section | null]
  'move-section': [fromIndex: number, toIndex: number]
  'remove-section': [sectionId: string]
  'toggle-visibility': [sectionId: string]
  'add-section-at': [template: SectionTemplate, index: number]
}>()

const zoomLevel = ref(1)
const showDropZones = ref(false)
const isDragOver = ref<number | null>(null)
const showDeleteModal = ref(false)
const sectionToDelete = ref<string | null>(null)

const sectionsModel = computed({
  get: () => props.sections,
  set: (newSections: Section[]) => {
    // Handle reordering
    const oldSections = props.sections
    for (let i = 0; i < newSections.length; i++) {
      const newSection = newSections[i]
      const oldIndex = oldSections.findIndex(s => s.id === newSection.id)
      if (oldIndex !== i) {
        emit('move-section', oldIndex, i)
        break
      }
    }
  }
})

const formatSectionType = (type: string) => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const onDragStart = () => {
  showDropZones.value = true
}

const onDragEnd = () => {
  showDropZones.value = false
  isDragOver.value = null
}

const handleDrop = (event: DragEvent, index: number) => {
  event.preventDefault()
  showDropZones.value = false
  isDragOver.value = null

  if (event.dataTransfer) {
    try {
      const templateData = event.dataTransfer.getData('application/json')
      if (templateData) {
        const template: SectionTemplate = JSON.parse(templateData)
        emit('add-section-at', template, index)
      }
    } catch (error) {
      console.error('Error parsing dropped template:', error)
    }
  }
}

const handleDeleteSection = (sectionId: string) => {
  sectionToDelete.value = sectionId
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (sectionToDelete.value) {
    emit('remove-section', sectionToDelete.value)
  }
  showDeleteModal.value = false
  sectionToDelete.value = null
}

const showAddSectionModal = (index: number) => {
  // For now, we'll emit an event that the parent can handle
  // In a full implementation, this might open a modal to select a template
  console.log('Add section at index:', index)
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}

.chosen {
  opacity: 0.8;
}

.drag {
  transform: rotate(5deg);
}

.drag-handle {
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}
</style>