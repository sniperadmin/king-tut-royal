<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-background bg-opacity-75" aria-hidden="true" @click="sidebarOpen = false"></div>
      <div class="relative flex-1 flex flex-col max-w-xs w-full bg-card">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            @click="sidebarOpen = false"
          >
            <span class="sr-only">Close sidebar</span>
            <svg class="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <SidebarContent />
    </div>

    <!-- Main content -->
    <div class="md:pl-64 flex flex-col flex-1">
      <!-- Top header -->
      <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-background">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Desktop header -->
      <div class="hidden md:block bg-card shadow-sm border-b border-border">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center space-x-4">
              <h1 class="text-xl font-semibold text-foreground">Admin Dashboard</h1>
              <!-- Breadcrumbs -->
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-2">
                  <li>
                    <div class="flex items-center">
                      <svg class="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2 text-sm text-muted-foreground">{{ currentPageName }}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div class="flex items-center space-x-4">
              <!-- Notifications -->
              <div class="relative">
                <button
                  @click="showNotifications = !showNotifications"
                  class="p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5" />
                  </svg>
                  <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {{ notifications.length }}
                  </span>
                </button>
                
                <!-- Notifications dropdown -->
                <div
                  v-if="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div class="p-4">
                    <h3 class="text-sm font-medium text-foreground mb-2">Notifications</h3>
                    <div v-if="notifications.length === 0" class="text-sm text-muted-foreground">
                      No new notifications
                    </div>
                    <div v-else class="space-y-2">
                      <div
                        v-for="notification in notifications"
                        :key="notification.id"
                        class="p-2 bg-secondary rounded text-sm"
                        :class="{
                          'bg-success text-success-foreground': notification.type === 'success',
                          'bg-destructive text-destructive-foreground': notification.type === 'error',
                          'bg-warning text-warning-foreground': notification.type === 'warning'
                        }"
                      >
                        {{ notification.message }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span class="text-sm font-medium text-primary-foreground">{{ userInitials }}</span>
                </div>
                <div class="hidden lg:block">
                  <div class="text-sm font-medium text-foreground">{{ adminUser?.name || 'Admin' }}</div>
                  <div class="text-xs text-muted-foreground">{{ adminUser?.email }}</div>
                </div>
              </div>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminAuth } from '@/composables/admin/useAdminAuth'
import SidebarContent from './SidebarContent.vue'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  timestamp: Date
}

const { adminUser, logout } = useAdminAuth()
const route = useRoute()

const sidebarOpen = ref(false)
const showNotifications = ref(false)
const notifications = ref<Notification[]>([])

const userInitials = computed(() => {
  if (!adminUser.value?.name) return 'A'
  return adminUser.value.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const currentPageName = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Dashboard'
  if (path === '/admin/builder') return 'Page Builder'
  if (path === '/admin/media') return 'Media Manager'
  if (path === '/admin/theme') return 'Theme Customizer'
  return 'Admin'
})

const handleLogout = () => {
  logout()
}

// Notification system
const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    timestamp: new Date()
  }
  notifications.value.unshift(newNotification)
  
  // Auto-remove after 5 seconds for success notifications
  if (notification.type === 'success') {
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, 5000)
  }
}

const removeNotification = (id: string) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

// Expose notification methods for child components
defineExpose({
  addNotification,
  removeNotification
})
</script>