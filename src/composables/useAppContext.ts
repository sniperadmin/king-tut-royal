import { ref, provide, inject, type Ref } from 'vue'

interface AppContextType {
  sidebarOpen: Ref<boolean>
  toggleSidebar: () => void
}

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const appContext: AppContextType = {
  sidebarOpen,
  toggleSidebar
}

export const provideAppContext = () => {
  provide('appContext', appContext)
  return appContext
}

export const useAppContext = (): AppContextType => {
  const context = inject<AppContextType>('appContext')
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}