import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detection from '../views/Detection.vue'
import History from '../views/History.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detection',
    name: 'Detection',
    component: Detection
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Pages that require authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  }
  // Pages only for guests (login, register)
  else if (to.meta.guest && authStore.isAuthenticated) {
    next('/')
  }
  else {
    next()
  }
})

export default router
