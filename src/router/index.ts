import { createRouter, createWebHistory } from 'vue-router'
import { getPackages } from '../composables/packagesData'
import Index from '@/pages/Index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/tour-leaders',
      name: 'TourLeaders',
      component: () => import('@/pages/TourLeaders.vue')
    },
    {
      path: '/tour-leaders/:slug',
      name: 'TourLeaderDetails',
      component: () => import('@/pages/TourLeaderPortfolio.vue')
    },
    {
      path: '/packages/:packageName',
      name: 'PackageDetails',
      component: () => import('@/pages/PackageDetails.vue'),
      beforeEnter: async (to, from, next) => {
        const packages = await getPackages();
        const packageName = to.params.packageName as string;
        const packageExists = packages.some(pkg => pkg.title.toLowerCase().replace(/ /g, '-') === packageName);
        if (packageExists) {
          next();
        } else {
          next({ name: 'NotFound' });
        }
      }
    },
    {
      path: '/partner/:id',
      name: 'PartnerDetails',
      component: () => import('../pages/PartnerDetails.vue')
    },
    {
      path: '/packages',
      name: 'Packages',
      component: () => import('@/pages/Packages.vue')
    },
    {
      path: '/partners',
      name: 'Partners',
      component: () => import('@/pages/Partners.vue')
    },
    {
      path: '/why-us',
      name: 'WhyUs',
      component: () => import('@/pages/WhyUs.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/NotFound.vue')
    }
  ]
})

export default router
