import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
import ViewProduct from '@/views/ProductView.vue'
import { useUserStore } from '@/stores/useUserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/productDetails/:id',
      name: 'productDetails',
      component: ViewProduct,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const user = userStore.getUser

  if (to.path === '/dashboard' && (!user || user.email !== 'owner@gmail.com')) {
    next('/')
  } else if (user && user.email === 'owner@gmail.com' && to.path === '/') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
