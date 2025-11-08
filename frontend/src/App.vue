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
              to="/history" 
              class="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              :class="{ 'bg-primary text-white hover:bg-blue-600': $route.path === '/history' }"
            >
              Lịch sử
            </router-link>
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

onMounted(() => {
  console.log('App mounted successfully')
})
</script>

<style scoped>
nav {
  backdrop-filter: blur(10px);
}
</style>
