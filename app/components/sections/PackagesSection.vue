<template>
<v-container fluid class="pa-5">
    <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8" class="text-center">
            <h4 class="text-h4 text-center font-weight-bold text-primary">Choose Your Royal Experience</h4>
            <p class="text-subtitle-1 text-center text-secondary">Exclusive packages designed for the discerning traveler</p>
        </v-col>
    </v-row>
    <v-card
        v-if="featuredPackage"
        max-width="400"
        class="mx-auto elevation-12"
        variant="outlined"
        color="primary"
        >
        <v-img
            :src="featuredPackage.image"
            height="240px"
            cover
            class="rounded-t"
            alt="Package photo"
        >
             <v-chip
                v-if="featuredPackage.isPopular"
                prepend-icon="mdi-star"
                class="ma-2"
                color="primary"
                variant="flat"
            >
                Popular
            </v-chip>
        </v-img>
        <v-card-title class="font-bold text-xl text-center">
            {{ featuredPackage.title }}
        </v-card-title>
        <v-card-subtitle class="text-secondary text-h5 text-wrap text-center">
            {{ featuredPackage.price }} &mdash; {{ featuredPackage.duration }}
        </v-card-subtitle>
        <v-card-text>
            <div v-if="featuredPackage.highlights && featuredPackage.highlights.length">
            <v-list>
                <v-list-item
                v-for="highlight in featuredPackage.highlights"
                :key="highlight"
                >
                <template v-slot:prepend>
                    <v-icon color="primary">mdi-star</v-icon>
                </template>
                <v-list-item-content>
                    <v-list-item-title class="text-wrap">{{ highlight }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
            </div>
        </v-card-text>
        <v-card-actions class="justify-center">
        <v-btn color="primary" :to="`/packages/${featuredPackage.slug}`">View Details</v-btn>
        </v-card-actions>
    </v-card>

    <div v-else>
        <v-skeleton-loader
            class="mx-auto border"
            max-width="300"
            type="card-avatar, article, actions"
        />
    </div>

    <v-row class="justify-center my-7">
      <v-btn color="primary" variant="outlined" @click="$router.push('/packages')">
        View All Packages
      </v-btn>
    </v-row>
</v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { useSupabaseClient } from '#imports';
import type { PackageData } from '@/types';

const featuredPackage = ref<PackageData | null>(null);

onMounted(async () => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase
    .from('packages_view')
    .select('*')
    .order('sort_rank', { ascending: true })
    .limit(1);

  if (!error && data && data.length > 0) {
    featuredPackage.value = data[0].package
  }
});
</script>