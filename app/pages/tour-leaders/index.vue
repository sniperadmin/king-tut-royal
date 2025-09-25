<template>
  <v-container>
    <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8" class="text-center">
            <h4 class="text-h4 text-center font-weight-bold text-primary">Our Tour Leaders</h4>
            <p class="text-subtitle-1 text-center text-secondary">{{ tourLeaders.length }} leaders</p>
        </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="leader in tourLeaders"
        :key="leader.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto my-4" max-width="344">
          <v-list-item class="text-center">
            <v-list-item-avatar size="80" class="mx-auto">
              <v-avatar :image="leader.avatar_url || 'https://via.placeholder.com/150'" size="80"></v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">{{ leader.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ leader.specialties[0] }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="text-center">
            <v-chip-group class="justify-center mt-2 text-center">
              <v-chip v-for="lang in leader.languages" :key="lang" small class="mx-auto">{{ lang }}</v-chip>
            </v-chip-group>
            <v-chip-group class="justify-center mt-2">
              <v-chip v-for="specialty in leader.specialties" :key="specialty" small>{{ specialty }}</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" variant="outlined" @click="$router.push(`/tour-leaders/${leader.id}`)" class="mb-3">View More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TourLeader } from '@/types';

const supabase = useSupabaseClient();
const tourLeaders = ref<TourLeader[]>([]);

const fetchTourLeaders = async () => {
  const { data, error } = await supabase
    .from('guides_public')
    .select('id, name, languages, avatar_url, experience, bio, specialties');

  if (error) {
    console.error('Error fetching tour leaders:', error.message);
  } else {
    tourLeaders.value = data as TourLeader[];
  }
};

onMounted(() => {
  fetchTourLeaders();
});

useSeoMeta({
  title: 'Our Tour Leaders',
  description: 'Meet our experienced and knowledgeable tour leaders for your Egypt in Style journey.',
});
</script>

<style scoped>
.v-list-item-avatar {
  margin-bottom: 16px;
}
</style>