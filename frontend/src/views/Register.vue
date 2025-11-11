<template>
  <div class="register-page">
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Đăng Ký</h2>
        <p class="text-gray-600">Tạo tài khoản để lưu lịch sử phân tích</p>
      </div>

      <form @submit.prevent="handleRegister">
        <!-- Alert -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-600 text-sm">{{ successMessage }}</p>
        </div>

        <!-- Full Name -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'id-card']" class="mr-2" />
            Họ và Tên
          </label>
          <input
            v-model="formData.full_name"
            type="text"
            placeholder="Nhập họ và tên"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Username -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'user']" class="mr-2" />
            Username *
          </label>
          <input
            v-model="formData.username"
            type="text"
            placeholder="Nhập username (ít nhất 3 ký tự)"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            minlength="3"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'envelope']" class="mr-2" />
            Email *
          </label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Nhập email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'lock']" class="mr-2" />
            Password *
          </label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Nhập password (ít nhất 6 ký tự)"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            minlength="6"
          />
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">
            <FontAwesomeIcon :icon="['fas', 'lock']" class="mr-2" />
            Xác nhận Password *
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Nhập lại password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p v-if="confirmPassword && formData.password !== confirmPassword" class="text-red-500 text-sm mt-1">
            Password không khớp
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading || (confirmPassword && formData.password !== confirmPassword)"
          class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span v-if="loading">
            <FontAwesomeIcon :icon="['fas', 'spinner']" spin class="mr-2" />
            Đang đăng ký...
          </span>
          <span v-else>Đăng Ký</span>
        </button>
      </form>

      <!-- Login Link -->
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Đã có tài khoản?
          <router-link to="/login" class="text-primary font-semibold hover:underline">
            Đăng nhập ngay
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
  email: '',
  password: '',
  full_name: ''
})

const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  if (formData.value.password !== confirmPassword.value) {
    errorMessage.value = 'Password không khớp'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const result = await authStore.register(formData.value)

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
.register-page {
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
