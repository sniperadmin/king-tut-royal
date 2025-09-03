<template>
  <div class="min-h-screen bg-gray-50">
    <AdminLayout>
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">Media Manager</h1>
          <p class="mt-2 text-gray-600">Manage your images, videos, and other media files.</p>
          
          <div class="mt-8 bg-white shadow rounded-lg p-6">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Media Manager</h3>
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