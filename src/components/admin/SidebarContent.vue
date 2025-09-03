<template>
  <div class="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
    <!-- Logo/Brand -->
    <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <div class="flex items-center">
          <div class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
            </svg>
          </div>
          <h2 class="ml-3 text-lg font-semibold text-gray-900">King Tut Admin</h2>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-8 flex-1 px-2 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            isCurrentRoute(item.href)
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center pl-3 pr-2 py-2 border-l-4 text-sm font-medium transition-colors duration-150'
          ]"
        >
          <svg
            :class="[
              isCurrentRoute(item.href) ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 h-5 w-5 transition-colors duration-150'
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="item.name === 'Dashboard'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
            />
            <path
              v-else-if="item.name === 'Page Builder'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
            <path
              v-else-if="item.name === 'Media Manager'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
            <path
              v-else-if="item.name === 'Theme Customizer'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
            />
          </svg>
          {{ item.name }}
        </router-link>
      </nav>
    </div>

    <!-- Footer -->
    <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
      <div class="flex items-center w-full">
        <div class="flex-shrink-0">
          <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span class="text-xs font-medium text-gray-700">{{ userInitials }}</span>
          </div>
        </div>
        <div class="ml-3 flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ adminUser?.name || 'Admin' }}</p>
          <p class="text-xs text-gray-500 truncate">{{ adminUser?.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminAuth } from '@/composables/admin/useAdminAuth'

const { adminUser } = useAdminAuth()
const route = useRoute()

// Navigation items
const navigation = [
  {
    name: 'Dashboard',
    href: '/admin'
  },
  {
    name: 'Page Builder',
    href: '/admin/builder'
  },
  {
    name: 'Media Manager',
    href: '/admin/media'
  },
  {
    name: 'Theme Customizer',
    href: '/admin/theme'
  }
]

const userInitials = computed(() => {
  if (!adminUser.value?.name) return 'A'
  return adminUser.value.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const isCurrentRoute = (href: string) => {
  if (href === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(href)
}
</script>