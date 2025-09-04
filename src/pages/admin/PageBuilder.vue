<template>
  <div class="min-h-screen bg-gray-900">
    <AdminLayout>
      <div class="h-screen flex flex-col">
        <!-- Toolbar -->
        <div class="bg-gray-800 border-b border-gray-700 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <h1 class="text-lg font-semibold text-gray-100">Page Builder</h1>
              <div class="flex items-center space-x-2">
                <select
                  v-model="selectedPage"
                  @change="handlePageChange"
                  class="block w-40 pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
                >
                  <option value="homepage">Homepage</option>
                  <option value="about">About</option>
                  <option value="contact">Contact</option>
                </select>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div v-if="isLoading" class="flex items-center text-sm text-gray-400">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saveStatus }}
              </div>
              
              <button
                @click="handlePreview"
                class="inline-flex items-center px-3 py-2 border border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              
              <button
                @click="handleSave"
                :disabled="isLoading"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>

        <!-- Main content area -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Left sidebar for components -->
          <div class="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto p-4">
            <h2 class="text-lg font-semibold text-gray-100 mb-4">Components</h2>
            <div class="space-y-2">
              <div
                v-for="component in availableComponents"
                :key="component.name"
                class="bg-gray-700 text-gray-200 p-2 rounded-md cursor-grab hover:bg-gray-600 transition-colors duration-150"
                draggable="true"
                @dragstart="dragStart(component)"
              >
                {{ component.name }}
              </div>
            </div>
          </div>

          <!-- Canvas area -->
          <div class="flex-1 bg-gray-900 overflow-y-auto p-4 relative">
            <div class="max-w-4xl mx-auto border border-gray-700 bg-gray-800 min-h-full p-6 rounded-lg shadow-inner">
              <VueDraggable
                class="min-h-full space-y-4"
                :list="pageLayout"
                group="components"
                item-key="id"
                @end="dragEnd"
              >
                <template #item="{ element }">
                  <div class="relative group bg-gray-700 p-4 rounded-md shadow-sm border border-gray-600">
                    <DynamicRenderer :component="element" />
                    <div class="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        @click="editComponent(element)"
                        class="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700"
                      >
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-7.793 7.793a1 1 0 01-.328.217l-3 1a1 1 0 01-1.217-1.217l1-3a1 1 0 01.217-.328l7.793-7.793zM10 12l-2 2" />
                        </svg>
                      </button>
                      <button
                        @click="deleteComponent(element)"
                        class="p-1 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700"
                      >
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm-1 3a1 1 0 100 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </template>
              </VueDraggable>
              <div v-if="pageLayout.length === 0" class="text-center text-gray-400 py-20">
                Drag components here to build your page
              </div>
            </div>
          </div>

          <!-- Right sidebar for component properties -->
          <div class="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto p-4">
            <h2 class="text-lg font-semibold text-gray-100 mb-4">Properties</h2>
            <div v-if="selectedComponent">
              <div
                v-for="(value, key) in selectedComponent.props"
                :key="key"
                class="mb-4"
              >
                <label :for="key" class="block text-sm font-medium text-gray-300 mb-1">{{ key }}</label>
                <input
                  v-if="typeof value === 'string'"
                  :id="key"
                  v-model="selectedComponent.props[key]"
                  type="text"
                  class="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                />
                <input
                  v-else-if="typeof value === 'number'"
                  :id="key"
                  v-model.number="selectedComponent.props[key]"
                  type="number"
                  class="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                />
                <textarea
                  v-else-if="typeof value === 'object' && value !== null && !Array.isArray(value)"
                  :id="key"
                  v-model="selectedComponent.props[key]"
                  rows="3"
                  class="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                ></textarea>
              </div>
            </div>
            <div v-else class="text-gray-400 text-sm">
              Select a component on the canvas to edit its properties.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/components/admin/AdminLayout.vue';
import DynamicRenderer from '@/components/DynamicRenderer.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useToast } from '@/composables/useToast';
import { supabase } from '@/lib/supabase';

interface Component {
  id: string;
  name: string;
  props: Record<string, any>;
}

const route = useRoute();
const { showToast } = useToast();

const selectedPage = ref<string>('homepage');
const pageLayout = ref<Component[]>([]);
const availableComponents = ref<Component[]>([]);
const selectedComponent = ref<Component | null>(null);
const isLoading = ref<boolean>(false);
const saveStatus = ref<string>('Saved');

const fetchPageLayout = async (pageName: string) => {
  isLoading.value = true;
  saveStatus.value = 'Loading...';
  try {
    const { data, error } = await supabase
      .from('page_layouts')
      .select('layout')
      .eq('page_name', pageName)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is fine for new pages
      throw error;
    }

    pageLayout.value = data ? data.layout : [];
    saveStatus.value = 'Loaded';
  } catch (err: any) {
    showToast('error', 'Error loading page layout', err.message);
    saveStatus.value = 'Error';
  } finally {
    isLoading.value = false;
  }
};

const fetchAvailableComponents = async () => {
  try {
    const { data, error } = await supabase
      .from('component_templates')
      .select('*');

    if (error) throw error;
    availableComponents.value = data.map(item => ({
      id: item.id,
      name: item.name,
      props: item.default_props || {},
    }));
  } catch (err: any) {
    showToast('error', 'Error loading components', err.message);
  }
};

const handlePageChange = () => {
  fetchPageLayout(selectedPage.value);
};

const dragStart = (component: Component) => {
  // Store a copy of the component to avoid reactivity issues during drag
  selectedComponent.value = JSON.parse(JSON.stringify(component));
};

const dragEnd = () => {
  // Clear selected component after drag ends
  selectedComponent.value = null;
};

const editComponent = (component: Component) => {
  selectedComponent.value = component;
};

const deleteComponent = (componentToDelete: Component) => {
  pageLayout.value = pageLayout.value.filter(
    (component) => component.id !== componentToDelete.id
  );
  selectedComponent.value = null;
  savePageLayout();
};

const handleSave = async () => {
  isLoading.value = true;
  saveStatus.value = 'Saving...';
  try {
    const { error } = await supabase
      .from('page_layouts')
      .upsert(
        {
          page_name: selectedPage.value,
          layout: pageLayout.value,
        },
        { onConflict: 'page_name' }
      );

    if (error) throw error;
    showToast('success', 'Page saved successfully!');
    saveStatus.value = 'Saved';
  } catch (err: any) {
    showToast('error', 'Error saving page', err.message);
    saveStatus.value = 'Error';
  } finally {
    isLoading.value = false;
  }
};

const savePageLayout = async () => {
  saveStatus.value = 'Saving...';
  try {
    const { error } = await supabase
      .from('page_layouts')
      .upsert(
        {
          page_name: selectedPage.value,
          layout: pageLayout.value,
        },
        { onConflict: 'page_name' }
      );

    if (error) throw error;
    saveStatus.value = 'Saved';
  } catch (err: any) {
    showToast('error', 'Error saving page layout', err.message);
    saveStatus.value = 'Error';
  }
};

const handlePreview = () => {
  const previewUrl = `${window.location.origin}/?preview=true&page=${selectedPage.value}`;
  window.open(previewUrl, '_blank');
};

watch(pageLayout, () => {
  savePageLayout();
}, { deep: true });

onMounted(() => {
  if (route.query.page) {
    selectedPage.value = route.query.page as string;
  }
  fetchPageLayout(selectedPage.value);
  fetchAvailableComponents();
});
</script>

<style scoped>
/* Add any specific styles for PageBuilder here */
</style>