<template>
  <BaseCard
    variant="ghost"
    :hoverable="false"
    :shadow="false"
    customClass="animate-pulse"
  >
    <template #media v-if="showMedia">
      <div class="w-full h-48 bg-gray-300 rounded-t-lg"></div>
    </template>

    <template #content>
      <div class="space-y-3">
        <div v-if="showTitle" class="h-6 bg-gray-300 rounded w-3/4"></div>
        <div v-if="showDescription" class="space-y-2">
          <div class="h-4 bg-gray-300 rounded"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div v-if="showHighlights" class="space-y-2 mt-4">
          <div v-for="i in highlightCount" :key="i" class="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </template>

    <template #actions v-if="showActions">
      <div class="space-y-3">
        <div class="h-10 bg-gray-300 rounded"></div>
        <div v-if="dualActions" class="h-10 bg-gray-300 rounded"></div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue';

interface Props {
  showMedia?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showHighlights?: boolean;
  showActions?: boolean;
  dualActions?: boolean;
  highlightCount?: number;
}

withDefaults(defineProps<Props>(), {
  showMedia: true,
  showTitle: true,
  showDescription: true,
  showHighlights: false,
  showActions: false,
  dualActions: false,
  highlightCount: 3,
});
</script>