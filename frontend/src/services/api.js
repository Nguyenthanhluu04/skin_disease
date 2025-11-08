import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const predictionAPI = {
  // Upload ảnh và nhận kết quả phân tích
  predictImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await api.post('/predictions/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Lấy lịch sử phân tích
  getHistory: async (limit = 10) => {
    const response = await api.get(`/predictions/history?limit=${limit}`)
    return response.data
  },

  // Lấy chi tiết một phân tích
  getById: async (id) => {
    const response = await api.get(`/predictions/${id}`)
    return response.data
  },

  // Xóa một phân tích
  delete: async (id) => {
    const response = await api.delete(`/predictions/${id}`)
    return response.data
  }
}

export const userAPI = {
  // Đăng ký (nếu cần)
  register: async (userData) => {
    const response = await api.post('/users/register', userData)
    return response.data
  },

  // Đăng nhập (nếu cần)
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials)
    return response.data
  }
}

export default api
