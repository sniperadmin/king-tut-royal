<template>
  <v-container v-if="tourLeader">
    <v-row class="justify-center mt-5">
      <v-btn to="/tour-leaders" color="secondary" variant="outlined">
        Back to tour leaders
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mx-auto my-8" elevation="4">
          <v-img
            :src="tourLeader.avatar_url || 'https://via.placeholder.com/300'"
            class="align-end"
            height="300px"
            cover
          >
            <v-card-title class="text-white text-h4">{{ tourLeader.name }}</v-card-title>
          </v-img>

          <v-card-text>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-avatar size="120" class="mt-n16 elevation-6">
                  <v-img :src="tourLeader.avatar_url || 'https://via.placeholder.com/150'"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" class="text-center">
                <h2 class="text-h5">{{ tourLeader.name }}</h2>
                <p class="text-subtitle-1 text-grey">{{ tourLeader.experience }} years experience</p>
              </v-col>
              <v-col cols="12">
                <v-divider class="my-4"></v-divider>
                <h3 class="text-h6">Bio</h3>
                <p>{{ tourLeader.bio }}</p>
              </v-col>
              <v-col cols="12">
                <h3 class="text-h6">Languages</h3>
                <v-chip-group>
                  <v-chip v-for="lang in tourLeader.languages" :key="lang">{{ lang }}</v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12">
                <h3 class="text-h6">Specialties</h3>
                <v-chip-group>
                  <v-chip v-for="specialty in tourLeader.specialties" :key="specialty">{{ specialty }}</v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" v-if="tourLeader.certifications && tourLeader.certifications.length">
                <h3 class="text-h6">Certifications</h3>
                <v-list density="compact">
                  <v-list-item v-for="cert in tourLeader.certifications" :key="cert">
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-certificate</v-icon>
                    </template>
                    <v-list-item-title>{{ cert }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" v-if="tourLeader.highlight_tours && tourLeader.highlight_tours.length">
                <h3 class="text-h6">Highlight Tours</h3>
                <v-list density="compact">
                  <v-list-item v-for="tour in tourLeader.highlight_tours" :key="tour">
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title>{{ tour }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
              <!-- <v-col cols="12" v-if="tourLeader.reviews && tourLeader.reviews.length">
                <h3 class="text-h6">Reviews</h3>
                <v-list density="compact">
                  <v-list-item v-for="review in tourLeader.reviews" :key="review.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ review.reviewer_name }} - <v-rating :model-value="review.rating" readonly half-increments density="compact"></v-rating></v-list-item-title>
                      <v-list-item-subtitle>{{ review.comment }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col> -->
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-4">Loading tour leader details...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { TourLeader } from '@/types';
// interface Review {
//   id: string;
//   reviewer_name: string;
//   rating: number;
//   comment: string;
// }

// interface TourLeader {
//   id: string;
//   name: string;
//   languages: string[];
//   avatar_url: string;
//   experience: number;
//   bio: string;
//   specialties: string[];
//   certifications?: string[];
//   highlight_tours?: string[];
//   reviews?: Review[];
// }

const route = useRoute();
const supabase = useSupabaseClient();
const tourLeader = ref<TourLeader | null>(null);

const fetchTourLeader = async () => {
  const leaderId = route.params.id;
  if (!leaderId) {
    console.error('No leader ID found in route params.');
    return;
  }

  const { data, error } = await supabase
    .from('guides_public')
    .select('id, name, languages, avatar_url, experience, bio, specialties, certifications, highlight_tours, reviews')
    .eq('id', leaderId)
    .single();

  if (error) {
    console.error('Error fetching tour leader:', error.message);
    tourLeader.value = null; // Ensure it's null on error
  } else {
    tourLeader.value = data as TourLeader;
  }
};

onMounted(() => {
  fetchTourLeader();
});

useSeoMeta({
  title: tourLeader.value ? `Tour Leader: ${tourLeader.value.name}` : 'Tour Leader Profile',
  description: tourLeader.value ? `Learn more about ${tourLeader.value.name}, an experienced tour leader.` : 'Detailed profile of a tour leader.',
});
</script>

<style scoped>
.v-card-title {
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
}
</style>