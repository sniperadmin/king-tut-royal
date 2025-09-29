<template>
<AppLayout>
  <BecomeAgentSection class="p-4" />
</AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import { Gem, DollarSign, Globe, Trophy } from 'lucide-vue-next'
import BecomeAgentSection from '@/components/sections/BecomeAgentSection.vue'
</script>