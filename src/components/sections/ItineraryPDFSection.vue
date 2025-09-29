<template>
  <section class="itinerary-pdf-section py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center text-brown mb-12">Download Itinerary</h2>
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
        <!-- PDF Cards will be rendered here -->
        <p v-if="loading" class="text-center">Loading itineraries...</p>
        <p v-else-if="error" class="text-center text-red-500">Error loading itineraries: {{ error.message }}</p>
        <p v-else-if="itineraries.length === 0" class="text-center">No itineraries available at the moment.</p>
        <div class="lg:container">
          <PDFCard v-for="itinerary in itineraries" :key="itinerary.id" :itinerary="itinerary" @preview="openPreviewModal" />
        </div>
      </div>

      <!-- PDF Preview Modal -->
      <PDFPreviewModal :show="showModal" :pdfUrl="currentPdfUrl" @close="closePreviewModal" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PDFCard from '../PDFCard.vue';
import PDFPreviewModal from '../PDFPreviewModal.vue';
import type { ItineraryPDF } from '../../types';
import { supabase } from '../../lib/supabase';

const itineraries = ref<ItineraryPDF[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);
const showModal = ref(false);
const currentPdfUrl = ref('');

const fetchItineraries = async () => {
  try {
    const { data, error: supabaseError } = await supabase
      .from('itinerary_pdfs_view')
      .select('*');

    if (supabaseError) {
      throw supabaseError;
    }

    itineraries.value = data.map(i => ({
      ...i.itinerary_pdf,
      file_size: i.itinerary_pdf.file_size ? parseFloat(i.itinerary_pdf.file_size) : null,
    })) || [];
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchItineraries();
});

const openPreviewModal = (pdfUrl: string) => {
  currentPdfUrl.value = pdfUrl;
  showModal.value = true;
};

const closePreviewModal = () => {
  showModal.value = false;
  currentPdfUrl.value = '';
};
</script>

<style scoped>
/* Add any specific styles here if needed, though Tailwind should handle most */
</style>
