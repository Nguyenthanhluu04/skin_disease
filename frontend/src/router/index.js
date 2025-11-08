import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detection from '../views/Detection.vue'
import History from '../views/History.vue'

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
    component: History
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
