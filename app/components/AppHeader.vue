<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="$vuetify.display.mdAndDown" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <NuxtLink to="/" class="flex text-wrap items-center gap-1.5 font-bold text-xl text-primary text-decoration-none">
        King Tut Royal
      </NuxtLink>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="$vuetify.display.lgAndUp">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        text
        :color="isActive(item.to) ? 'primary' : undefined"
        variant="text"
      >
        {{ item.text }}
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary :disable-resize-watcher="true" v-if="$vuetify.display.mdAndDown">
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" :color="isActive(item.to) ? 'primary' : undefined" @click="drawer = false">
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
const drawer = ref(false);
const route = useRoute();
const items = [
  { text: 'Home', to: '/' },
  { text: 'Packages', to: '/packages' },
  { text: 'Partners', to: '/partners' },
  { text: 'Why Us?', to: '/why-us' },
  { text: 'Tour Leaders', to: '/tour-leaders' },
];
const isActive = (href) => route.path === href;
</script>