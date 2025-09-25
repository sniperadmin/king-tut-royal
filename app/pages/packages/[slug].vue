<template>
  <v-container class="mt-8">
    <v-row class="justify-center mb-3">
      <v-btn to="/" color="secondary" variant="outlined">
        Back to home
      </v-btn>
    </v-row>
    <v-row class="justify-center mb-6">
      <h1 class="display-2">{{ packageDetails?.title }}</h1>
    </v-row>

    <v-row v-if="loading" justify="center">
      <v-progress-circular indeterminate color="primary" />
    </v-row>

    <v-row v-else-if="error" justify="center">
      <v-alert type="error">{{ error }}</v-alert>
    </v-row>

    <v-row v-else-if="packageDetails">
      <v-col v-if="packageDetails.videos.length" class="mt-4" cols="12">
        <p class="text-h5">Video</p>
        <UiVideoPlayer :videos="packageDetails.videos" />
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-img v-if="packageDetails.image" :src="packageDetails.image" cover height="400px"></v-img>
          <v-card-title>{{ packageDetails.title }}</v-card-title>
          <v-card-subtitle v-if="packageDetails.price">${{ packageDetails.price }} &mdash; {{ packageDetails.duration }}</v-card-subtitle>
          <v-card-text>
            <p>{{ packageDetails.description }}</p>
            <div v-if="packageDetails.highlights && packageDetails.highlights.length">
              <h3 class="mt-4">Highlights:</h3>
              <v-list>
                <v-list-item v-for="highlight in packageDetails.highlights" :key="highlight">
                  <template #prepend>
                    <v-icon color="primary">mdi-star</v-icon>
                  </template>
                  <v-list-item-content>
                    <v-list-item-title class="text-wrap">{{ highlight }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>

            <div v-if="packageDetails.images && packageDetails.images.length" class="mt-4">
              <h3>Gallery:</h3>
              <v-carousel hide-delimiters show-arrows="hover">
                <v-carousel-item
                  v-for="(image, i) in packageDetails.images"
                  :key="i"
                  :src="image"
                  cover
                ></v-carousel-item>
              </v-carousel>
            </div>

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Partners</v-card-title>
          <v-card-text>
            <div v-if="packageDetails.partners && packageDetails.partners.length">
              <v-list>
                <v-list-item v-for="partner in packageDetails.partners" :key="partner.name">
                  <v-list-item-content>
                    <v-list-item-title>{{ partner.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ partner.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <p v-else>No partners listed.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <p>Package not found.</p>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSupabaseClient } from '#imports';
import type { PackageData } from '@/types';

const route = useRoute();
const supabase = useSupabaseClient();

const packageDetails = ref<PackageData | null>(null);
const loading = ref(true);
const error = ref('');

const fetchPackageDetails = async () => {
  loading.value = true;
  error.value = '';
  const slug = route.params.slug;

  if (!slug) {
    error.value = 'Package slug not provided.';
    loading.value = false;
    return;
  }

  const { data, error: err } = await supabase
    .from('packages_view')
    .select('*')
    .eq('slug', slug)
    .single();

  if (err) {
    error.value = err.message || 'Error fetching package details';
    packageDetails.value = null;
  } else {
    packageDetails.value = data.package;
  }
  loading.value = false;
};

onMounted(() => {
  fetchPackageDetails();
});
</script>