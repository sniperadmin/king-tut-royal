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
                  @change="loadPage"
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
                Saving...
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
              <button
                @click="handlePublish"
                :disabled="isLoading"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Publish
              </button>
            </div>
          </div>
        </div>

        <!-- Main content area -->
        <div class="flex-1 flex overflow-hidden">
          <!-- Left sidebar: Section Library -->
          <SectionLibrary />

          <!-- Canvas area -->
          <CanvasArea />

          <!-- Right sidebar: Properties Panel -->
          <PropertiesPanel />
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
import type { Section } from '@/composables/admin/usePageBuilder';
import { getRegistryItem } from '@/registry/sections';

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

// Mapping between storage Section[] and builder Component[]
const mapSectionToComponent = (section: Section): Component => ({
  id: section.id,
  name: section.type,
  props: section.content || {}
});

const mapComponentToSection = (component: Component): Section => {
  const reg = getRegistryItem(component.name);
  const base = reg?.defaults();
  const fallback: Section = {
    id: component.id,
    type: component.name,
    visible: true,
    layout: { columns: 1, grid: 'full', background: { type: 'color', value: '#000000' } as any },
    content: {},
    styling: {}
  } as Section;
  const merged: Section = {
    ...(base as any || fallback),
    id: component.id,
    type: component.name,
    content: { ...(base?.content || {}), ...(component.props || {}) },
  } as Section;
  return merged;
};

const fetchPageLayout = async (pageName: string) => {
  isLoading.value = true;
  saveStatus.value = 'Loading...';
  try {
    const url = `${supabase.supabaseUrl}/functions/v1/get-page-layout?page=${encodeURIComponent(pageName)}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Failed to load page layout');
    const result = await res.json();
    const data = result.data;
    const draft: Section[] = (data?.layout_draft ?? data?.layout ?? []) as Section[];
    pageLayout.value = Array.isArray(draft) ? draft.map(mapSectionToComponent) : [];
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
    // Try DB templates first
    const { data, error } = await supabase
      .from('component_templates')
      .select('*');

    const list: Component[] = [];
    if (!error && Array.isArray(data)) {
      list.push(
        ...data.map((item: any) => ({
          id: item.id,
          name: item.name,
          props: item.default_props || {},
        }))
      );
    }

    // Fallback to registry-based defaults if DB is empty
    if (list.length === 0) {
      const { sectionsRegistry } = await import('@/registry/sections');
      list.push(
        ...sectionsRegistry.map((r) => {
          const def = r.defaults();
          return {
            id: def.id,
            name: r.type,
            // Map to current PageBuilder shape
            props: def.content as Record<string, any>,
          } as Component;
        })
      );
    }

    availableComponents.value = list;
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
    const sections = pageLayout.value.map(mapComponentToSection);
    const res = await fetch(`${supabase.supabaseUrl}/functions/v1/save-page-layout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageName: selectedPage.value,
        sections,
      })
    });
    if (!res.ok) throw new Error('Failed to save page');
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
    const sections = pageLayout.value.map(mapComponentToSection);
    const res = await fetch(`${supabase.supabaseUrl}/functions/v1/save-page-layout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageName: selectedPage.value,
        sections,
      })
    });
    if (!res.ok) throw new Error('Failed to save page layout');
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

const handlePublish = async () => {
  isLoading.value = true;
  saveStatus.value = 'Publishing...';
  try {
    // Ensure draft is saved before publishing
    await handleSave();
    const res = await fetch(`${supabase.supabaseUrl}/functions/v1/publish-page-layout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pageName: selectedPage.value })
    });
    if (!res.ok) throw new Error('Failed to publish page');
    showToast('success', 'Page published successfully!');
    saveStatus.value = 'Published';
  } catch (err: any) {
    showToast('error', 'Error publishing page', err.message);
    saveStatus.value = 'Error';
  } finally {
    isLoading.value = false;
  }
};

watch(pageLayout, () => {
  savePageLayout();
}, { deep: true });

onMounted(() => {
  if (route.query.page) {
    selectedPage.value = route.query.page as string
  }
  loadPage()
})
</script>

<style scoped>
/* Add any specific styles for PageBuilder here */
</style>