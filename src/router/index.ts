import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/Index.vue"),
      meta: {
        title: 'Luxury Travel Exclusive - Home',
        description: 'Discover exclusive luxury travel experiences and personalized itineraries.',
        ogTitle: 'Luxury Travel Exclusive',
        ogDescription: 'Your gateway to bespoke luxury travel.',
        ogImage: 'https://example.com/images/home-og.jpg',
      },
    },
    {
      path: "/packages",
      name: "Packages",
      component: () => import("@/pages/Packages.vue"),
      meta: {
        title: 'Luxury Travel Packages',
        description: 'Explore our curated selection of luxury travel packages.',
        ogTitle: 'Luxury Travel Packages',
        ogDescription: 'Find your dream luxury vacation.',
        ogImage: 'https://example.com/images/packages-og.jpg',
      },
    },
    {
      path: "/packages/:id(\\d+)",
      name: "PackageDetailsById",
      component: () => import("@/pages/PackageDetails.vue"),
      meta: {
        title: 'Package Details',
        description: 'Details of our exclusive luxury travel packages.',
        ogTitle: 'Package Details',
        ogDescription: 'In-depth information about our luxury tours.',
        ogImage: 'https://example.com/images/package-details-og.jpg',
      },
    },
    {
      path: "/packages/:title",
      name: "PackageDetailsByTitle",
      component: () => import("@/pages/PackageDetails.vue"),
      meta: {
        title: 'Package Details',
        description: 'Details of our exclusive luxury travel packages.',
        ogTitle: 'Package Details',
        ogDescription: 'In-depth information about our luxury tours.',
        ogImage: 'https://example.com/images/package-details-og.jpg',
      },
    },
    {
      path: "/partners",
      name: "Partners",
      component: () => import("@/pages/Partners.vue"),
      meta: {
        title: 'Our Luxury Travel Partners',
        description: 'Meet our esteemed partners in luxury travel.',
        ogTitle: 'Luxury Travel Partners',
        ogDescription: 'Collaborating with the best in luxury travel.',
        ogImage: 'https://example.com/images/partners-og.jpg',
      },
    },
    {
      path: "/partners/:id",
      name: "PartnerDetails",
      component: () => import("@/pages/PartnerDetails.vue"),
      meta: {
        title: 'Partner Details',
        description: 'Detailed information about our luxury travel partners.',
        ogTitle: 'Partner Details',
        ogDescription: 'Learn more about our exclusive travel partners.',
        ogImage: 'https://example.com/images/partner-details-og.jpg',
      },
    },
    {
      path: "/why-us",
      name: "WhyUs",
      component: () => import("@/pages/WhyUs.vue"),
      meta: {
        title: 'Why Choose Luxury Travel Exclusive',
        description: 'Discover why Luxury Travel Exclusive is your best choice for bespoke travel.',
        ogTitle: 'Why Choose Us',
        ogDescription: 'Unparalleled luxury and personalized service.',
        ogImage: 'https://example.com/images/why-us-og.jpg',
      },
    },
    {
      path: "/tour-leaders",
      name: "TourLeaders",
      component: () => import("@/pages/TourLeaders.vue"),
      meta: {
        title: 'Our Expert Tour Leaders',
        description: 'Meet our experienced and knowledgeable luxury tour leaders.',
        ogTitle: 'Expert Tour Leaders',
        ogDescription: 'Guiding you through unforgettable luxury journeys.',
        ogImage: 'https://example.com/images/tour-leaders-og.jpg',
      },
    },
    {
      path: "/tour-leaders/:id",
      name: "TourLeaderPortfolio",
      component: () => import("@/pages/TourLeaderPortfolio.vue"),
      meta: {
        title: 'Tour Leader Portfolio',
        description: 'View the portfolio of our expert tour leaders.',
        ogTitle: 'Tour Leader Portfolio',
        ogDescription: 'Discover the expertise of our luxury tour guides.',
        ogImage: 'https://example.com/images/tour-leader-portfolio-og.jpg',
      },
    },
    {
      path: "/media",
      name: "NewsMedia",
      component: () => import("@/pages/NewsMediaPage.vue"),
      meta: {
        title: 'Luxury Travel News & Media',
        description: 'Stay updated with the latest in luxury travel news and media.',
        ogTitle: 'Luxury Travel News',
        ogDescription: 'Exclusive insights and updates from the world of luxury travel.',
        ogImage: 'https://example.com/images/media-og.jpg',
      },
    },
    {
      path: "/media/:title",
      name: "ArticlePage",
      component: () => import("@/pages/ArticlePage.vue"),
      meta: {
        title: 'Article',
        description: 'Read our in-depth articles on luxury travel destinations and experiences.',
        ogTitle: 'Luxury Travel Article',
        ogDescription: 'Dive into captivating stories and guides.',
        ogImage: 'https://example.com/images/article-og.jpg',
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("@/pages/NotFound.vue"),
      meta: {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        ogTitle: 'Page Not Found',
        ogDescription: 'Error 404: Page not found.',
        ogImage: 'https://example.com/images/404-og.jpg',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const DEFAULT_TITLE = 'Luxury Travel Exclusive';
  document.title = to.meta.title ? `${to.meta.title}` : DEFAULT_TITLE;

  const metaDescription = to.meta.description || 'Discover exclusive luxury travel experiences and personalized itineraries with Luxury Travel Exclusive.';
  const metaOgTitle = to.meta.ogTitle || 'Luxury Travel Exclusive';
  const metaOgDescription = to.meta.ogDescription || 'Your gateway to bespoke luxury travel.';
  const metaOgImage = to.meta.ogImage || 'https://example.com/images/default-og.jpg';

  // Update or create meta tags
  updateOrCreateMeta('name', 'description', metaDescription);
  updateOrCreateMeta('property', 'og:title', metaOgTitle);
  updateOrCreateMeta('property', 'og:description', metaOgDescription);
  updateOrCreateMeta('property', 'og:image', metaOgImage);
  updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
  updateOrCreateMeta('name', 'twitter:title', metaOgTitle);
  updateOrCreateMeta('name', 'twitter:description', metaOgDescription);
  updateOrCreateMeta('name', 'twitter:image', metaOgImage);

  next();
});

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

function updateOrCreateMeta(attributeType: string, attributeValue: string, content: string) {
  let element = document.head.querySelector(`meta[${attributeType}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeType, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default router;
