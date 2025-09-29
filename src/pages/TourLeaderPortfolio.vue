<template>
  <AppLayout>
    <div class="mx-auto p-0 mt-20">
    <div v-if="loading" class="text-center text-muted-foreground">Loading tour leader profile...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <div v-else-if="leader" class="container rounded-lg py-6 md:p-8 lg:p-10">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
      <button
          type="button"
          @click="router.push('/tour-leaders')"
          class="rounded-sm border border-brownish hover:bg-brownish hover:text-background text-brownish py-2 px-4 font-semibold tracking-wider transition-all duration-300 uppercase text-sm w-full md:w-auto mb-4 md:mb-0"
        >
          Back to Tour Leaders
      </button>
        <div class="flex-shrink-0">
          <img v-if="leader.avatar_url" :src="leader.avatar_url" :alt="leader.name" class="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-md" />
          <div v-else class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground shadow-md">
            {{ leader.name ? leader.name.charAt(0) : '?' }}
          </div>
        </div>
        <div class="flex-grow text-center md:text-left">
          <h1 class="text-2xl md:text-3xl font-bold text-primary-foreground">{{ leader.name }}</h1>
          <p class="text-md text-primary mt-2">{{ leader.specialties && leader.specialties.length > 0 ? leader.specialties.join(', ') : leader.experience || 'Private & Bespoke Tours' }}</p>
          <p class="text-md text-muted-foreground my-5">Languages: {{ leader.languages ? leader.languages.join(', ') : 'N/A' }}</p>
          <p v-if="leader.bio" class="text-foreground mt-4 leading-relaxed">{{ leader.bio }}</p>
        </div>
      </div>

      <div class="mt-10 border-t border-border pt-8">
        <h2 class="text-2xl font-bold text-primary-foreground mb-6">Experience & Certifications</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-xl font-semibold text-primary-foreground mb-3">Experience</h3>
            <ul class="list-disc list-inside text-foreground space-y-2">
              <li class="flex items-center gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />{{ leader.experience || 'Years of experience in luxury travel guidance.' }}</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-primary-foreground mb-3">Certifications</h3>
            <ul class="list-disc list-inside text-foreground space-y-2">
              <li v-for="(cert, index) in leader.certifications" :key="index" class="flex items-center gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />{{ cert }}</li>
              <li v-if="!leader.certifications || leader.certifications.length === 0" class="flex items-center gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />Licensed Tour Guide – Ministry of Tourism</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-border pt-8">
        <h2 class="text-2xl font-bold text-primary-foreground mb-6">Highlight Tours</h2>
        <ul class="list-disc list-inside text-foreground space-y-2">
          <li v-for="(tour, index) in leader.highlight_tours" :key="index" class="flex items-center gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />{{ tour }}</li>
          <li v-if="!leader.highlight_tours || leader.highlight_tours.length === 0" class="flex items-center gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />Customized luxury tours available upon request.</li>
        </ul>
      </div>

      <div class="mt-10 border-t border-border pt-8">
        <h2 class="text-2xl font-bold text-primary-foreground mb-6">Reviews</h2>
        <div v-if="leader.reviews && leader.reviews.length > 0" class="space-y-4">
          <p v-for="(review, index) in leader.reviews" :key="index" class="italic text-muted-foreground flex items-start gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary mt-1" />"{{ review }}"</p>
        </div>
        <p v-else class="text-muted-foreground flex items-start gap-2"><Sparkles class="inline-block h-5 w-5 mr-2 text-primary mt-1" />No reviews yet. Be the first to share your experience!</p>
      </div>
    </div>
    <div v-else class="text-center text-muted-foreground">Tour leader not found.</div>
  </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import AppLayout from '../components/AppLayout.vue'
import { Sparkles, Award, MapPin, MessageSquare } from 'lucide-vue-next'

interface TourLeader {
  id: string;
  name: string;
  languages: string[];
  avatar_url?: string;
  experience?: string;
  bio?: string;
  specialties?: string[];
  certifications?: string[];
  highlight_tours?: string[];
  reviews?: string[];
}

const leader = ref<TourLeader | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const route = useRoute();
const router = useRouter()

const fetchTourLeader = async () => {
  try {
    loading.value = true;
    const leaderId = route.params.id;
    
    const { data, error: supabaseError } = await supabase
      .from('guides_public')
      .select('id, name, languages, avatar_url, experience, bio, specialties, certifications, highlight_tours, reviews')
      .eq('id', leaderId)
      .single();

    if (supabaseError) {
      throw supabaseError;
    }
    leader.value = data as TourLeader;
  } catch (err: any) {
    error.value = err.message;
    console.error('Error fetching tour leader:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  fetchTourLeader();
});
</script>
