<template>
  <div class="min-h-screen bg-gray-50">
    <AdminLayout>
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">Theme Customizer</h1>
          <p class="mt-2 text-gray-600">Customize colors, fonts, and styling for your website.</p>
          
          <div class="mt-8 bg-white shadow rounded-lg p-6">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Theme Customizer</h3>
              <p class="mt-1 text-sm text-gray-500">This feature will be implemented in a future update.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
</script>