import { inject, type Ref } from 'vue';

// Define possible theme values
export type Theme = 'dark' | 'light' | 'system';

// Define the shape of the theme context
interface ThemeContextType {
  theme: Ref<Theme>;
  setTheme: (theme: Theme) => void;
}

// Define a composable function to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = inject<ThemeContextType>('theme');
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
