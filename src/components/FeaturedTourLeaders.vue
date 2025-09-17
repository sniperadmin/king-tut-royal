<template>
  <section class="mx-auto bg-light-blue">
    <div class="bg-card/60 border border-border p-10">
      <div class="flex items-center justify-between mb-6">
        <div class="mx-auto text-center">
          <h2 class="text-3xl font-bold text-foreground">Featured Tour Leaders</h2>
          <p class="text-brownish font-bold mt-1">Hand-picked experts to guide your next luxury experience.</p>
        </div>
      </div>

      <transition-group name="fade" tag="div" id="leaders-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto" aria-live="polite">
        <article v-for="leader in visibleLeaders" :key="leader.phone || leader.name" class="leader-card bg-card border border-border rounded-lg p-5 flex flex-col items-start text-foreground transition-shadow hover:shadow-xl" role="article">
          <div class="flex flex-col sm:flex-row items-center w-full gap-4">
            <div class="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center mb-2 sm:mb-0">
              <img v-if="leader.avatar" :src="leader.avatar" :alt="leader.name" class="w-full h-full object-cover" loading="lazy" width="80" height="80" />
              <div v-else class="text-2xl font-semibold text-muted-foreground">{{ leader.name ? leader.name.charAt(0) : '?' }}</div>
            </div>
            <div class="flex-1 text-center sm:text-left">
              <h3 class="text-xl font-semibold">{{ leader.name }}</h3>
              <p class="text-sm text-primary font-medium mt-1">{{ getSpecialty(leader) }}</p>
            </div>
          </div>

          <p class="leader-desc text-muted-foreground mt-4 text-sm flex-grow">{{ getDescription(leader) }}</p>

          <div class="mt-4 w-full flex flex-col sm:flex-row items-center justify-between">
            <router-link :to="`/tour-leaders/${getSlug(leader.name)}`" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full shadow hover:scale-105 transition-transform mb-2 sm:mb-0" :aria-label="`View profile of ${leader.name}`">
              Profile
            </router-link>
            <div class="text-sm text-muted-foreground">Languages: <span class="text-muted-foreground">{{ formatLanguages(leader) }}</span></div>
          </div>
        </article>
      </transition-group>

      <div class="flex justify-center mt-6">
        <router-link to="/tour-leaders" class="px-6 py-3 bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10 transition shadow-lg">
          View All Tour Leaders
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import tourLeadersData from '@/utils/tour_leaders.json'

interface TourLeader {
  phone?: string
  name: string
  languages?: string[] | string
  age?: number | null
  avatar?: string
  portfolio?: any
  specialty?: string
  description?: string
}

const leaders = ref<TourLeader[]>(tourLeadersData as TourLeader[] || [])
const expanded = ref(false)

const visibleLeaders = computed(() => {
  return expanded.value ? leaders.value : leaders.value.slice(0, 3)
})

function toggleExpanded() {
  expanded.value = !expanded.value
}

function getSpecialty(l: any) {
  return l.specialty || l.portfolio?.specialty || 'Private & Bespoke Tours'
}

function getDescription(l: any) {
  return l.description || l.portfolio?.summary || 'An experienced tour leader with deep local knowledge and a passion for creating memorable luxury travel experiences.'
}

function formatLanguages(l: any) {
  if(!l) return ''
  if(Array.isArray(l.languages)) return l.languages.join(', ')
  return l.languages || 'English'
}

function getSlug(name?: string) {
  if(!name) return ''
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}
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