<template>
  <section class="container mx-auto bg-light-blue">
    <div class="py-6">
      <div class="flex items-center justify-between mb-6">
        <div class="mx-auto text-center">
          <h2 class="text-3xl font-bold text-foreground">Featured Tour Leaders</h2>
          <p class="text-brownish font-bold mt-1">Hand-picked experts to guide your next luxury experience.</p>
        </div>
      </div>

      <div v-if="loading" class="text-center text-muted-foreground">Loading featured tour leaders...</div>
      <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
      <div v-else-if="leaders.length === 0" class="text-center text-muted-foreground">No featured tour leaders available.</div>
      
      <SplideCarousel 
        v-else
        :options="carouselOptions"
        aria-label="Featured Tour Leaders"
        class="max-w-6xl mx-auto"
      >
        <SplideSlide v-for="leader in leaders" :key="leader.id">
          <article class="leader-card bg-card border border-border rounded-lg p-5 flex flex-col items-start text-foreground transition-shadow hover:shadow-xl h-full mx-2" role="article">
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
        </SplideSlide>
      </SplideCarousel>

      <div class="flex justify-center mt-6">
        <router-link to="/tour-leaders" class="px-6 py-3 bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10 transition shadow-lg">
          View All Tour Leaders
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import SplideCarousel from '../SplideCarousel.vue';
import { SplideSlide } from '@splidejs/vue-splide';

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

const carouselOptions = {
  rewind: true,
  autoplay: true,
  interval: 3000,
  pauseOnHover: true,
  lazyLoad: true,
  perPage: 3,
  gap: '1rem',
  pagination: false,
  breakpoints: {
    1024: {
      perPage: 2
    },
    768: {
      perPage: 1
    }
  }
};

const fetchFeaturedTourLeaders = async () => {
  try {
    loading.value = true;
    const { data, error: supabaseError } = await supabase
      .from('guides_public')
      .select('id, name, languages, avatar_url, experience, bio, specialties')
      .limit(6); // Fetch only 3 for featured section

    if (supabaseError) {
      throw supabaseError;
    }
    leaders.value = data as TourLeader[];
  } catch (err: any) {
    error.value = err.message;
    console.error('Error fetching featured tour leaders:', err);
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

function getSlug(name?: string) {
  if(!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

onMounted(() => {
  fetchFeaturedTourLeaders();
});
</script>

<style scoped>
.leader-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.leader-card {
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fade-enter-active, .fade-leave-active {
  transition: all 300ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* subtle card hover effect */
.leader-card:hover {
  transform: translateY(-4px);
}

/* make sure avatar area stays consistent */
.leader-card .w-20.h-20 {
  width: 5rem;
  height: 5rem;
}

@media (min-width: 768px) {
  .leader-desc { font-size: 0.95rem }
}
</style>