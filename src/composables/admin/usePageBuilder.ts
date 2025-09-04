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
    loadPageLayout: async (pageName: string) => {
      try {
        const { data: pageLayout, error } = await supabase.functions.invoke(
          'get-page-layout',
          { body: { page: pageName } }
        )
    
        if (error) {
          throw new Error(error.message)
        }
    
        // Add a null check for pageLayout.data.sections
        if (!pageLayout || !pageLayout.data || !Array.isArray(pageLayout.data.sections)) {
          console.warn('Page layout not found or sections is not an array. Initializing with empty layout.')
          sections.value = []
          return
        }

        // Filter out any invalid sections and ensure required properties exist
        const validSections: Section[] = pageLayout.data.sections.filter((section: any) => {
          if (!section || typeof section !== 'object') {
            console.warn('Invalid section found (not an object), skipping:', section);
            return false;
          }
          if (typeof section.id !== 'string' || section.id.length === 0) {
            console.warn('Invalid section ID, skipping:', section);
            return false;
          }
          if (typeof section.type !== 'string' || section.type.length === 0) {
            console.warn('Invalid section type, skipping:', section);
            return false;
          }
          if (typeof section.visible !== 'boolean') {
            console.warn('Invalid section visibility, skipping', section);
            return false;
          }
          if (!section.layout || typeof section.layout !== 'object') {
            console.warn('Invalid section layout, skipping:', section);
            return false;
          }
          if (!section.content || typeof section.content !== 'object') {
            console.warn('Invalid section content, skipping:', section);
            return false;
          }
          if (!section.styling || typeof section.styling !== 'object') {
            console.warn('Invalid section styling, skipping:', section);
            return false;
          }
          // Check nested properties for background
          if (!section.layout.background || typeof section.layout.background !== 'object') {
            console.warn('Invalid section background object, skipping:', section);
            return false;
          }
          if (typeof section.layout.background.value !== 'string') {
            console.warn('Invalid section background value, skipping:', section);
            return false;
          }

          return true;
        });

        sections.value = validSections;
      } catch (error) {
        console.error('Error loading page layout:', error)
        throw error
      }
    },
    savePageLayout,
    addSection,
    removeSection,
    updateSection,
    moveSection,
    selectSection,
    toggleSectionVisibility
  }
}