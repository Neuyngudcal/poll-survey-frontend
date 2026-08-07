<template>
  <!-- Hero Header Banner: Phần giới thiệu chung của trang Hỏi Đáp -->
  <div class="bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white rounded-[2.5rem] p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden text-center sm:text-left">
    <!-- Hiệu ứng màu nền phát sáng ở góc phải trên -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>
    
    <div class="relative z-10 max-w-xl">
      <!-- Tag nhỏ giới thiệu Knowledge Base -->
      <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-4">
        <span>❓ Need Help? • Knowledge Base</span>
      </div>
      
      <!-- Tiêu đề lớn của trang -->
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-anton">
        Frequently Asked Questions
      </h1>
      
      <!-- Đoạn mô tả (Subtitle) -->
      <p class="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
        Find quick answers to common questions about our account-free polling platform, admin control tokens, and live analytics.
      </p>
    </div>
  </div>
</template>

<script setup>
// Thành phần này chỉ chứa giao diện hiển thị (Stateless UI Component)
// Không có dữ liệu động nên thẻ script này có thể để trống.
</script>
