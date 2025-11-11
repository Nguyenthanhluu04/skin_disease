import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userAPI } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (userData) => {
    user.value = userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  const login = async (credentials) => {
    try {
      const response = await userAPI.login(credentials)
      
      if (response.success) {
        setToken(response.data.token)
        setUser(response.data.user)
        return { success: true, message: response.message }
      }
      
      return { success: false, message: response.message }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng nhập thất bại' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await userAPI.register(userData)
      
      if (response.success) {
        setToken(response.data.token)
        setUser(response.data.user)
        return { success: true, message: response.message }
      }
      
      return { success: false, message: response.message }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng ký thất bại' 
      }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const initAuth = () => {
    // Load user from localStorage on app init
    const savedUser = localStorage.getItem('user')
    if (savedUser && token.value) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    initAuth
  }
})
