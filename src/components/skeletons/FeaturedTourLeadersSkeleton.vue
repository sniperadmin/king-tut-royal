<template>
  <BaseCardSkeleton
    :showMedia="false"
    :showTitle="false"
    :showDescription="true"
    :showHighlights="false"
    :showActions="false"
  />
</template>
  
  <script setup lang="ts">
import BaseCardSkeleton from './BaseCardSkeleton.vue';
</script>