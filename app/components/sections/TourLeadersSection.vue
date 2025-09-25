<template>
    <!-- Featured Tour Leaders -->
    <v-container fluid>
      <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="text-h4 text-primary font-weight-bold mb-2">Featured Tour Leaders?</h2>
          <p class="text-subtitle-1 text-secondary">Hand-picked experts to guide your next luxury experience.</p>
        </v-col>
      </v-row>

      <v-sheet
        class="mx-auto"
        max-width="600"
      >
        <v-slide-group
          show-arrows
        >
          <v-slide-group-item
            v-for="leader in tourLeaders"
            :key="leader.id"
          >
            <v-card
              class="ma-2"
            >
              <v-card-item>
                <!-- `https://api.dicebear.com/7.x/avataaars/svg?seed=${n}` -->
                <v-avatar
                  class="mb-2 mx-auto d-block"
                  size="64"
                  :image="leader.avatar_url"
                />
                <v-card-title>{{ leader.name }}</v-card-title>
                <v-card-subtitle>Professional Guide</v-card-subtitle>
              </v-card-item>

              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="text"
                  :to="`/tour-leaders/${leader.id}`"
                >
                  Profile
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-row class="justify-center my-5">
        <v-btn to="/tour-leaders" color="primary" variant="outlined">
          View More
        </v-btn>
    </v-row>
    </v-container>
    <!-- ./Featured Tour Leaders -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TourLeader } from '@/types';

const supabase = useSupabaseClient();
const tourLeaders = ref<TourLeader[]>([]);

const fetchTourLeaders = async () => {
  const { data, error } = await supabase
    .from('guides_public')
    .select('id, name, languages, avatar_url, experience, bio, specialties')
    .limit(5);

  if (error) {
    console.error('Error fetching tour leaders:', error.message);
  } else {
    tourLeaders.value = data as TourLeader[];
  }
};

onMounted(() => {
  fetchTourLeaders();
});

</script>
