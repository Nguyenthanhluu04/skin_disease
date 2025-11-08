<template>
  <div class="home">
    <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Hệ Thống Phân Tích Bệnh Ngoài Da
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Sử dụng AI để phát hiện và phân loại bệnh da qua hình ảnh
        </p>

        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="p-6 bg-blue-50 rounded-xl">
            <div class="text-4xl mb-4 text-[#3366FF]"><FontAwesomeIcon :icon="['fas', 'memory']" /></div>
            <h3 class="text-xl font-semibold mb-2">Công Nghệ AI</h3>
            <p class="text-gray-600">
              Sử dụng Vision Transformer (ViT) từ Google
            </p>
          </div>

          <div class="p-6 bg-green-50 rounded-xl">
            <div class="text-4xl mb-4 text-[#3366FF]"><FontAwesomeIcon :icon="['fas', 'clock']" /></div>
            <h3 class="text-xl font-semibold mb-2">Nhanh Chóng</h3>
            <p class="text-gray-600">
              Kết quả phân tích trong vài giây
            </p>
          </div>

          <div class="p-6 bg-purple-50 rounded-xl">
            <div class="text-4xl mb-4 text-[#3366FF]">  <FontAwesomeIcon :icon="['fas', 'kit-medical']" /></div>
            <h3 class="text-xl font-semibold mb-2">7 Loại Bệnh</h3>
            <p class="text-gray-600">
              Phát hiện melanoma, ung thư tế bào đáy, nốt ruồi và nhiều hơn
            </p>
          </div>
        </div>

        <router-link
          to="/detection"
          class="inline-block px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
        >
          Bắt Đầu Phân Tích →
        </router-link>

        <div class="mt-12 p-6 bg-yellow-50 rounded-xl text-left">
          <h3 class="text-lg font-semibold mb-3 text-yellow-800"> Lưu ý quan trọng về Hệ Thống Chúng Tôi: </h3>
          <ul class="text-gray-700 space-y-2">
            <li>• Hệ thống chỉ mang tính chất tham khảo, không thay thế chẩn đoán y tế</li>
            <li>• Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để có chẩn đoán chính xác</li>
            <li>• Upload ảnh rõ nét, đủ ánh sáng để có kết quả tốt nhất</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


</script>

<style scoped>
.home {
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
