import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export interface ThemeConfig {
  id?: string
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  background_image?: string
  font_family: string
  font_size_base: number
  line_height: number
  spacing_unit: number
  border_radius: number
  created_at?: string
  updated_at?: string
}

export interface ThemePreset {
  name: string
  config: Omit<ThemeConfig, 'id' | 'created_at' | 'updated_at'>
}

const defaultTheme: Omit<ThemeConfig, 'id' | 'created_at' | 'updated_at'> = {
  primary_color: '#3b82f6',
  secondary_color: '#64748b',
  accent_color: '#f59e0b',
  background_color: '#ffffff',
  background_image: '',
  font_family: 'Inter, system-ui, sans-serif',
  font_size_base: 16,
  line_height: 1.5,
  spacing_unit: 4,
  border_radius: 8
}

const themePresets: ThemePreset[] = [
  {
    name: 'Default',
    config: defaultTheme
  },
  {
    name: 'Dark Mode',
    config: {
      ...defaultTheme,
      primary_color: '#6366f1',
      secondary_color: '#374151',
      accent_color: '#fbbf24',
      background_color: '#111827'
    }
  },
  {
    name: 'Luxury Gold',
    config: {
      ...defaultTheme,
      primary_color: '#d97706',
      secondary_color: '#92400e',
      accent_color: '#fbbf24',
      background_color: '#fefdf8'
    }
  },
  {
    name: 'Royal Blue',
    config: {
      ...defaultTheme,
      primary_color: '#1e40af',
      secondary_color: '#3730a3',
      accent_color: '#06b6d4',
      background_color: '#f8fafc'
    }
  }
]

export function useThemeConfig() {
  const currentTheme = ref<ThemeConfig>({ ...defaultTheme })
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<string | null>(null)
  const hasUnsavedChanges = ref(false)

  // Load current theme configuration
  const loadThemeConfig = async () => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('theme_config')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      if (data) {
        currentTheme.value = data
      } else {
        // No theme config exists, use default
        currentTheme.value = { ...defaultTheme }
      }
      
      hasUnsavedChanges.value = false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load theme configuration'
      console.error('Error loading theme config:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Save theme configuration
  const saveThemeConfig = async () => {
    isSaving.value = true
    error.value = null

    try {
      const configToSave = {
        ...currentTheme.value,
        updated_at: new Date().toISOString()
      }

      if (currentTheme.value.id) {
        // Update existing config
        const { data, error: updateError } = await supabase
          .from('theme_config')
          .update(configToSave)
          .eq('id', currentTheme.value.id)
          .select()
          .single()

        if (updateError) throw updateError
        currentTheme.value = data
      } else {
        // Create new config
        const { data, error: insertError } = await supabase
          .from('theme_config')
          .insert([configToSave])
          .select()
          .single()

        if (insertError) throw insertError
        currentTheme.value = data
      }

      hasUnsavedChanges.value = false
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save theme configuration'
      return { success: false, error: error.value }
    } finally {
      isSaving.value = false
    }
  }

  // Update theme property
  const updateThemeProperty = <K extends keyof ThemeConfig>(
    property: K,
    value: ThemeConfig[K]
  ) => {
    currentTheme.value[property] = value
    hasUnsavedChanges.value = true
  }

  // Apply theme preset
  const applyPreset = (preset: ThemePreset) => {
    Object.assign(currentTheme.value, preset.config)
    hasUnsavedChanges.value = true
  }

  // Reset to default theme
  const resetToDefault = () => {
    Object.assign(currentTheme.value, defaultTheme)
    hasUnsavedChanges.value = true
  }

  // Generate CSS variables from theme
  const generateCSSVariables = computed(() => {
    const theme = currentTheme.value
    return {
      '--color-primary': theme.primary_color,
      '--color-secondary': theme.secondary_color,
      '--color-accent': theme.accent_color,
      '--color-background': theme.background_color,
      '--font-family': theme.font_family,
      '--font-size-base': `${theme.font_size_base}px`,
      '--line-height': theme.line_height.toString(),
      '--spacing-unit': `${theme.spacing_unit}px`,
      '--border-radius': `${theme.border_radius}px`,
      ...(theme.background_image && {
        '--background-image': `url(${theme.background_image})`
      })
    }
  })

  // Web-safe font options
  const fontOptions = [
    { label: 'Inter (Default)', value: 'Inter, system-ui, sans-serif' },
    { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Times New Roman', value: '"Times New Roman", serif' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { label: 'Courier New', value: '"Courier New", monospace' },
    { label: 'System UI', value: 'system-ui, sans-serif' }
  ]

  return {
    // State
    currentTheme: computed(() => currentTheme.value),
    isLoading: computed(() => isLoading.value),
    isSaving: computed(() => isSaving.value),
    error: computed(() => error.value),
    hasUnsavedChanges: computed(() => hasUnsavedChanges.value),
    generateCSSVariables,
    themePresets,
    fontOptions,

    // Actions
    loadThemeConfig,
    saveThemeConfig,
    updateThemeProperty,
    applyPreset,
    resetToDefault
  }
}