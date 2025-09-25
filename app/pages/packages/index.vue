<template>
  <v-container class="mt-8">
    <v-row class="justify-center mb-3">
      <v-btn to="/" color="secondary" variant="outlined">
        Back to home
      </v-btn>
    </v-row>
    <v-row class="justify-center mb-6">
      <h1 class="display-2">Packages</h1>
    </v-row>
    <v-row>
      <v-col v-for="(pkg, idx) in packages" :key="pkg.id || idx" cols="12" sm="12" md="12" lg="12">
        <v-card
        v-if="pkg"
        max-width="400"
        class="mx-auto elevation-12"
        >
        <v-img
            :src="pkg.image"
            height="240px"
            cover
            class="rounded-t"
            alt="Package photo"
        >
          <v-chip
            v-if="pkg.isPopular"
            prepend-icon="mdi-star"
            class="ma-2"
            color="primary"
            variant="flat"
          >
            Popular
          </v-chip>
        </v-img>
        <v-card-title class="font-bold text-xl text-center">
            {{ pkg.title }}
        </v-card-title>
        <v-card-subtitle class="text-secondary text-h5 text-wrap text-center">
            {{ pkg.price }} &mdash; {{ pkg.duration }}
        </v-card-subtitle>
        <v-card-text>
            <div v-if="pkg.highlights && pkg.highlights.length">
            <v-list>
                <v-list-item
                v-for="highlight in pkg.highlights"
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
        <v-card-actions>
          <v-btn color="primary" :to="`/packages/${pkg.slug}`">View Details</v-btn>
        </v-card-actions>
    </v-card>
      </v-col>
    </v-row>
    <v-row v-if="loading" justify="center">
      <!-- <v-progress-circular indeterminate color="primary" /> -->
      <div>
        <v-skeleton-loader
            v-for="i in 2"
            :key="i"
            class="mx-auto border"
            max-width="300"
            type="card-avatar, article, paragraph, actions"
        />
    </div>
    </v-row>
    <v-row v-if="error" justify="center">
      <v-alert type="error">{{ error }}</v-alert>
    </v-row>
    <v-row v-if="!loading && packages.length === 0 && !error" justify="center">
      <p>No packages found.</p>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const packages = ref([]);
const loading = ref(true);
const error = ref('');

const supabase = useSupabaseClient();

const fetchPackages = async () => {
  loading.value = true;
  error.value = '';
  const { data, error: err } = await supabase.from('packages_view')
    .select('*')
    .order('sort_rank', { ascending: true })
    .limit(1)
  if (err) {
    error.value = err.message || 'Error fetching packages';
    packages.value = [];
  } else {
    packages.value = data.map(pkg => pkg.package) || [];
  }
  loading.value = false;
};

onMounted(() => {
  fetchPackages();
});
</script>