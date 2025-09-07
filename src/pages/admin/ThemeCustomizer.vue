<template>
  <div :class="['min-h-screen', themeClass]">
    <AdminLayout>
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <!-- Header -->
          <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <h1 class="text-2xl font-semibold text-foreground">Theme Customizer</h1>
              <p class="mt-2 text-muted-foreground">Customize colors, fonts, and styling for your website.</p>
            </div>
            <div class="mt-4 flex space-x-3 md:mt-0 md:ml-4">
              <button
                @click="resetToDefault"
                :disabled="isSaving"
                class="inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset to Default
              </button>
              <button
                @click="saveThemeConfig"
                :disabled="!hasUnsavedChanges || isSaving"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="mt-8 flex justify-center py-12">
            <svg class="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          <!-- Main Content -->
          <div v-else class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Theme Controls -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Theme Presets -->
              <div class="bg-background shadow rounded-lg p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Theme Presets</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    v-for="preset in themePresets"
                    :key="preset.name"
                    @click="applyPreset(preset)"
                    class="relative p-4 border-2 rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    :class="isCurrentPreset(preset) ? 'border-primary bg-accent' : 'border-border'"
                  >
                    <div class="flex items-center space-x-2 mb-2">
                      <div
                        class="w-4 h-4 rounded-full"
                        :style="{ backgroundColor: preset.config.primary_color }"
                      ></div>
                      <div
                        class="w-4 h-4 rounded-full"
                        :style="{ backgroundColor: preset.config.secondary_color }"
                      ></div>
                      <div
                        class="w-4 h-4 rounded-full"
                        :style="{ backgroundColor: preset.config.accent_color }"
                      ></div>
                    </div>
                    <p class="text-sm font-medium text-foreground">{{ preset.name }}</p>
                  </button>
                </div>
              </div>

              <!-- Color Settings -->
              <div class="bg-background shadow rounded-lg p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Colors</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Primary Color</label>
                    <div class="flex items-center space-x-3">
                      <input
                        :value="currentTheme.primary_color"
                        @input="updateThemeProperty('primary_color', ($event.target as HTMLInputElement).value)"
                        type="color"
                        class="h-10 w-16 border border-border rounded-md cursor-pointer"
                      />
                      <input
                        :value="currentTheme.primary_color"
                        @input="updateThemeProperty('primary_color', ($event.target as HTMLInputElement).value)"
                        type="text"
                        class="flex-1 block border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Secondary Color</label>
                    <div class="flex items-center space-x-3">
                      <input
                        :value="currentTheme.secondary_color"
                        @input="updateThemeProperty('secondary_color', ($event.target as HTMLInputElement).value)"
                        type="color"
                        class="h-10 w-16 border border-border rounded-md cursor-pointer"
                      />
                      <input
                        :value="currentTheme.secondary_color"
                        @input="updateThemeProperty('secondary_color', ($event.target as HTMLInputElement).value)"
                        type="text"
                        class="flex-1 block border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="#64748b"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Accent Color</label>
                    <div class="flex items-center space-x-3">
                      <input
                        :value="currentTheme.accent_color"
                        @input="updateThemeProperty('accent_color', ($event.target as HTMLInputElement).value)"
                        type="color"
                        class="h-10 w-16 border border-border rounded-md cursor-pointer"
                      />
                      <input
                        :value="currentTheme.accent_color"
                        @input="updateThemeProperty('accent_color', ($event.target as HTMLInputElement).value)"
                        type="text"
                        class="flex-1 block border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="#f59e0b"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Background Color</label>
                    <div class="flex items-center space-x-3">
                      <input
                        :value="currentTheme.background_color"
                        @input="updateThemeProperty('background_color', ($event.target as HTMLInputElement).value)"
                        type="color"
                        class="h-10 w-16 border border-border rounded-md cursor-pointer"
                      />
                      <input
                        :value="currentTheme.background_color"
                        @input="updateThemeProperty('background_color', ($event.target as HTMLInputElement).value)"
                        type="text"
                        class="flex-1 block border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Typography Settings -->
              <div class="bg-background shadow rounded-lg p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Typography</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Font Family</label>
                    <select
                      :value="currentTheme.font_family"
                      @change="updateThemeProperty('font_family', ($event.target as HTMLSelectElement).value)"
                      class="block w-full border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option v-for="font in fontOptions" :key="font.value" :value="font.value">
                        {{ font.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Base Font Size: {{ currentTheme.font_size_base }}px
                    </label>
                    <input
                      :value="currentTheme.font_size_base"
                      @input="updateThemeProperty('font_size_base', parseInt(($event.target as HTMLInputElement).value))"
                      type="range"
                      min="12"
                      max="24"
                      step="1"
                      class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Line Height: {{ currentTheme.line_height }}
                    </label>
                    <input
                      :value="currentTheme.line_height"
                      @input="updateThemeProperty('line_height', parseFloat(($event.target as HTMLInputElement).value))"
                      type="range"
                      min="1.2"
                      max="2.0"
                      step="0.1"
                      class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Border Radius: {{ currentTheme.border_radius }}px
                    </label>
                    <input
                      :value="currentTheme.border_radius"
                      @input="updateThemeProperty('border_radius', parseInt(($event.target as HTMLInputElement).value))"
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <!-- Font Preview -->
                <div class="mt-6 p-4 border border-border rounded-lg">
                  <h4 class="text-sm font-medium text-foreground mb-2">Font Preview</h4>
                  <div
                    :style="{
                      fontFamily: currentTheme.font_family ?? 'Cormorant Garamond',
                      fontSize: `${currentTheme.font_size_base ?? 16}px`,
                      lineHeight: (currentTheme.line_height ?? 1.5).toString()
                    }"
                    class="space-y-2"
                  >
                    <h1 class="text-3xl font-bold">King Tut Royal Tours</h1>
                    <h2 class="text-xl font-semibold">Discover Ancient Egypt</h2>
                    <p class="text-base">
                      Experience the wonders of ancient Egypt with our exclusive VIP tours. 
                      From the majestic pyramids to the treasures of Tutankhamun, 
                      embark on a journey through time.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Spacing Settings -->
              <div class="bg-background shadow rounded-lg p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Layout & Spacing</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Spacing Unit: {{ currentTheme.spacing_unit }}px
                    </label>
                    <input
                      :value="currentTheme.spacing_unit"
                      @input="updateThemeProperty('spacing_unit', parseInt(($event.target as HTMLInputElement).value))"
                      type="range"
                      min="2"
                      max="12"
                      step="1"
                      class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <p class="text-xs text-muted-foreground mt-1">
                      Base unit for margins and padding throughout the site
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Background Image URL</label>
                    <input
                      :value="currentTheme.background_image || ''"
                      @input="updateThemeProperty('background_image', ($event.target as HTMLInputElement).value)"
                      type="url"
                      placeholder="https://example.com/background.jpg"
                      class="block w-full border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    <p class="text-xs text-muted-foreground mt-1">
                      Optional background image for the site
                    </p>
                  </div>
                </div>
              </div>

              <!-- Export/Import -->
              <div class="bg-background shadow rounded-lg p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Export/Import Theme</h3>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button
                    @click="exportTheme"
                    class="inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Theme
                  </button>
                  <div class="flex items-center space-x-2">
                    <input
                      ref="importInput"
                      type="file"
                      accept=".json"
                      @change="importTheme"
                      class="hidden"
                    />
                    <button
                      @click="$refs.importInput?.click()"
                      class="inline-flex items-center px-4 py-2 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3 3m0 0l3-3m-3 3V9" />
                      </svg>
                      Import Theme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Preview -->
            <div class="lg:col-span-1">
              <div class="sticky top-6">
                <div class="bg-background shadow rounded-lg p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Live Preview</h3>
                  
                  <!-- Preview Container -->
                  <div
                    class="border border-gray-200 rounded-lg overflow-hidden"
                    :style="generateCSSVariables"
                  >
                    <!-- Preview Header -->
                    <div
                      class="px-4 py-3 text-white"
                      :style="{ backgroundColor: currentTheme.primary_color }"
                    >
                      <h4
                        class="font-semibold"
                        :style="{
                          fontFamily: currentTheme.font_family,
                          fontSize: `${currentTheme.font_size_base + 2}px`
                        }"
                      >
                        King Tut Tours
                      </h4>
                    </div>

                    <!-- Preview Content -->
                    <div
                      class="p-4 space-y-4"
                      :style="{
                        backgroundColor: currentTheme.background_color,
                        fontFamily: currentTheme.font_family,
                        fontSize: `${currentTheme.font_size_base}px`,
                        lineHeight: (currentTheme.line_height ?? 1.5).toString(),
                        ...(currentTheme.background_image && {
                          backgroundImage: `url(${currentTheme.background_image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        })
                      }"
                    >
                      <!-- Sample Button -->
                      <button
                        class="px-4 py-2 text-white rounded font-medium"
                        :style="{
                          backgroundColor: currentTheme.accent_color,
                          borderRadius: `${currentTheme.border_radius}px`,
                          fontSize: `${currentTheme.font_size_base - 2}px`
                        }"
                      >
                        Book Now
                      </button>

                      <!-- Sample Text -->
                      <div class="space-y-2">
                        <h5
                          class="font-semibold"
                          :style="{
                            color: currentTheme.primary_color,
                            fontSize: `${currentTheme.font_size_base + 4}px`
                          }"
                        >
                          Royal VIP Package
                        </h5>
                        <p
                          :style="{
                            color: currentTheme.secondary_color,
                            fontSize: `${currentTheme.font_size_base}px`
                          }"
                        >
                          Experience the ultimate luxury tour of ancient Egypt's most magnificent sites.
                        </p>
                      </div>

                      <!-- Sample Card -->
                      <div
                        class="p-3 border"
                        :style="{
                          borderColor: currentTheme.secondary_color + '40',
                          borderRadius: `${currentTheme.border_radius}px`,
                          backgroundColor: currentTheme.background_color
                        }"
                      >
                        <div
                          class="text-sm font-medium"
                          :style="{ color: currentTheme.primary_color }"
                        >
                          Sample Card
                        </div>
                        <div
                          class="text-xs mt-1"
                          :style="{ color: currentTheme.secondary_color }"
                        >
                          This shows how cards will look with your theme
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- CSS Variables Display -->
                  <div class="mt-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">CSS Variables</h4>
                    <div class="bg-gray-50 rounded p-3 text-xs font-mono space-y-1 max-h-40 overflow-y-auto">
                      <div v-for="(value, key) in generateCSSVariables" :key="key" class="text-gray-600">
                        <span class="text-blue-600">{{ key }}:</span> {{ value }};
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Unsaved Changes Warning -->
          <div
            v-if="hasUnsavedChanges"
            class="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg"
          >
            <div class="flex items-center">
              <svg class="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p class="text-sm text-yellow-800">You have unsaved changes</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { useTheme } from '@/composables/useTheme'
import { useThemeConfig, type ThemePreset } from '@/composables/admin/useThemeConfig'

const { theme } = useTheme()
const themeClass = computed(() => (theme.value === 'dark' ? 'dark-theme' : ''))

const {
  currentTheme,
  isLoading,
  isSaving,
  error,
  hasUnsavedChanges,
  generateCSSVariables,
  themePresets,
  fontOptions,
  loadThemeConfig,
  saveThemeConfig,
  updateThemeProperty,
  applyPreset,
  resetToDefault
} = useThemeConfig()

// Refs
const importInput = ref<HTMLInputElement>()

// Methods
const isCurrentPreset = (preset: ThemePreset): boolean => {
  const current = currentTheme.value
  const presetConfig = preset.config
  
  return (
    current.primary_color === presetConfig.primary_color &&
    current.secondary_color === presetConfig.secondary_color &&
    current.accent_color === presetConfig.accent_color &&
    current.background_color === presetConfig.background_color &&
    current.font_family === presetConfig.font_family
  )
}

const exportTheme = () => {
  const themeData = {
    name: 'Custom Theme',
    config: {
      primary_color: currentTheme.value.primary_color,
      secondary_color: currentTheme.value.secondary_color,
      accent_color: currentTheme.value.accent_color,
      background_color: currentTheme.value.background_color,
      background_image: currentTheme.value.background_image,
      font_family: currentTheme.value.font_family,
      font_size_base: currentTheme.value.font_size_base,
      line_height: currentTheme.value.line_height,
      spacing_unit: currentTheme.value.spacing_unit,
      border_radius: currentTheme.value.border_radius
    }
  }

  const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'theme-config.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const importTheme = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const themeData = JSON.parse(e.target?.result as string)
      if (themeData.config) {
        applyPreset(themeData)
      } else {
        console.error('Invalid theme file format')
      }
    } catch (error) {
      console.error('Error parsing theme file:', error)
    }
  }
  reader.readAsText(file)
  
  // Reset input
  target.value = ''
}

// Lifecycle
onMounted(() => {
  console.log('ThemeCustomizer: onMounted, isLoading:', isLoading.value)
  loadThemeConfig()
})
</script>