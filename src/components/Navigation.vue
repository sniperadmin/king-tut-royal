<template>
  <header class="fixed top-0 left-0 right-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-background/80 backdrop-blur-md text-sm py-3 border-b border-primary/20">
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="flex-none text-xl font-royal font-bold text-primary focus:outline-hidden focus:opacity-80"
          aria-label="Brand"
        >
          EGYPT IN STYLE
        </router-link>

        <!-- Mobile toggle -->
        <div class="sm:hidden">
          <button
            type="button"
            @click="isMenuOpen = !isMenuOpen"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
            aria-controls="mobile-navbar"
            aria-label="Toggle navigation"
            class="
              w-10
              h-10
              relative
              flex
              justify-center
              items-center
              rounded-lg
              border
              border-gray-200
              bg-white
              text-gray-800
              shadow-2xs
              hover:bg-gray-50
              focus:outline-hidden
              focus:bg-gray-50
              disabled:opacity-50
              disabled:pointer-events-none
              dark:bg-transparent
              dark:border-neutral-700
              dark:text-white
              dark:hover:bg-white/10
              dark:focus:bg-white/10
            "
          >
            <!-- Hamburger -->
            <svg v-if="!isMenuOpen" class="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" x2="21" y1="6" y2="6"/>
              <line x1="3" x2="21" y1="12" y2="12"/>
              <line x1="3" x2="21" y1="18" y2="18"/>
            </svg>
            <!-- Close -->
            <svg v-else class="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        id="mobile-navbar"
        :class="isMenuOpen ? 'block' : 'hidden'"
        class="transition-all duration-300 basis-full grow sm:block"
      >
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <button @click="scrollToSection('home')" class="font-medium text-foreground hover:text-primary focus:outline-hidden focus:text-primary bg-transparent border-none p-0">Home</button>
          <router-link to="/packages" :class="{'text-primary': isActive('/packages')}" class="font-medium text-foreground hover:text-primary focus:outline-hidden focus:text-primary bg-transparent border-none p-0">Packages</router-link>
          <router-link to="/partners" :class="{'text-primary': isActive('/partners')}" class="font-medium text-foreground hover:text-primary focus:outline-hidden focus:text-primary bg-transparent border-none p-0">Partners</router-link>
          <router-link to="/why-us" :class="{'text-primary': isActive('/why-us')}" class="font-medium text-foreground hover:text-primary focus:outline-hidden focus:text-primary bg-transparent border-none p-0">Why Us</router-link>
          <router-link to="/tour-leaders" :class="{'text-primary': isActive('/tour-leaders')}" class="font-medium text-foreground hover:text-primary focus:outline-hidden focus:text-primary bg-transparent border-none p-0">Tour Leaders</router-link>
        </div>
      </div>
    </nav>
  </header>
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
  const nav = typeof document !== 'undefined' ? document.querySelector('header') : null
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
