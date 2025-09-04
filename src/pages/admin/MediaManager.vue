<template>
  <div class="min-h-screen bg-background">
    <AdminLayout>
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <!-- Header -->
          <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <h1 class="text-2xl font-semibold text-foreground">Media Manager</h1>
              <p class="mt-2 text-muted-foreground">Manage your images, videos, and other media files.</p>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
              <button
                @click="triggerFileUpload"
                :disabled="isUploading"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Upload Files
              </button>
            </div>
          </div>

          <!-- Upload Area -->
          <div class="mt-8">
            <div
              @drop="handleDrop"
              @dragover.prevent
              @dragenter.prevent
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                isDragOver ? 'border-primary bg-accent' : 'border-border hover:border-primary'
              ]"
              @dragenter="isDragOver = true"
              @dragleave="isDragOver = false"
            >
              <svg class="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div class="mt-4">
                <p class="text-sm text-muted-foreground">
                  <button
                    @click="triggerFileUpload"
                    class="font-medium text-primary hover:text-primary-hover"
                  >
                    Click to upload
                  </button>
                  or drag and drop
                </p>
                <p class="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, WebP, MP4, WebM up to 10MB</p>
              </div>
            </div>

            <!-- Upload Progress -->
            <div v-if="isUploading" class="mt-4">
              <div class="bg-background rounded-lg shadow p-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-foreground">Uploading files...</p>
                    <div class="mt-1 bg-muted rounded-full h-2">
                      <div
                        class="bg-primary h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${uploadProgress}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Filters and Search -->
          <div class="mt-8 bg-background shadow rounded-lg">
            <div class="px-6 py-4 border-b border-border">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <!-- Search -->
                <div class="flex-1 max-w-lg">
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="Search files..."
                      class="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:placeholder-foreground focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <!-- Filters -->
                <div class="flex items-center space-x-4">
                  <!-- Folder Filter -->
                  <select
                    v-model="selectedFolder"
                    class="block w-full pl-3 pr-10 py-2 text-base border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Folders</option>
                    <option v-for="folder in folders" :key="folder" :value="folder">
                      {{ folder }}
                    </option>
                  </select>

                  <!-- File Type Filter -->
                  <select
                    v-model="selectedFileType"
                    class="block w-full pl-3 pr-10 py-2 text-base border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                  </select>

                  <!-- View Toggle -->
                  <div class="flex rounded-md shadow-sm">
                    <button
                      @click="viewMode = 'grid'"
                      :class="[
                        'relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
                        viewMode === 'grid'
                          ? 'bg-accent border-primary text-primary'
                          : 'bg-background border-border text-muted-foreground hover:bg-muted'
                      ]"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      @click="viewMode = 'list'"
                      :class="[
                        'relative inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
                        viewMode === 'list'
                          ? 'bg-accent border-primary text-primary'
                          : 'bg-background border-border text-muted-foreground hover:bg-muted'
                      ]"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Media Grid/List -->
            <div class="p-6">
              <div v-if="isLoading" class="flex justify-center py-12">
                <svg class="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>

              <div v-else-if="filteredAssets.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-foreground">No media files</h3>
                <p class="mt-1 text-sm text-muted-foreground">Get started by uploading your first file.</p>
              </div>

              <!-- Grid View -->
              <div
                v-else-if="viewMode === 'grid'"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              >
                <div
                  v-for="asset in filteredAssets"
                  :key="asset.id"
                  class="group relative bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  @click="selectAsset(asset)"
                >
                  <!-- Thumbnail -->
                  <div class="aspect-square bg-muted flex items-center justify-center">
                    <img
                      v-if="asset.mime_type.startsWith('image/')"
                      :src="asset.thumbnail_url || asset.url"
                      :alt="asset.alt_text || asset.filename"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div v-else class="flex flex-col items-center justify-center text-muted-foreground">
                      <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span class="text-xs mt-1">Video</span>
                    </div>
                  </div>

                  <!-- File Info -->
                  <div class="p-2">
                    <p class="text-xs font-medium text-foreground truncate" :title="asset.filename">
                      {{ asset.filename }}
                    </p>
                    <p class="text-xs text-muted-foreground">{{ formatFileSize(asset.file_size) }}</p>
                  </div>

                  <!-- Actions -->
                  <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      @click.stop="deleteAssetWithConfirmation(asset)"
                      class="p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive-hover focus:outline-none focus:ring-2 focus:ring-destructive"
                    >
                      <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- List View -->
              <div v-else class="overflow-hidden shadow ring-1 ring-border md:rounded-lg">
                <table class="min-w-full divide-y divide-border">
                  <thead class="bg-muted">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">File</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Folder</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Uploaded</th>
                      <th class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody class="bg-background divide-y divide-border">
                    <tr
                      v-for="asset in filteredAssets"
                      :key="asset.id"
                      class="hover:bg-muted cursor-pointer"
                      @click="selectAsset(asset)"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <img
                              v-if="asset.mime_type.startsWith('image/')"
                              :src="asset.thumbnail_url || asset.url"
                              :alt="asset.alt_text || asset.filename"
                              class="h-10 w-10 rounded object-cover"
                            />
                            <div v-else class="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ asset.filename }}</div>
                            <div class="text-sm text-gray-500">{{ asset.original_filename }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ asset.mime_type }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatFileSize(asset.file_size) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ asset.folder }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(asset.uploaded_at) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          @click.stop="deleteAssetWithConfirmation(asset)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Asset Details Modal -->
      <div
        v-if="selectedAsset"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        @click="closeModal"
      >
        <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <!-- Modal Header -->
            <div class="flex items-center justify-between pb-4 border-b">
              <h3 class="text-lg font-medium text-gray-900">File Details</h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Preview -->
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Preview</h4>
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    v-if="selectedAsset.mime_type.startsWith('image/')"
                    :src="selectedAsset.url"
                    :alt="selectedAsset.alt_text || selectedAsset.filename"
                    class="w-full h-auto max-h-64 object-contain"
                  />
                  <div v-else class="h-64 bg-gray-100 flex items-center justify-center">
                    <div class="text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p class="mt-2 text-sm text-gray-500">Video File</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Details Form -->
              <div>
                <form @submit.prevent="updateSelectedAsset">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Filename</label>
                      <input
                        v-model="editingAsset.filename"
                        type="text"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700">Alt Text</label>
                      <input
                        v-model="editingAsset.alt_text"
                        type="text"
                        placeholder="Describe this image..."
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700">Folder</label>
                      <select
                        v-model="editingAsset.folder"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="general">General</option>
                        <option value="hero">Hero</option>
                        <option value="gallery">Gallery</option>
                        <option value="packages">Packages</option>
                        <option value="testimonials">Testimonials</option>
                      </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <span class="font-medium">File Size:</span>
                        {{ formatFileSize(selectedAsset.file_size) }}
                      </div>
                      <div>
                        <span class="font-medium">Type:</span>
                        {{ selectedAsset.mime_type }}
                      </div>
                      <div class="col-span-2">
                        <span class="font-medium">URL:</span>
                        <a :href="selectedAsset.url" target="_blank" class="text-indigo-600 hover:text-indigo-500 break-all">
                          {{ selectedAsset.url }}
                        </a>
                      </div>
                    </div>

                    <div class="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        @click="closeModal"
                        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hidden file input -->
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*,video/*"
        class="hidden"
        @change="handleFileSelect"
      />
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { useMediaUpload, type MediaAsset } from '@/composables/admin/useMediaUpload'

const {
  mediaAssets,
  isUploading,
  isLoading,
  error,
  uploadProgress,
  folders,
  uploadFiles,
  loadMediaAssets,
  deleteAsset,
  updateAsset,
  validateFile
} = useMediaUpload()

// UI State
const isDragOver = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const selectedFolder = ref('')
const selectedFileType = ref('')
const selectedAsset = ref<MediaAsset | null>(null)
const editingAsset = ref<Partial<MediaAsset>>({})

// File input ref
const fileInput = ref<HTMLInputElement>()

// Computed
const filteredAssets = computed(() => {
  let filtered = mediaAssets.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(asset =>
      asset.filename.toLowerCase().includes(query) ||
      asset.alt_text?.toLowerCase().includes(query) ||
      asset.original_filename.toLowerCase().includes(query)
    )
  }

  // Filter by folder
  if (selectedFolder.value) {
    filtered = filtered.filter(asset => asset.folder === selectedFolder.value)
  }

  // Filter by file type
  if (selectedFileType.value) {
    filtered = filtered.filter(asset => {
      if (selectedFileType.value === 'image') {
        return asset.mime_type.startsWith('image/')
      } else if (selectedFileType.value === 'video') {
        return asset.mime_type.startsWith('video/')
      }
      return true
    })
  }

  return filtered
})

// Methods
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    await handleFiles(Array.from(target.files))
    target.value = '' // Reset input
  }
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  if (event.dataTransfer?.files) {
    await handleFiles(Array.from(event.dataTransfer.files))
  }
}

const handleFiles = async (files: File[]) => {
  // Validate files
  const validFiles = []
  for (const file of files) {
    const validation = validateFile(file)
    if (validation.valid) {
      validFiles.push(file)
    } else {
      console.error(`Invalid file ${file.name}: ${validation.error}`)
      // You could show a toast notification here
    }
  }

  if (validFiles.length > 0) {
    await uploadFiles(validFiles, { folder: selectedFolder.value || 'general' })
  }
}

const selectAsset = (asset: MediaAsset) => {
  selectedAsset.value = asset
  editingAsset.value = { ...asset }
}

const closeModal = () => {
  selectedAsset.value = null
  editingAsset.value = {}
}

const updateSelectedAsset = async () => {
  if (!selectedAsset.value || !editingAsset.value.id) return

  const result = await updateAsset(editingAsset.value.id, editingAsset.value)
  if (result.success) {
    selectedAsset.value = { ...selectedAsset.value, ...editingAsset.value }
    closeModal()
  }
}

const deleteAssetWithConfirmation = async (asset: MediaAsset) => {
  if (confirm(`Are you sure you want to delete "${asset.filename}"? This action cannot be undone.`)) {
    await deleteAsset(asset.id)
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  loadMediaAssets()
})
</script>