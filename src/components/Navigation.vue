<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center mt-3">
          <router-link to="/" class="text-2xl font-royal font-bold text-primary">EGYPT IN STYLE</router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8 mt-3">
          <button @click="scrollToSection('home')" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0">Home</button>
          <router-link to="/packages" :class="{'text-primary': isActive('/packages')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0">Packages</router-link>
          <router-link to="/partners" :class="{'text-primary': isActive('/partners')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0">Partners</router-link>
          <router-link to="/become-agent" :class="{'text-primary': isActive('/become-agent')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0">Become an Agent</router-link>
          <router-link to="/why-us" :class="{'text-primary': isActive('/why-us')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0">Why Us</router-link>
          <router-link to="/tour-leaders" :class="{'text-primary': isActive('/tour-leaders')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0">Tour Leaders</router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="fixed top-4 right-4 w-12 h-12 bg-transparent border-none outline-none cursor-pointer z-[60]"
            style="touch-action: manipulation; -webkit-tap-highlight-color: transparent;"
            type="button"
          >
            <span class="sr-only">Toggle menu</span>
            <div class="w-full h-full flex items-center justify-center">
              <svg class="w-6 h-6 pointer-events-none text-foreground hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-primary/20">
        <div class="flex flex-col space-y-4">
          <button @click="scrollToSection('home')" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Home</button>
          <router-link to="/packages" :class="{'text-primary': isActive('/packages')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Packages</router-link>
          <router-link to="/partners" :class="{'text-primary': isActive('/partners')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Partners</router-link>
          <router-link to="/become-agent" :class="{'text-primary': isActive('/become-agent')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Become an Agent</router-link>
          <router-link to="/why-us" :class="{'text-primary': isActive('/why-us')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Why Us</router-link>
          <router-link to="/tour-leaders" :class="{'text-primary': isActive('/tour-leaders')}" class="text-foreground hover:text-primary transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Tour Leaders</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { smoothScroll } from '../utils/smoothScroll'
import { RouterLink, useRouter } from 'vue-router'

const isMenuOpen = ref(false)

const router = useRouter()

const isActive = (path: string) => {
  return router.currentRoute.value.path.startsWith(path)
}

const headerHeight = () => {
  const nav = typeof document !== 'undefined' ? document.querySelector('nav') : null
  return nav ? (nav as HTMLElement).offsetHeight : 64
}

const scrollToSection = (id: string) => {
  const pushToHomeWithQuery = (scrollId: string) => router.push({ path: '/', query: { scroll: scrollId } })
  if (router.currentRoute.value.path !== '/') {
    // When navigating from another route, include the scroll target in the query so the destination can handle lazy-mounted sections.
    if (id === 'booking') {
      pushToHomeWithQuery(id).then(() => {
        isMenuOpen.value = false
      })
    } else {
      pushToHomeWithQuery(id).then(() => {
        nextTick(() => {
          smoothScroll(id, { offset: headerHeight() })
          isMenuOpen.value = false
        })
      })
    }
  } else {
    nextTick(() => {
      smoothScroll(id, { offset: headerHeight() })
      isMenuOpen.value = false
    })
  }
}
</script>

<script lang="ts">
export default {
  name: 'Navigation'
}
</script>