<template>
  <AppLayout>
    <div class="container mx-auto pt-20">
      <button @click="router.push('/')" class="text-primary hover:underline mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Back
      </button>
      <h1 class="text-2xl font-bold text-primary text-center">Why Us?</h1>

      <div class="py-2 rounded-lg mb-12">
        <ArticleCard v-for="(post, index) in posts" :key="index" :post="post" />
        <h2 class="text-xl font-bold text-foreground mb-6">Introduction to SY Consulting</h2>
        <p class="text-lg text-muted-foreground mb-4">
          SY Consulting FZ-LLC, headquartered in the United Arab Emirates, brings together more than 30 years of global expertise in the fields of luxury, lifestyle, hospitality, and tourism innovation. Over three decades, our team has worked alongside world-class brands, celebrities, high-net-worth individuals, and government entities, creating bespoke products, high-profile events, and iconic lifestyle concepts across Europe, the Middle East, and beyond.
        </p>
        <p class="text-lg text-muted-foreground mb-4">
          As part of this journey, we are proud to introduce <a href="https://www.worldinstyle.net" class="text-primary hover:underline">www.worldinstyle.net</a> – our next-generation digital platform dedicated to luxury travel and lifestyle experiences. World In Style offers specially curated, bespoke VIP packages, designed exclusively by SY Consulting, highlighting once-in-a-lifetime experiences such as private cultural immersions, world-class hospitality, and access to prestigious events.
        </p>
        <p class="text-lg text-muted-foreground mb-4">
          To extend our global reach and create shared value, SY Consulting is launching a new B2B Affiliate Program through World In Style. This program is designed for travel agencies, hospitality partners, influencers, and lifestyle brands who wish to join our growing ecosystem.
        </p>

        <VideoPlayer :videos="[{ url: 'https://mhwjdkzpnhzmduolfgmy.supabase.co/storage/v1/object/public/videos/why-us/why-us.m3u8' }]" />

        <h3 class="text-xl font-bold text-foreground text-left my-4">Key Benefits for Our Partners:</h3>
        <ul class="fancy-list text-left text-lg text-muted-foreground mb-4 pl-4">
          <li v-for="(benefit, index) in benefits" :key="index" class="my-5">
            <Sparkles class="inline-block h-5 w-5 mr-2 text-primary" />
            <span v-html="benefit"></span>
          </li>
        </ul>

        <p class="text-lg text-muted-foreground mb-4">
          Through World In Style, SY Consulting FZ-LLC provides a bridge between exceptional travel products and our valued B2B affiliates, ensuring sustainable revenue growth, long-term collaboration, and exclusive market positioning for all stakeholders.
        </p>
        <p class="text-lg text-muted-foreground">
          <a href="https://www.sherinyosry.com" class="text-primary hover:underline">www.sherinyosry.com</a>
        </p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import VideoPlayer from '@/components/ui/VideoPlayer.vue';
import ArticleCard from '../components/ui/ArticleCard.vue'
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Sparkles } from 'lucide-vue-next';

const posts = ref([
  {
    title: "Sherin Yosry Consulting and the King Tut Royal Legacy",
    excerpt: "An exclusive journey into Egypt’s timeless heritage meets modern luxury through Sherin Yosry’s visionary leadership. The lights of Cairo glistened on the horizon, casting their golden reflection on the timeless Nile.",
    image: "https://ceotimes.com/wp-content/uploads/2025/09/download-2-23-1170x585.png",
    link: "https://ceotimes.com/sherin-yosry-consulting-and-the-king-tut-royal-legacy/",
    internal: false,
  }
]);

const benefits = [
  '<strong>Attractive Commission Structure</strong> – Earn competitive commissions on every confirmed booking made via your network.',
  '<strong>Exclusive Rewards & Privileges</strong> – Gain access to special incentives, loyalty benefits, and VIP privileges tailored to our partners.',
  '<strong>Premium Marketing Support</strong> – Partners receive marketing materials, co-branding opportunities, and access to our global PR and media channels.',
  '<strong>Bespoke Product Portfolio</strong> – Offer your clients curated, high-margin VIP travel and lifestyle packages not available on standard platforms.',
  '<strong>Trusted Expertise</strong> – Leverage our 30 years of know-how, supply chains, and global connections to deliver seamless luxury experiences.',
];
const router = useRouter();

const goBack = () => {
  router.back();
};
onMounted(() => {
  window.scrollTo(0, 0)
})
// No specific script needed for this static content page
</script>

<style scoped>
.fancy-list {
  list-style: none;
  padding-left: 0;
}


</style>