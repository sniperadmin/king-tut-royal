<template>
  <slot />
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch } from 'vue'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  defaultTheme?: Theme
  customTheme?: Record<string, string>
}

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  defaultTheme: 'dark'
})

const theme = ref<Theme>('dark')

// Force dark theme on mount
onMounted(() => {
  theme.value = 'dark'
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', 'dark')
  }
  applyTheme()
})

// Apply theme to document
const applyTheme = () => {
  if (typeof window === 'undefined') return
  
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')

  if (props.customTheme) {
    for (const key in props.customTheme) {
      root.style.setProperty(key, props.customTheme[key])
    }
    return
  }

  // Always use dark theme
  root.classList.add('dark')
}

// Set theme function
const setTheme = (_newTheme: Theme) => {
  theme.value = 'dark'
  localStorage.setItem('theme', 'dark')
  applyTheme()
}

// Watch for theme changes
watch(theme, applyTheme)

// Provide theme context
provide('theme', {
  theme,
  setTheme
}) // setTheme now always sets dark
</script>