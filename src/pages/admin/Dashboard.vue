<template>
  <div class="min-h-screen bg-gray-900">
    <AdminLayout>
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-100">Dashboard</h1>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <!-- Dashboard content -->
          <div class="py-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Page Builder Card -->
              <div class="bg-card overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-muted-foreground truncate">
                          Page Builder
                        </dt>
                        <dd class="text-lg font-medium text-foreground">
                          Visual Editor
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-muted px-5 py-3">
                  <div class="text-sm">
                    <router-link to="/admin/builder" class="font-medium text-primary hover:text-primary-hover">
                      Open Builder
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Media Manager Card -->
              <div class="bg-card overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-muted-foreground truncate">
                          Media Library
                        </dt>
                        <dd class="text-lg font-medium text-foreground">
                          Images & Files
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-muted px-5 py-3">
                  <div class="text-sm">
                    <router-link to="/admin/media" class="font-medium text-primary hover:text-primary-hover">
                      Manage Media
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Theme Customizer Card -->
              <div class="bg-background overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Theme Settings
                        </dt>
                        <dd class="text-lg font-medium text-foreground">
                          Colors & Fonts
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-muted px-5 py-3">
                  <div class="text-sm">
                    <router-link to="/admin/theme" class="font-medium text-primary hover:text-primary-hover">
                      Customize Theme
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="mt-8">
              <h3 class="text-lg leading-6 font-medium text-foreground mb-4">Quick Overview</h3>
              <div class="bg-background shadow rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-foreground">{{ sectionCount }}</div>
                    <div class="text-sm text-muted-foreground">Active Sections</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-foreground">{{ mediaCount }}</div>
                    <div class="text-sm text-muted-foreground">Media Files</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-foreground">{{ isPublished ? 'Live' : 'Draft' }}</div>
                    <div class="text-sm text-muted-foreground">Site Status</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="mt-8">
              <h3 class="text-lg leading-6 font-medium text-foreground mb-4">Getting Started</h3>
              <div class="bg-background shadow rounded-lg p-6">
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-8 w-8 rounded-full bg-success-foreground">
                        <svg class="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-foreground">Welcome to the Admin Dashboard!</p>
                      <p class="text-sm text-muted-foreground">Use the Page Builder to create and customize your website sections.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary-foreground">
                        <svg class="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-foreground">Upload Media</p>
                      <p class="text-sm text-muted-foreground">Add images and videos to your media library for use in sections.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-8 w-8 rounded-full bg-accent">
                        <svg class="h-5 w-5 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-foreground">Customize Theme</p>
                      <p class="text-sm text-muted-foreground">Adjust colors, fonts, and styling to match your brand.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { usePageBuilder } from '@/composables/admin/usePageBuilder'

const { loadPageLayout, currentLayout } = usePageBuilder()

const sectionCount = ref(0)
const mediaCount = ref(0)
const isPublished = ref(false)

onMounted(async () => {
  await loadPageLayout('homepage')
  if (currentLayout.value) {
    sectionCount.value = currentLayout.value.sections.length
    isPublished.value = currentLayout.value.is_published
  }
  // TODO: Load media count from API
  mediaCount.value = 0
})
</script>