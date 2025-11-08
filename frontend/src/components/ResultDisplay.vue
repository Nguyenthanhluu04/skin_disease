<template>
  <div v-if="loading || result" class="result-display mt-8">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p class="text-xl text-gray-600 mt-4">Đang phân tích ảnh...</p>
    </div>

    <div v-else-if="result" class="result-content">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">Kết Quả Phân Tích</h3>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="image-section">
          <img :src="imageUrl" alt="Analyzed image" class="result-image" />
        </div>

        <div class="prediction-section">
          <div class="primary-result">
            <div class="result-badge" :class="getConfidenceClass(result.confidence)">
              {{ (result.confidence * 100).toFixed(2) }}% độ chính xác
            </div>
            <h4 class="text-3xl font-bold text-gray-800 mb-2">
              {{ getDiseaseLabel(result.predicted_class) }}
            </h4>
            <p class="text-gray-600 mb-4">
              {{ getDiseaseDescription(result.predicted_class) }}
            </p>
          </div>

          <div class="all-predictions mt-6">
            <h5 class="text-lg font-semibold mb-3">Tất cả các khả năng:</h5>
            <div class="space-y-2">
              <div
                v-for="(prob, className) in result.all_predictions"
                :key="className"
                class="prediction-item"
              >
                <div class="flex justify-between mb-1">
                  <span class="font-medium">{{ getDiseaseLabel(className) }}</span>
                  <span class="text-gray-600">{{ (prob * 100).toFixed(2) }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: `${prob * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="warning-box mt-6">
            <p class="text-sm text-gray-700">
               <strong>Lưu ý:</strong> Kết quả này của app chúng tôi chỉ mang tính chất tham khảo . 
              Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để có chẩn đoán chính xác.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  result: Object,
  imageUrl: String,
  loading: Boolean
})

const diseaseLabels = {
  'akiec': 'Keratosis quang hóa / Carcinoma tại chỗ',
  'bcc': 'Ung thư tế bào đáy (Basal Cell Carcinoma)',
  'bkl': 'Tổn thương lành tính giống sừng (Benign Keratosis)',
  'df': 'U xơ da (Dermatofibroma)',
  'mel': 'Melanoma (Ung thư da ác tính)',
  'nv': 'Nốt ruồi lành tính (Melanocytic Nevi)',
  'vasc': 'Tổn thương mạch máu da (Vascular Lesions)'
}

const diseaseDescriptions = {
  'akiec': 'Tổn thương da do ánh nắng mặt trời, có thể tiến triển thành ung thư',
  'bcc': 'Loại ung thư da phổ biến nhất, thường ở vùng da tiếp xúc ánh nắng',
  'bkl': 'Tổn thương da lành tính, không nguy hiểm',
  'df': 'U lành tính thường ở chân, có màu nâu đỏ',
  'mel': 'Loại ung thư da nguy hiểm nhất, cần điều trị sớm',
  'nv': 'Nốt ruồi thông thường, lành tính',
  'vasc': 'Tổn thương liên quan đến mạch máu dưới da'
}

const getDiseaseLabel = (className) => {
  return diseaseLabels[className] || className
}

const getDiseaseDescription = (className) => {
  return diseaseDescriptions[className] || 'Không có mô tả'
}

const getConfidenceClass = (confidence) => {
  if (confidence >= 0.8) return 'confidence-high'
  if (confidence >= 0.6) return 'confidence-medium'
  return 'confidence-low'
}
</script>

<style scoped>
.result-display {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 60px;
  height: 60px;
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

.result-content {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 1rem;
}

.result-image {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.result-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.confidence-high {
  background: #dcfce7;
  color: #166534;
}

.confidence-medium {
  background: #fef3c7;
  color: #92400e;
}

.confidence-low {
  background: #fee2e2;
  color: #991b1b;
}

.prediction-item {
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.5s ease;
}

.warning-box {
  padding: 1rem;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 0.5rem;
}
</style>
