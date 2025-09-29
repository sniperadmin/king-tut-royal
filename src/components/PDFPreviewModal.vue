<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
      <div class="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-brown">PDF Preview</h3>
        <button @click="emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
      </div>
      <div class="flex-grow p-4">
        <iframe :src="pdfUrl" class="w-full h-full border-none"></iframe>
      </div>
      <div class="p-4 border-t border-gray-200 text-right">
        <button @click="emit('close')" class="bg-gold text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>