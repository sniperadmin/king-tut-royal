import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export interface Section {
  id: string
  type: string
  visible: boolean
  layout: {
    columns: number
    grid: string
    background: {
      type: 'color' | 'image' | 'video' | 'gradient'
      value: string
      url?: string
    }
  }
  content: Record<string, any>
  styling: Record<string, any>
}

export interface PageLayout {
  id?: string
  page_name: string
  sections: Section[]
  meta: Record<string, any>
  is_published: boolean
}

export function usePageBuilder() {
  const currentLayout = ref<PageLayout | null>(null)
  const sections = ref<Section[]>([])
  const selectedSection = ref<Section | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Load page layout
  const loadPageLayout = async (pageName: string = 'homepage') => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/get-page-layout?page=${pageName}`, {
        headers: {
          'Authorization': `Bearer ${supabase.supabaseKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Failed to load page layout')

      const result = await response.json()
      currentLayout.value = result.data
      sections.value = result.data.sections || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load page layout'
      console.error('Error loading page layout:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Save page layout
  const savePageLayout = async () => {
    if (!currentLayout.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/save-page-layout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabase.supabaseKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pageName: currentLayout.value.page_name,
          sections: sections.value,
          meta: currentLayout.value.meta,
          isPublished: currentLayout.value.is_published
        })
      })

      if (!response.ok) throw new Error('Failed to save page layout')

      const result = await response.json()
      currentLayout.value = result.data
      return { success: true, message: result.message }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save page layout'
      console.error('Error saving page layout:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Add new section
  const addSection = (template: any, index?: number) => {
    const newSection: Section = {
      id: `section-${Date.now()}-${Math.random().toString(36).substring(2)}`,
      type: template.type,
      visible: true,
      layout: { ...template.layout },
      content: { ...template.content },
      styling: { ...template.styling }
    }

    if (typeof index === 'number') {
      sections.value.splice(index, 0, newSection)
    } else {
      sections.value.push(newSection)
    }

    return newSection
  }

  // Remove section
  const removeSection = (sectionId: string) => {
    const index = sections.value.findIndex(s => s.id === sectionId)
    if (index > -1) {
      sections.value.splice(index, 1)
      if (selectedSection.value?.id === sectionId) {
        selectedSection.value = null
      }
    }
  }

  // Update section
  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    const index = sections.value.findIndex(s => s.id === sectionId)
    if (index > -1) {
      sections.value[index] = { ...sections.value[index], ...updates }
      if (selectedSection.value?.id === sectionId) {
        selectedSection.value = sections.value[index]
      }
    }
  }

  // Move section
  const moveSection = (fromIndex: number, toIndex: number) => {
    const section = sections.value.splice(fromIndex, 1)[0]
    sections.value.splice(toIndex, 0, section)
  }

  // Select section
  const selectSection = (section: Section | null) => {
    selectedSection.value = section
  }

  // Toggle section visibility
  const toggleSectionVisibility = (sectionId: string) => {
    const section = sections.value.find(s => s.id === sectionId)
    if (section) {
      section.visible = !section.visible
    }
  }

  return {
    // State
    currentLayout: computed(() => currentLayout.value),
    sections: computed(() => sections.value),
    selectedSection: computed(() => selectedSection.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // Actions
    loadPageLayout,
    savePageLayout,
    addSection,
    removeSection,
    updateSection,
    moveSection,
    selectSection,
    toggleSectionVisibility
  }
}