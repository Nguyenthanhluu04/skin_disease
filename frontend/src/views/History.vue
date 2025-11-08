<template>
  <div class="history">
    <div class="bg-white rounded-2xl shadow-2xl p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Lịch Sử Phân Tích</h2>
      
      <HistoryList />
    </div>
  </div>
</template>

<script setup>
import HistoryList from '../components/HistoryList.vue'
</script>

<style scoped>
.history {
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
