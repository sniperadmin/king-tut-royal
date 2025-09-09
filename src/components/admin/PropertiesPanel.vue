<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-4 border-b border-border">
      <h3 class="text-lg font-medium text-foreground">Properties</h3>
      <p class="text-sm text-muted-foreground mt-1">
        {{ selectedSection ? 'Edit section properties' : 'Select a section to edit' }}
      </p>
    </div>

    <!-- No Selection State -->
    <div v-if="!selectedSection" class="flex-1 flex items-center justify-center bg-background">
      <div class="text-center">
        <svg class="h-12 w-12 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <h3 class="text-lg font-medium text-foreground mb-2">No Section Selected</h3>
        <p class="text-muted-foreground text-sm">Click on a section in the canvas to edit its properties.</p>
      </div>
    </div>

    <!-- Properties Form -->
    <div v-else class="flex-1 overflow-y-auto">
      <div class="p-4 space-y-6">
        <!-- Section Info -->
        <div class="bg-muted rounded-lg p-3">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-foreground">{{ formatSectionType(selectedSection.type) }}</h4>
              <p class="text-xs text-muted-foreground">ID: {{ selectedSection.id }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  :checked="selectedSection.visible"
                  @change="updateVisibility"
                  class="rounded border-border text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                <span class="ml-2 text-foreground">Visible</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Content Properties -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-foreground uppercase tracking-wide">Content</h4>
          
          <!-- Title -->
          <div v-if="hasContentField('title')">
            <label class="block text-sm font-medium text-foreground mb-1">Title</label>
            <input
              type="text"
              :value="selectedSection.content.title || ''"
              @input="updateContent('title', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter title..."
            >
          </div>

          <!-- Subtitle -->
          <div v-if="hasContentField('subtitle')">
            <label class="block text-sm font-medium text-foreground mb-1">Subtitle</label>
            <input
              type="text"
              :value="selectedSection.content.subtitle || ''"
              @input="updateContent('subtitle', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter subtitle..."
            >
          </div>

          <!-- Description/Text -->
          <div v-if="hasContentField('description') || hasContentField('text')">
            <label class="block text-sm font-medium text-foreground mb-1">
              {{ hasContentField('description') ? 'Description' : 'Text' }}
            </label>
            <textarea
              :value="selectedSection.content.description || selectedSection.content.text || ''"
              @input="updateContent(hasContentField('description') ? 'description' : 'text', ($event.target as HTMLTextAreaElement).value)"
              rows="4"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter description..."
            ></textarea>
          </div>

          <!-- Button Text -->
          <div v-if="hasContentField('buttonText')">
            <label class="block text-sm font-medium text-foreground mb-1">Button Text</label>
            <input
              type="text"
              :value="selectedSection.content.buttonText || ''"
              @input="updateContent('buttonText', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter button text..."
            >
          </div>

          <!-- Button URL -->
          <div v-if="hasContentField('buttonUrl')">
            <label class="block text-sm font-medium text-foreground mb-1">Button URL</label>
            <input
              type="url"
              :value="selectedSection.content.buttonUrl || ''"
              @input="updateContent('buttonUrl', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="https://..."
            >
          </div>

          <!-- Email -->
          <div v-if="hasContentField('email')">
            <label class="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              :value="selectedSection.content.email || ''"
              @input="updateContent('email', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="contact@example.com"
            >
          </div>

          <!-- Phone -->
          <div v-if="hasContentField('phone')">
            <label class="block text-sm font-medium text-foreground mb-1">Phone</label>
            <input
              type="tel"
              :value="selectedSection.content.phone || ''"
              @input="updateContent('phone', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="+1 (555) 123-4567"
            >
          </div>
        </div>

        <!-- Layout Properties -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-foreground uppercase tracking-wide">Layout</h4>
          
          <!-- Columns -->
          <div v-if="supportsColumns">
            <label class="block text-sm font-medium text-foreground mb-1">Columns</label>
            <select
              :value="selectedSection.layout.columns"
              @change="updateLayout('columns', parseInt(($event.target as HTMLSelectElement).value))"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="1">1 Column</option>
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </select>
          </div>
        </div>

        <!-- Background Properties -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-foreground uppercase tracking-wide">Background</h4>
          
          <!-- Background Type -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Background Type</label>
            <select
              :value="selectedSection.layout.background.type"
              @change="updateBackgroundType(($event.target as HTMLSelectElement).value as any)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="color">Solid Color</option>
              <option value="gradient">Gradient</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <!-- Color Picker -->
          <div v-if="selectedSection.layout.background.type === 'color'">
            <label class="block text-sm font-medium text-foreground mb-1">Background Color</label>
            <div class="flex items-center space-x-2">
              <input
                type="color"
                :value="selectedSection.layout.background.value"
                @input="updateBackground('value', ($event.target as HTMLInputElement).value)"
                class="h-10 w-16 border border-input rounded cursor-pointer"
              >
              <input
                type="text"
                :value="selectedSection.layout.background.value"
                @input="updateBackground('value', ($event.target as HTMLInputElement).value)"
                class="flex-1 border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="#ffffff"
              >
            </div>
          </div>

          <!-- Gradient -->
          <div v-if="selectedSection.layout.background.type === 'gradient'">
            <label class="block text-sm font-medium text-foreground mb-1">Gradient CSS</label>
            <textarea
              :value="selectedSection.layout.background.value"
              @input="updateBackground('value', ($event.target as HTMLTextAreaElement).value)"
              rows="3"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm font-mono text-xs"
              placeholder="linear-gradient(45deg, #ff0000, #0000ff)"
            ></textarea>
          </div>

          <!-- Image URL -->
          <div v-if="selectedSection.layout.background.type === 'image'">
            <label class="block text-sm font-medium text-foreground mb-1">Image URL</label>
            <input
              type="url"
              :value="selectedSection.layout.background.url || ''"
              @input="updateBackground('url', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="https://example.com/image.jpg"
            >
            <button class="mt-2 text-sm text-primary hover:text-primary-foreground">
              Upload Image
            </button>
          </div>

          <!-- Video URL -->
          <div v-if="selectedSection.layout.background.type === 'video'">
            <label class="block text-sm font-medium text-foreground mb-1">Video URL</label>
            <input
              type="url"
              :value="selectedSection.layout.background.url || ''"
              @input="updateBackground('url', ($event.target as HTMLInputElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="https://example.com/video.mp4"
            >
            <button class="mt-2 text-sm text-primary hover:text-primary-foreground">
              Upload Video
            </button>
          </div>
        </div>

        <!-- Styling Properties -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-foreground uppercase tracking-wide">Styling</h4>
          
          <!-- Padding -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Padding</label>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  :value="selectedSection.styling.paddingTop || 0"
                  @input="updateStyling('paddingTop', parseInt(($event.target as HTMLInputElement).value))"
                  class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Top"
                  min="0"
                >
              </div>
              <div>
                <input
                  type="number"
                  :value="selectedSection.styling.paddingBottom || 0"
                  @input="updateStyling('paddingBottom', parseInt(($event.target as HTMLInputElement).value))"
                  class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Bottom"
                  min="0"
                >
              </div>
            </div>
          </div>

          <!-- Text Color -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Text Color</label>
            <div class="flex items-center space-x-2">
              <input
                type="color"
                :value="selectedSection.styling.textColor || '#000000'"
                @input="updateStyling('textColor', ($event.target as HTMLInputElement).value)"
                class="h-10 w-16 border border-input rounded cursor-pointer"
              >
              <input
                type="text"
                :value="selectedSection.styling.textColor || '#000000'"
                @input="updateStyling('textColor', ($event.target as HTMLInputElement).value)"
                class="flex-1 border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="#000000"
              >
            </div>
          </div>

          <!-- Text Alignment -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Text Alignment</label>
            <select
              :value="selectedSection.styling.textAlign || 'left'"
              @change="updateStyling('textAlign', ($event.target as HTMLSelectElement).value)"
              class="block w-full border-input rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-4 border-t border-border">
          <button
            @click="duplicateSection"
            class="w-full mb-2 inline-flex justify-center items-center px-4 py-2 border border-input shadow-sm text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Duplicate Section
          </button>
          
          <button
            @click="deleteSection"
            class="w-full inline-flex justify-center items-center px-4 py-2 border border-destructive shadow-sm text-sm font-medium rounded-md text-destructive-foreground bg-background hover:bg-destructive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive"
          >
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Section
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Section } from '@/composables/admin/usePageBuilder'

interface Props {
  selectedSection: Section | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update-section': [sectionId: string, updates: Partial<Section>]
}>()

const formatSectionType = (type: string) => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const hasContentField = (field: string) => {
  if (!props.selectedSection) return false
  
  const sectionType = props.selectedSection.type
  const contentFields: Record<string, string[]> = {
    hero: ['title', 'subtitle', 'buttonText', 'buttonUrl'],
    content: ['title', 'text'],
    media: ['title', 'description'],
    gallery: ['title'],
    features: ['title', 'subtitle'],
    cta: ['title', 'description', 'buttonText', 'buttonUrl'],
    contact: ['title', 'email', 'phone']
  }
  
  return contentFields[sectionType]?.includes(field) || false
}

const supportsColumns = computed(() => {
  if (!props.selectedSection) return false
  return ['media', 'features', 'gallery'].includes(props.selectedSection.type)
})

const updateVisibility = (event: Event) => {
  if (!props.selectedSection) return
  const target = event.target as HTMLInputElement
  emit('update-section', props.selectedSection.id, { visible: target.checked })
}

const updateContent = (field: string, value: string) => {
  if (!props.selectedSection) return
  emit('update-section', props.selectedSection.id, {
    content: { ...props.selectedSection.content, [field]: value }
  })
}

const updateLayout = (field: string, value: any) => {
  if (!props.selectedSection) return
  emit('update-section', props.selectedSection.id, {
    layout: { ...props.selectedSection.layout, [field]: value }
  })
}

const updateBackground = (field: string, value: string) => {
  if (!props.selectedSection) return
  emit('update-section', props.selectedSection.id, {
    layout: {
      ...props.selectedSection.layout,
      background: { ...props.selectedSection.layout.background, [field]: value }
    }
  })
}

const updateBackgroundType = (type: 'color' | 'image' | 'video' | 'gradient') => {
  if (!props.selectedSection) return
  
  let defaultValue = ''
  let defaultUrl = ''
  
  switch (type) {
    case 'color':
      defaultValue = '#ffffff'
      break
    case 'gradient':
      defaultValue = 'linear-gradient(45deg, #ff0000, #0000ff)'
      break
    case 'image':
    case 'video':
      defaultUrl = ''
      break
  }
  
  emit('update-section', props.selectedSection.id, {
    layout: {
      ...props.selectedSection.layout,
      background: { type, value: defaultValue, url: defaultUrl }
    }
  })
}

const updateStyling = (field: string, value: any) => {
  if (!props.selectedSection) return
  emit('update-section', props.selectedSection.id, {
    styling: { ...props.selectedSection.styling, [field]: value }
  })
}

const duplicateSection = () => {
  if (!props.selectedSection) return
  // This would typically emit an event to the parent to handle duplication
  console.log('Duplicate section:', props.selectedSection.id)
}

const deleteSection = () => {
  if (!props.selectedSection) return
  // This would typically emit an event to the parent to handle deletion
  console.log('Delete section:', props.selectedSection.id)
}
</script>