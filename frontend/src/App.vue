<template>
  <div id="app" class="min-h-screen">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-800">
              🏥 Phân Tích Bệnh Ngoài Da
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              :class="{ 'bg-primary text-white hover:bg-blue-600': $route.path === '/' }"
            >
              Trang chủ
            </router-link>
            <router-link 
              to="/detection" 
              class="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              :class="{ 'bg-primary text-white hover:bg-blue-600': $route.path === '/detection' }"
            >
              Phân tích
            </router-link>
            <router-link 
              v-if="authStore.isAuthenticated"
              to="/history" 
              class="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              :class="{ 'bg-primary text-white hover:bg-blue-600': $route.path === '/history' }"
            >
              Lịch sử
            </router-link>

            <!-- Auth buttons -->
            <div v-if="!authStore.isAuthenticated" class="flex items-center space-x-2">
              <router-link 
                to="/login" 
                class="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition"
              >
                Đăng nhập
              </router-link>
              <router-link 
                to="/register" 
                class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 transition"
              >
                Đăng ký
              </router-link>
            </div>

            <!-- User menu -->
            <div v-else class="flex items-center space-x-3">
              <div class="text-sm">
                <span class="text-gray-600">Xin chào, </span>
                <span class="font-semibold text-gray-800">{{ authStore.currentUser?.username }}</span>
              </div>
              <button
                @click="handleLogout"
                class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" class="mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    authStore.logout()
    router.push('/')
  }
}

onMounted(() => {
  authStore.initAuth()
  console.log('App mounted successfully')
})
</script>

<style scoped>
nav {
  backdrop-filter: blur(10px);
}
</style>
