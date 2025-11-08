<template>
  <div class="image-upload">
    <div
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
      :class="['upload-area', { 'drag-over': dragOver }]"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
      />

      <div v-if="!previewUrl" class="upload-placeholder">
        <div class="text-6xl mb-4">📸</div>
        <p class="text-xl font-semibold text-gray-700 mb-2">
          Kéo thả ảnh vào đây hoặc click để chọn
        </p>
        <p class="text-gray-500">
          Hỗ trợ: JPG, PNG, JPEG (Tối đa 10MB)
        </p>
      </div>

      <div v-else class="preview-container">
        <img :src="previewUrl" alt="Preview" class="preview-image" />
        <button
          @click.stop="clearImage"
          class="clear-button"
        >
          ✕ Xóa ảnh
        </button>
      </div>
    </div>

    <button
      v-if="selectedFile"
      @click="uploadImage"
      :disabled="uploading"
      class="upload-button"
    >
      {{ uploading ? 'Đang phân tích...' : 'Bắt đầu phân tích' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['image-selected'])

const dragOver = ref(false)
const selectedFile = ref(null)
const previewUrl = ref(null)
const uploading = ref(false)

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const handleDrop = (event) => {
  dragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = (file) => {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!validTypes.includes(file.type)) {
    alert('Vui lòng chọn file ảnh (JPG, PNG, JPEG)')
    return
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('Kích thước file không được vượt quá 10MB')
    return
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const clearImage = () => {
  selectedFile.value = null
  previewUrl.value = null
}

const uploadImage = () => {
  if (selectedFile.value) {
    uploading.value = true
    emit('image-selected', selectedFile.value)
    setTimeout(() => {
      uploading.value = false
    }, 1000)
  }
}
</script>

<style scoped>
.upload-area {
  border: 3px dashed #cbd5e1;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.upload-area.drag-over {
  border-color: #3b82f6;
  background: #dbeafe;
  transform: scale(1.02);
}

.preview-container {
  position: relative;
  width: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 0.5rem;
  object-fit: contain;
}

.clear-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: rgba(220, 38, 38, 1);
}

.upload-button {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #3b82f6;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.upload-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.upload-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>
