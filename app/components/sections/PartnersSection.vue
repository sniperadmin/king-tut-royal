<template>
  <v-container class="py-12 bg-blue-grey-lighten-5" fluid>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h4 class="text-h4 font-weight-bold text-primary">Our Partners</h4>
        <p class="text-subtitle-1 text-secondary">We are proud to collaborate with world-class brands and organizations.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="partner in partners"
        :key="partner.id"
        cols="12"
        sm="6"
        md="6"
        lg="6"
        class="text-center mb-6"
      >
        <v-card
          elevation="2"
          :to="`/partners/${partner.id}`"
          class="pa-4 d-flex flex-column align-center justify-center h-100"
        >
          <v-img
            :src="partner.logo.large"
            :srcset="`${partner.logo.small} 100w, ${partner.logo.medium} 200w, ${partner.logo.large} 300w`"
            sizes="(max-width: 600px) 100px, (max-width: 960px) 200px, 300px"
            :alt="partner.name"
            lazy-src
            height="200"
            width="300"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-btn to="/partners" color="primary" variant="outlined">
        View More
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Partner } from '@/types'
import type { Database } from '@/types/database.types'

interface Partner {
  id: number
  name: string
  logo_url: string
}

const partners = ref<Partner[]>([])
const loading = ref(true)

const supabase = useSupabaseClient<Database>()

onMounted(async () => {
  loading.value = true
  const { data, error } = await supabase.from('partners_view').select('*')
  if (!error && Array.isArray(data)) {
    partners.value = data.map(p => p.partner) as Partner[]
  }
  loading.value = false
})
</script>

<style scoped>

</style>