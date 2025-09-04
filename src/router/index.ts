import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('@/pages/admin/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('@/pages/admin/Login.vue')
    },
    {
      path: '/admin/builder',
      name: 'PageBuilder',
      component: () => import('@/pages/admin/PageBuilder.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/media',
      name: 'MediaManager',
      component: () => import('@/pages/admin/MediaManager.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/theme',
      name: 'ThemeCustomizer',
      component: () => import('@/pages/admin/ThemeCustomizer.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/debug',
      name: 'AdminDebug',
      component: () => import('@/pages/admin/Debug.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

// Simple auth guard (will be enhanced later)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // For now, just check if admin token exists in localStorage
    const adminToken = localStorage.getItem('admin_token')
    if (!adminToken) {
      next('/admin/login')
      return
    }
  }
  next()
})

export default router