import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export interface MediaAsset {
  id: string
  filename: string
  original_filename: string
  url: string
  thumbnail_url?: string
  alt_text?: string
  file_size: number
  mime_type: string
  section?: string
  folder: string
  uploaded_at: string
}

export function useMediaUpload() {
  const mediaAssets = ref<MediaAsset[]>([])
  const isUploading = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const uploadProgress = ref(0)

  // Upload single file
  const uploadFile = async (
    file: File, 
    options: {
      folder?: string
      altText?: string
      section?: string
    } = {}
  ) => {
    isUploading.value = true
    error.value = null
    uploadProgress.value = 0

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', options.folder || 'general')
      formData.append('altText', options.altText || '')
      formData.append('section', options.section || '')

      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/upload-media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      const result = await response.json()
      const newAsset = result.data

      // Add to local assets array
      mediaAssets.value.unshift(newAsset)
      
      uploadProgress.value = 100
      return { success: true, asset: newAsset }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Upload failed'
      return { success: false, error: error.value }
    } finally {
      isUploading.value = false
      setTimeout(() => {
        uploadProgress.value = 0
      }, 1000)
    }
  }

  // Upload multiple files
  const uploadFiles = async (
    files: File[], 
    options: {
      folder?: string
      section?: string
    } = {}
  ) => {
    const results = []
    
    for (const file of files) {
      const result = await uploadFile(file, options)
      results.push(result)
    }
    
    return results
  }

  // Load media assets
  const loadMediaAssets = async (folder?: string) => {
    isLoading.value = true
    error.value = null

    try {
      // For now, we'll use a simple query to the media_assets table
      // In production, you'd create a dedicated Edge Function for this
      const { data, error: fetchError } = await supabase
        .from('media_assets')
        .select('*')
        .order('uploaded_at', { ascending: false })

      if (fetchError) throw fetchError

      if (folder) {
        mediaAssets.value = data?.filter(asset => asset.folder === folder) || []
      } else {
        mediaAssets.value = data || []
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load media assets'
      console.error('Error loading media assets:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Delete media asset
  const deleteAsset = async (assetId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('media_assets')
        .delete()
        .eq('id', assetId)

      if (deleteError) throw deleteError

      // Remove from local array
      mediaAssets.value = mediaAssets.value.filter(asset => asset.id !== assetId)
      
      return { success: true }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete asset'
      return { success: false, error: error.value }
    }
  }

  // Update asset metadata
  const updateAsset = async (assetId: string, updates: Partial<MediaAsset>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('media_assets')
        .update(updates)
        .eq('id', assetId)
        .select()
        .single()

      if (updateError) throw updateError

      // Update local array
      const index = mediaAssets.value.findIndex(asset => asset.id === assetId)
      if (index > -1) {
        mediaAssets.value[index] = { ...mediaAssets.value[index], ...updates }
      }

      return { success: true, asset: data }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update asset'
      return { success: false, error: error.value }
    }
  }

  // Get assets by folder
  const getAssetsByFolder = (folder: string) => {
    return mediaAssets.value.filter(asset => asset.folder === folder)
  }

  // Get assets by section
  const getAssetsBySection = (section: string) => {
    return mediaAssets.value.filter(asset => asset.section === section)
  }

  // Get all folders
  const folders = computed(() => {
    const folderSet = new Set(mediaAssets.value.map(asset => asset.folder))
    return Array.from(folderSet).sort()
  })

  // Validate file type
  const validateFile = (file: File) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/ogg'
    ]

    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported' }
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File size too large (max 10MB)' }
    }

    return { valid: true }
  }

  return {
    // State
    mediaAssets: computed(() => mediaAssets.value),
    isUploading: computed(() => isUploading.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    uploadProgress: computed(() => uploadProgress.value),
    folders,

    // Actions
    uploadFile,
    uploadFiles,
    loadMediaAssets,
    deleteAsset,
    updateAsset,
    getAssetsByFolder,
    getAssetsBySection,
    validateFile
  }
}