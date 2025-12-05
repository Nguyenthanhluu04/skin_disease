<template>
  <div class="history-list">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p class="text-gray-600 mt-4">Đang tải lịch sử...</p>
    </div>

    <div v-else-if="error" class="error">
      <p class="text-red-600">{{ error }}</p>
      <button @click="loadHistory" class="retry-button">
        Thử lại
      </button>
    </div>

    <div v-else-if="history.length === 0" class="empty">
      <div class="text-6xl mb-4">📭</div>
      <p class="text-xl text-gray-600">Chưa có lịch sử phân tích</p>
      <router-link to="/detection" class="start-button">
        Bắt đầu phân tích →
      </router-link>
    </div>

    <div v-else class="history-grid">
      <div
        v-for="item in history"
        :key="item.id"
        class="history-card"
      >
        <div class="card-header">
          <span class="date">{{ formatDate(item.created_at) }}</span>
          <button @click="deleteItem(item.id)" class="delete-button text-gray-500 hover:text-red-600">
            <FontAwesomeIcon :icon="['fas', 'trash-can']" />
          </button>
        </div>

        <img
          v-if="item.image_path"
          :src="getImageUrl(item.image_path)"
          alt="Analyzed image"
          class="history-image"
        />

        <div class="card-content">
          <h4 class="disease-name">{{ getDiseaseLabel(item.predicted_class) }}</h4>
          <div class="confidence-badge" :class="getConfidenceClass(item.confidence)">
            {{ (item.confidence * 100).toFixed(1) }}% độ chính xác
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { predictionAPI } from '../services/api'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const history = ref([])
const loading = ref(true)
const error = ref(null)

const diseaseLabels = {
  'akiec': 'Sừng hóa quang tuyến',
  'bcc': 'Ung thư tế bào đáy',
  'bkl': 'Sừng hóa lành tính (Sẹo già)',
  'df': 'U xơ da',
  'mel': 'U hắc tố ác tính (Melanoma)',
  'nv': 'Nốt ruồi lành tính',
  'vasc': 'Tổn thương mạch máu da'
}

const loadHistory = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await predictionAPI.getHistory(20)
    history.value = response.data
  } catch (err) {
    error.value = 'Không thể tải lịch sử. Vui lòng thử lại.'
    console.error('Error loading history:', err)
  } finally {
    loading.value = false
  }
}

const deleteItem = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa mục này?')) return

  try {
    await predictionAPI.delete(id)
    history.value = history.value.filter(item => item.id !== id)
  } catch (err) {
    alert('Không thể xóa mục này. Vui lòng thử lại.')
    console.error('Error deleting item:', err)
  }
}

const getDiseaseLabel = (className) => {
  return diseaseLabels[className] || className
}

const getConfidenceClass = (confidence) => {
  if (confidence >= 0.8) return 'high'
  if (confidence >= 0.6) return 'medium'
  return 'low'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getImageUrl = (path) => {
  return `http://localhost:5000${path}`
}

onMounted(() => {
  loadHistory()
})
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty {
  text-align: center;
  padding: 3rem;
}

.start-button {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.start-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.history-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.history-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
}

.date {
  font-size: 0.875rem;
  color: #64748b;
}

.delete-button {
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.delete-button:hover {
  transform: scale(1.2);
}

.history-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.disease-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.confidence-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.confidence-badge.high {
  background: #dcfce7;
  color: #166534;
}

.confidence-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.confidence-badge.low {
  background: #fee2e2;
  color: #991b1b;
}

.error {
  text-align: center;
  padding: 3rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
}
</style>
