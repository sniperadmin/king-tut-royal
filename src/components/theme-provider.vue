<template>
  <slot />
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch } from 'vue'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  defaultTheme?: Theme
}

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  defaultTheme: 'system'
})

const theme = ref<Theme>(props.defaultTheme)

// Initialize theme from localStorage
onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system')) {
      theme.value = savedTheme as Theme
    }
  }
  applyTheme()
})

// Apply theme to document
const applyTheme = () => {
  if (typeof window === 'undefined') return
  
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')

  if (theme.value === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    root.classList.add(systemTheme)
    return
  }

  root.classList.add(theme.value)
}

// Set theme function
const setTheme = (newTheme: Theme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  applyTheme()
}

// Watch for theme changes
watch(theme, applyTheme)

// Provide theme context
provide('theme', {
  theme,
  setTheme
})
</script>