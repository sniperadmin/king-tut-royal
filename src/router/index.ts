import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/Index.vue')
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
      component: () => import('@/pages/PackageDetails.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue')
    }
  ]
})

export default router
