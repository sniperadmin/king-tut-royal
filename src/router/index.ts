import { createRouter, createWebHistory } from "vue-router";
import { getPackages } from '../composables/packagesData'
import Index from '@/pages/Index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/Index.vue"),
    },
    {
      path: "/packages",
      name: "Packages",
      component: () => import("@/pages/Packages.vue"),
    },
    {
      path: "/packages/:id(\\d+)",
      name: "PackageDetailsById",
      component: () => import("@/pages/PackageDetails.vue"),
    },
    {
      path: "/packages/:title",
      name: "PackageDetailsByTitle",
      component: () => import("@/pages/PackageDetails.vue"),
    },
    {
      path: "/partners",
      name: "Partners",
      component: () => import("@/pages/Partners.vue"),
    },
    {
      path: "/partners/:id",
      name: "PartnerDetails",
      component: () => import("@/pages/PartnerDetails.vue"),
    },
    {
      path: "/why-us",
      name: "WhyUs",
      component: () => import("@/pages/WhyUs.vue"),
    },
    {
      path: "/tour-leaders",
      name: "TourLeaders",
      component: () => import("@/pages/TourLeaders.vue"),
    },
    {
      path: "/tour-leaders/:id",
      name: "TourLeaderPortfolio",
      component: () => import("@/pages/TourLeaderPortfolio.vue"),
    },
    {
      path: "/media",
      name: "NewsMedia",
      component: () => import("@/pages/NewsMediaPage.vue"),
    },
    {
      path: "/media/:title",
      name: "ArticlePage",
      component: () => import("@/pages/ArticlePage.vue"),
    },
    {
      path: "/booking",
      name: "Booking",
      component: () => import("@/pages/Booking.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
});

export default router;
