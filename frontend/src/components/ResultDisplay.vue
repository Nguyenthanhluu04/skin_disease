<template>
  <div v-if="loading || result" class="result-display mt-8">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p class="text-xl text-gray-600 mt-4">Đang phân tích ảnh...</p>
    </div>

    <div v-else-if="result" class="result-content">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">Kết Quả Phân Tích</h3>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Image Section -->
        <div class="image-section">
          <img :src="imageUrl" alt="Analyzed image" class="result-image" />
        </div>

        <!-- Prediction Section -->
        <div class="prediction-section">
          <div class="primary-result">
            <div class="result-badge" :class="getConfidenceClass(result.confidence)">
              {{ (result.confidence * 100).toFixed(2) }}% độ chính xác
            </div>
            
            <h4 class="text-3xl font-bold text-gray-800 mb-2 mt-3">
              {{  result.predicted_class }}
            </h4>
            
            <p class="text-sm text-gray-500 mb-3">
              {{  getDiseaseLabel(result.predicted_class) }}
            </p>

            <p class="text-[#166534] mb-4 leading-relaxed bg-[#dcfce7] rounded-md p-1">
              {{  getDiseaseDescription(result.predicted_class) }}
            </p>
          </div>

          <!-- All Predictions -->
          <div class="all-predictions mt-6">
            <h5 class="text-lg font-semibold mb-3">Các khả năng khác:</h5>
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
              <strong> Lưu ý quan trọng :</strong>  Kết quả này chỉ mang tính chất tham khảo. 
              Vui lòng tham khảo ý kiến bác sĩ da liễu chuyên khoa để có chẩn đoán chính xác.
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
  'benign_keratosis-like_lesions': 'Sừng hóa quang tuyến',
  'basal_cell_carcinoma': 'Ung thư tế bào đáy',
  'actinic_keratoses': 'Sừng hóa lành tính (Sẹo già)',
  'dermatofibroma': 'U xơ da',
  'melanoma': 'U hắc tố ác tính (Melanoma)',
  'melanocytic_Nevi': 'Nốt ruồi lành tính',
  'vascular_lesions': 'Tổn thương mạch máu da'
}

const diseaseDescriptions = {
  'benign_keratosis-like_lesions': 'Tổn thương da do ánh nắng mặt trời, có thể tiến triển thành ung thư. Thường xuất hiện ở những vùng da thường xuyên tiếp xúc với ánh nắng.',
  'basal_cell_carcinoma': 'Loại ung thư da phổ biến nhất, thường ở vùng da tiếp xúc ánh nắng. Mặc dù ít khi di căn, nhưng cần điều trị sớm.',
  'actinic_keratoses': 'U da lành tính thường gặp ở người trung niên và cao tuổi. Đây là tổn thương không nguy hiểm và không chuyển thành ung thư.',
  'dermatofibroma': 'Khối u lành tính thường xuất hiện ở chân. Đây là tổn thương không nguy hiểm, phát triển chậm và hiếm khi gây biến chứng.',
  'melanoma': 'Loại ung thư da nguy hiểm nhất với khả năng di căn cao. Cần được phát hiện và điều trị sớm. Hãy đến bác sĩ da liễu ngay.',
  'melanocytic_Nevi': 'Nốt ruồi thông thường, lành tính và rất phổ biến. Cần theo dõi nếu có thay đổi bất thường về hình dạng hoặc màu sắc.',
  'vascular_lesions': 'Các bất thường của mạch máu dưới da, thường lành tính. Hầu hết chỉ ảnh hưởng về mặt thẩm mỹ.'
}

const getDiseaseLabel = (className) => {
  return diseaseLabels[className] || className
}

const getDiseaseDescription = (className) => {
  return diseaseDescriptions[className] || 'Không có mô tả. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.'
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
  padding: 1.25rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 4px solid #f59e0b;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .result-content {
    padding: 1rem;
  }
}
</style>
