<template>
  <AppLayout>
    <section class="container mx-auto bg-light-blue pt-20">
      <div>
        <div class="flex justify-center mb-6">
          <button
            type="button"
            @click="router.push('/')"
            class="rounded-sm border border-brownish hover:bg-brownish hover:text-background text-brownish py-2 px-4 font-semibold tracking-wider transition-all duration-300 uppercase text-sm w-full md:w-auto mb-4 md:mb-0"
          >
            Back to Home
          </button>
        </div>
        <div class="mb-6">
          <div class="mx-auto text-center">
            <h2 class="text-3xl font-bold text-foreground max-w-full">Our Tour Leaders</h2>
            <h4 class="text-primary my-2">({{ leaders.length }} total)</h4>
            <p class="text-brownish font-bold mt-1">Meet our hand-picked experts who will guide your next luxury experience.</p>
          </div>
        </div>

        <div v-if="loading" class="text-center text-muted-foreground">Loading tour leaders...</div>
        <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
        <transition-group v-else name="fade" tag="div" id="leaders-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto" aria-live="polite">
          <article v-for="leader in leaders" :key="leader.id" class="leader-card bg-card border border-border rounded-lg p-5 flex flex-col items-start text-foreground transition-shadow hover:shadow-xl" role="article">
            <div class="flex flex-col sm:flex-row items-center w-full gap-4">
              <div class="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center mb-2 sm:mb-0">
                <img v-if="leader.avatar_url" :src="leader.avatar_url" :alt="leader.name" class="w-full h-full object-cover" loading="lazy" width="80" height="80" />
                <div v-else class="text-2xl font-semibold text-muted-foreground">{{ leader.name ? leader.name.charAt(0) : '?' }}</div>
              </div>
              <div class="flex-1 text-center sm:text-left">
                <h3 class="text-xl font-semibold">{{ leader.name }}</h3>
                <p class="text-sm text-primary font-medium mt-1">{{ getSpecialty(leader) }}</p>
              </div>
            </div>

            <p class="leader-desc text-muted-foreground mt-4 text-sm flex-grow">{{ getDescription(leader) }}</p>

            <div class="mt-4 w-full flex flex-col sm:flex-row items-center justify-between">
              <router-link :to="`/tour-leaders/${leader.id}`" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full shadow hover:scale-105 transition-transform mb-2 sm:mb-0" :aria-label="`View profile of ${leader.name}`">
                Profile
              </router-link>
              <div class="text-sm text-muted-foreground">Languages: <span class="text-muted-foreground">{{ formatLanguages(leader) }}</span></div>
            </div>
          </article>
        </transition-group>
      </div>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

interface TourLeader {
  id: string;
  name: string;
  languages: string[];
  avatar_url?: string;
  experience?: string;
  bio?: string;
  specialties?: string[];
}

const leaders = ref<TourLeader[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchTourLeaders = async () => {
  try {
    loading.value = true;
    const { data, error: supabaseError } = await supabase
      .from('guides_public')
      .select('id, name, languages, avatar_url, experience, bio, specialties');

    if (supabaseError) {
      throw supabaseError;
    }
    leaders.value = data as TourLeader[];
  } catch (err: any) {
    error.value = err.message;
    console.error('Error fetching tour leaders:', err);
  } finally {
    loading.value = false;
  }
};

function getSpecialty(l: TourLeader) {
  return l.specialties && l.specialties.length > 0 ? l.specialties[0] : l.experience || 'Private & Bespoke Tours';
}

function getDescription(l: TourLeader) {
  return l.bio || 'An experienced tour leader with deep local knowledge and a passion for creating memorable luxury travel experiences.';
}

function formatLanguages(l: TourLeader) {
  if(!l || !l.languages) return '';
  return l.languages.join(', ');
}

onMounted(() => {
  window.scrollTo(0, 0);
  fetchTourLeaders();
});
</script>

<style scoped>
</style>