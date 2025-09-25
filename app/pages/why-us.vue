<template>
  <v-container fluid class="mt-7">
    <v-row class="justify-center mb-3">
      <v-btn to="/" color="secondary" variant="outlined">
        Back to home
      </v-btn>
    </v-row>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h4 class="text-h4 font-weight-bold text-primary">Why Us</h4>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card link :href="post.link" target="_blank" class="text-center mb-8">
            <v-img :src="post.image" height="200px"></v-img>
            <v-card-title class="text-wrap">{{ post.title }}</v-card-title>
            <v-card-subtitle class="text-wrap">{{ post.excerpt }}</v-card-subtitle>
            <v-card-actions class="justify-center">
              <v-btn color="primary" :href="post.link" target="_blank">Read More</v-btn>
            </v-card-actions>
          </v-card>

          <v-card flat class="pa-4 text-center">
            <h2 class="text-h5 font-weight-bold mb-4">Introduction to SY Consulting</h2>
            <p class="mb-4">
              SY Consulting FZ-LLC, headquartered in the United Arab Emirates, brings together more than 30 years of global expertise in the fields of luxury, lifestyle, hospitality, and tourism innovation. Over three decades, our team has worked alongside world-class brands, celebrities, high-net-worth individuals, and government entities, creating bespoke products, high-profile events, and iconic lifestyle concepts across Europe, the Middle East, and beyond.
            </p>
            <p class="mb-4">
              As part of this journey, we are proud to introduce <a href="https://www.worldinstyle.net/" target="_blank">www.worldinstyle.net</a> – our next-generation digital platform dedicated to luxury travel and lifestyle experiences. World In Style offers specially curated, bespoke VIP packages, designed exclusively by SY Consulting, highlighting once-in-a-lifetime experiences such as private cultural immersions, world-class hospitality, and access to prestigious events.
            </p>
            <p class="mb-4">
              To extend our global reach and create shared value, SY Consulting is launching a new B2B Affiliate Program through World In Style. This program is designed for travel agencies, hospitality partners, influencers, and lifestyle brands who wish to join our growing ecosystem.
            </p>
            
            <UiVideoPlayer :videos="[{ url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/why-us/why-us.m3u8' }]" />

            <h3 class="text-h6 font-weight-bold mt-7">Key Benefits for Our Partners</h3>
            <v-list density="compact text-left">
              <v-list-item class="mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" icon="mdi-cash-multiple" size="large"></v-icon>
                </template>
                <v-list-item-title class="text-h6 mb-1 text-wrap">Attractive Commission Structure</v-list-item-title>
                <p class="text-wrap text-medium-emphasis">Earn competitive commissions on every confirmed booking made via your network.</p>
              </v-list-item>
              
              <v-list-item class="mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" icon="mdi-star" size="large"></v-icon>
                </template>
                <v-list-item-title class="text-h6 mb-1 text-wrap">Exclusive Rewards & Privileges</v-list-item-title>
                <p class="text-wrap text-medium-emphasis">Gain access to special incentives, loyalty benefits, and VIP privileges tailored to our partners.</p>
              </v-list-item>

              <v-list-item class="mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" icon="mdi-bullhorn" size="large"></v-icon>
                </template>
                <v-list-item-title class="text-h6 mb-1 text-wrap">Premium Marketing Support</v-list-item-title>
                <p subtitle class="text-wrap text-medium-emphasis">Partners receive marketing materials, co-branding opportunities, and access to our global PR and media channels.</p>
              </v-list-item>

              <v-list-item class="mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" icon="mdi-briefcase" size="large"></v-icon>
                </template>
                <v-list-item-title class="text-h6 mb-1 text-wrap">Bespoke Product Portfolio</v-list-item-title>

                <p class="text-wrap text-medium-emphasis">
                  Offer your clients curated, high-margin VIP travel and lifestyle packages not available on standard platforms.
                </p>
              </v-list-item>

              <v-list-item class="mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" icon="mdi-shield-check" size="large"></v-icon>
                </template>
                <v-list-item-title class="text-h6 mb-1 text-wrap">Trusted Expertise</v-list-item-title>
                <p class="text-wrap text-medium-emphasis">Leverage our 30 years of know-how, supply chains, and global connections to deliver seamless luxury experiences.</p>
              </v-list-item>
            </v-list>
            <p class="mt-4 mb-4">
              Through World In Style, SY Consulting FZ-LLC provides a bridge between exceptional travel products and our valued B2B affiliates, ensuring sustainable revenue growth, long-term collaboration, and exclusive market positioning for all stakeholders.
            </p>
            <p>
              <a href="https://www.sherinyosry.com/" target="_blank">www.sherinyosry.com</a>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const post = ref({
    title: "Sherin Yosry Consulting and the King Tut Royal Legacy",
    excerpt: "An exclusive journey into Egypt’s timeless heritage meets modern luxury through Sherin Yosry’s visionary leadership. The lights of Cairo glistened on the horizon, casting their golden reflection on the timeless Nile.",
    image: "https://ceotimes.com/wp-content/uploads/2025/09/download-2-23-1170x585.png",
    link: "https://ceotimes.com/sherin-yosry-consulting-and-the-king-tut-royal-legacy/",
    internal: false,
  });
</script>

<style scoped>

</style>