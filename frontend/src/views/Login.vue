<template>
  <div class="login-page">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Đăng Nhập</h2>
        <p class="text-gray-600">Đăng nhập để lưu lịch sử phân tích của bạn</p>
      </div>

      <form @submit.prevent="handleLogin">
        <!-- Alert -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-600 text-sm">{{ successMessage }}</p>
        </div>

        <!-- Username -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'user']" class="mr-2" />
            Username
          </label>
          <input
            v-model="formData.username"
            type="text"
            placeholder="Nhập username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'lock']" class="mr-2" />
            Password
          </label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Nhập password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span v-if="loading">
            <FontAwesomeIcon :icon="['fas', 'spinner']" spin class="mr-2" />
            Đang đăng nhập...
          </span>
          <span v-else>Đăng Nhập</span>
        </button>
      </form>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Chưa có tài khoản?
          <router-link to="/register" class="text-primary font-semibold hover:underline">
            Đăng ký ngay
          </router-link>
        </p>
      </div>

      <!-- Or Continue as Guest -->
      <div class="mt-4 text-center">
        <router-link to="/" class="text-gray-500 text-sm hover:text-gray-700">
          Hoặc tiếp tục không cần đăng nhập
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const result = await authStore.login(formData.value)

  loading.value = false

  if (result.success) {
    successMessage.value = result.message
    setTimeout(() => {
      router.push('/detection')
    }, 1000)
  } else {
    errorMessage.value = result.message
  }
}
</script>

<style scoped>
.login-page {
  animation: fadeIn 0.5s ease-in;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
