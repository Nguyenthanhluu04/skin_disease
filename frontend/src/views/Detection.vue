<template>
  <div class="detection">
    <div class="bg-white rounded-2xl shadow-2xl p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Phân Tích Bệnh Da</h2>
      
      <ImageUpload @image-selected="handleImageSelected" />
      
      <ResultDisplay 
        v-if="result" 
        :result="result" 
        :image-url="imageUrl"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageUpload from '../components/ImageUpload.vue'
import ResultDisplay from '../components/ResultDisplay.vue'
import { predictionAPI } from '../services/api'

const result = ref(null)
const imageUrl = ref(null)
const loading = ref(false)

const handleImageSelected = async (file) => {
  loading.value = true
  result.value = null
  imageUrl.value = URL.createObjectURL(file)

  try {
    const response = await predictionAPI.predictImage(file)
    result.value = response.data
  } catch (error) {
    console.error('Error predicting image:', error)
    alert('Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.detection {
  animation: fadeIn 0.5s ease-in;
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
