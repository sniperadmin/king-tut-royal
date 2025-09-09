import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export interface SectionTemplate {
  id: string
  name: string
  category: string
  template: any
  preview_image?: string
  is_active: boolean
}

export function useSectionTemplates() {
  const templates = ref<SectionTemplate[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Load section templates
  const loadTemplates = async (category?: string) => {
    isLoading.value = true
    error.value = null

    try {
      const url = category 
        ? `${supabase.supabaseUrl}/functions/v1/get-section-templates?category=${category}`
        : `${supabase.supabaseUrl}/functions/v1/get-section-templates`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${supabase.supabaseKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Failed to load section templates')

      const result = await response.json()
      templates.value = result.data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load templates'
      console.error('Error loading section templates:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Get templates by category
  const getTemplatesByCategory = (category: string) => {
    return templates.value.filter(t => t.category === category)
  }

  // Get all categories
  const categories = computed(() => {
    const cats = new Set(templates.value.map(t => t.category))
    return Array.from(cats).sort()
  })

  // Get template by ID
  const getTemplateById = (id: string) => {
    return templates.value.find(t => t.id === id)
  }

  return {
    // State
    templates: computed(() => templates.value),
    categories,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // Actions
    loadTemplates,
    getTemplatesByCategory,
    getTemplateById
  }
}