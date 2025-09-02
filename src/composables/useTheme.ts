import { inject, type Ref } from 'vue'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Ref<Theme>
  setTheme: (theme: Theme) => void
}

export const useTheme = (): ThemeContextType => {
  const context = inject<ThemeContextType>('theme')
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}