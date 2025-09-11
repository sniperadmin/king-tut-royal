<template>
  <AppLayout>
    <div id="main-content" class="container mx-auto p-4 pt-24 sm:pt-28" role="main">
    <!-- <a href="#main-content" class="sr-only focus:not-sr-only inline-block p-2 bg-amber-400 text-gray-900 rounded" aria-label="Skip to main content">Skip to main content</a> -->
      <div v-if="leader" class="w-full mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-white max-w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <a href="#" @click.prevent="router.back()" class="text-amber-400 hover:text-amber-300 font-semibold mb-4 inline-flex items-center"><span class="mr-2">&larr;</span>Back</a>
        <header class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img v-if="leader.avatar" :src="leader.avatar" :alt="leader.name" loading="lazy" class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-gray-700 shadow-lg" />
          <div>
            <h1 id="leader-name" class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 leading-tight">{{ leader.name }}</h1>
            <p class="text-amber-300 font-semibold mb-2" aria-hidden="true">{{ leader.portfolio.experience }}</p>
            <p class="text-gray-300 text-sm">{{ leader.age ? `Age: ${leader.age}` : '' }} <span v-if="leader.languages"> • <span class="sr-only">Languages: </span><span aria-hidden="true">{{ Array.isArray(leader.languages) ? leader.languages.join(', ') : leader.languages }}</span></span></p>
            <div class="mt-4">
              <a class="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-amber-400 text-gray-900 font-semibold rounded-full shadow focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2" :href="`tel:${leader.phone.replace(/\\s+/g,'')}`" :aria-label="`Call ${leader.name} at ${leader.phone}`">Call: <span class="font-mono">{{ leader.phone }}</span></a>
            </div>
          </div>
        </header>

        <main class="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12" aria-labelledby="about-heading">
          <section id="about-section" aria-labelledby="about-heading" class="md:col-span-8 lg:col-span-8">
            <h2 id="about-heading" class="text-xl md:text-2xl font-semibold mb-2">About</h2>
            <p class="text-gray-200 mb-4">{{ leader.portfolio.bio }}</p>

            <h3 class="text-lg font-semibold mt-6">Specialties</h3>
            <ul class="list-disc list-inside text-gray-200">
              <li v-for="(s, i) in leader.portfolio.specialties" :key="i" class="mb-2">{{ s }}</li>
            </ul>

            <h3 class="text-lg font-semibold mt-6">Certifications</h3>
            <ul class="list-disc list-inside text-gray-200">
              <li v-for="(c, i) in leader.portfolio.certifications" :key="i" class="mb-2">{{ c }}</li>
            </ul>
          </section>

          <aside id="engagements" class="prose prose-invert md:col-span-4 lg:col-span-4" role="region" aria-labelledby="engagements-heading">
            <h2 id="engagements-heading" class="text-xl md:text-2xl font-semibold mb-2">Engagements</h2>
            <h5 class="font-medium text-amber-300">Highlighted Tours</h5>
            <ul class="list-disc list-inside text-gray-200 mb-4">
              <li v-for="(t, i) in leader.engagement.highlight_tours" :key="i" class="mb-2">{{ t }}</li>
            </ul>

            <h5 class="font-medium text-amber-300">Reviews</h5>
            <div class="space-y-2 text-gray-200 mb-6">
              <blockquote v-for="(r, i) in leader.engagement.reviews" :key="i" class="border-l-2 border-amber-300 pl-3 italic" aria-label="Review">"{{ r }}"</blockquote>
            </div>

            <!-- <div class="mt-4">
              <a v-if="leader.portfolio.video_persona" :href="leader.portfolio.video_persona" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-amber-400 text-gray-900 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-md" :aria-label="`Watch intro video for ${leader.name}`">Watch intro video</a>
            </div> -->
          </aside>
        </main>

        <div class="mt-8 space-y-3">
          <button
            type="button"
            @click="router.back()"
            class="w-full rounded-sm border-yellow-600 hover:bg-yellow-500 hover:text-black text-yellow-600 py-3 font-semibold tracking-wider transition-all duration-300 uppercase text-sm block text-center"
          >
            Back to Tour Leaders
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-300">
        <h2 class="text-2xl font-semibold">Tour leader not found</h2>
        <p class="mt-2">Please return to the <a href="#" @click.prevent="router.back()" class="text-yellow-400 underline">tour leaders list</a>.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import tourLeadersData from '../utils/tour_leaders.json'

const route = useRoute()
const router = useRouter()
const slugParam = String(route.params.slug || '')

const getSlug = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const leader = computed(() => {
  return (tourLeadersData as any[]).find(l => getSlug(l.name) === slugParam) || null
})

onMounted(() => { window.scrollTo(0,0) })
</script>

<style scoped>
:root{--accent:#f59e0b;--accent-strong:#b45309;--bg:#0f1724;--card:#0b1220}
/* Focus styles for keyboard users */
a:focus-visible, button:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:6px}
/* Ensure readable line-length and comfortable leading */
.prose{line-height:1.7;color:var(--text,#e6eef8)}
/* Slight heading tweak for better visual hierarchy */
#leader-name{letter-spacing:-0.5px}
/* Subtle image background for avatar to improve perceived contrast while lazy-loading */
img[loading="lazy"]{background-color:rgba(255,255,255,0.02)}
/* Make call-to-action more accessible and high contrast on small screens */
@media (max-width:640px){
  .inline-flex.items-center.px-4.py-2{font-weight:700;width:100%;justify-content:center}
}
/* Ensure sufficient contrast for decorative accents when necessary */
.text-amber-300{color:#fbbf24}
.text-yellow-400{color:#f59e0b}
</style>
