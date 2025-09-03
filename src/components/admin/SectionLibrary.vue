<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Section Library</h3>
      <p class="text-sm text-gray-500 mt-1">Drag sections to the canvas</p>
    </div>

    <!-- Search and Filter -->
    <div class="p-4 border-b border-gray-200">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search sections..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="mt-3">
        <select
          v-model="selectedCategory"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ formatCategoryName(category) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <svg class="animate-spin h-8 w-8 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-sm text-gray-500 mt-2">Loading templates...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <svg class="h-8 w-8 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p class="text-sm text-red-600 mt-2">{{ error }}</p>
        <button
          @click="loadTemplates()"
          class="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          Try again
        </button>
      </div>
    </div>

    <!-- Templates List -->
    <div v-else class="flex-1 overflow-y-auto">
      <div v-if="filteredTemplates.length === 0" class="p-4 text-center">
        <p class="text-sm text-gray-500">No templates found</p>
      </div>
      
      <div v-else class="p-4 space-y-4">
        <div v-for="category in groupedTemplates" :key="category.name">
          <h4 class="text-sm font-medium text-gray-900 mb-2">
            {{ formatCategoryName(category.name) }}
          </h4>
          
          <div class="space-y-2">
            <div
              v-for="template in category.templates"
              :key="template.id"
              :draggable="true"
              @dragstart="handleDragStart($event, template)"
              @dragend="handleDragEnd"
              class="group relative bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:border-indigo-300 hover:shadow-sm transition-all duration-150"
            >
              <!-- Template Preview -->
              <div class="aspect-w-16 aspect-h-9 mb-2">
                <div
                  v-if="template.preview_image"
                  class="w-full h-16 bg-gray-100 rounded border overflow-hidden"
                >
                  <img
                    :src="template.preview_image"
                    :alt="template.name"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div
                  v-else
                  class="w-full h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded border flex items-center justify-center"
                >
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- Template Info -->
              <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <h5 class="text-sm font-medium text-gray-900 truncate">{{ template.name }}</h5>
                  <p class="text-xs text-gray-500">{{ formatCategoryName(template.category) }}</p>
                </div>
                
                <!-- Drag Handle -->
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                  </svg>
                </div>
              </div>

              <!-- Add Button (Alternative to drag) -->
              <button
                @click="$emit('add-section', template)"
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-indigo-600 text-white rounded-full p-1 hover:bg-indigo-700 transition-all duration-150"
              >
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSectionTemplates, type SectionTemplate } from '@/composables/admin/useSectionTemplates'

const emit = defineEmits<{
  'add-section': [template: SectionTemplate, index?: number]
}>()

const {
  templates,
  categories,
  isLoading,
  error,
  loadTemplates,
  getTemplatesByCategory
} = useSectionTemplates()

const searchQuery = ref('')
const selectedCategory = ref('')
const draggedTemplate = ref<SectionTemplate | null>(null)

onMounted(() => {
  loadTemplates()
})

const filteredTemplates = computed(() => {
  let filtered = templates.value

  // Filter by category
  if (selectedCategory.value) {
    filtered = getTemplatesByCategory(selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(template =>
      template.name.toLowerCase().includes(query) ||
      template.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

const groupedTemplates = computed(() => {
  const groups: { name: string; templates: SectionTemplate[] }[] = []
  const categoryMap = new Map<string, SectionTemplate[]>()

  // Group templates by category
  filteredTemplates.value.forEach(template => {
    if (!categoryMap.has(template.category)) {
      categoryMap.set(template.category, [])
    }
    categoryMap.get(template.category)!.push(template)
  })

  // Convert to array and sort
  categoryMap.forEach((templates, category) => {
    groups.push({
      name: category,
      templates: templates.sort((a, b) => a.name.localeCompare(b.name))
    })
  })

  return groups.sort((a, b) => a.name.localeCompare(b.name))
})

const formatCategoryName = (category: string) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const handleDragStart = (event: DragEvent, template: SectionTemplate) => {
  draggedTemplate.value = template
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('application/json', JSON.stringify(template))
  }
}

const handleDragEnd = () => {
  draggedTemplate.value = null
}
</script>