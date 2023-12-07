import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('../views/RecordView.vue')
    }
  ]
})

// 檢查路由跳轉前 localStorage 是否有 userId
router.beforeEach((to, from, next) => {
  const userId = localStorage.getItem('userId')
  if (to.name !== 'home' && !userId) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
