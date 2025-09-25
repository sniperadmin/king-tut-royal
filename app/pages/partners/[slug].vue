<template>
  <v-container v-if="partner" class="py-12 bg-blue-grey-lighten-5" fluid>
    <v-row class="justify-center mb-3">
      <v-btn to="/partners" color="secondary" variant="outlined">
        Back to partners
      </v-btn>
    </v-row>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h4 class="text-h4 font-weight-bold text-primary">{{ partner.name }}</h4>
        <p class="text-subtitle-1 text-secondary">{{ partner.description }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-img
          :src="partner.logo.large"
          :srcset="`${partner.logo.small} 100w, ${partner.logo.medium} 200w, ${partner.logo.large} 300w`"
          sizes="(max-width: 600px) 100px, (max-width: 960px) 200px, 300px"
          :alt="partner.name"
          lazy-src
          height="300"
          width="500"
          class="mx-auto"
        />
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-8">
      <v-col cols="12" md="8">
        <p class="text-subtitle-1">{{ partner.about }}</p>
        <v-carousel
            height="400"
            cycle
            class="mb-6"
        >
          <v-carousel-item v-for="image in partner.media" :key="image.id">
            <v-img :src="image.src" :srcset="image.srcset" :alt="partner.name" cotain width="100%" />
          </v-carousel-item>
        </v-carousel>

        <v-card variant="text" class="pa-4">
          <v-card-title class="text-h5">Our Services</v-card-title>
          <v-card-text>
            <v-list bg-color="transparent">
              <v-list-item
                v-for="service in partner.services"
                :key="service.id"
                :title="service"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-star" color="warning" />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else-if="!loading" class="py-12 text-center">
    <p class="text-h5">Partner not found.</p>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Database } from '@/types/database.types';
import type { Partner } from '@/types'

// interface Partner {
//   id: number;
//   name: string;
//   slug: string;
//   logo_url: string;
//   description?: string;
//   website_url?: string;
//   contact_email?: string;
//   phone_number?: string;
// }

const route = useRoute();
const partner = ref<Partner | null>(null);
const loading = ref(true);

const supabase = useSupabaseClient<Database>();

onMounted(async () => {
  try {
    const id = route.params.slug as string;
    loading.value = true;
    const { data, error } = await supabase
      .from('partners_view')
      .select('*')
      .eq('partner->>id', id)
      .single();

    if (error) {
      console.error('Error fetching partner:', error);
    } else if (data) {
      partner.value = data.partner as Partner;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>