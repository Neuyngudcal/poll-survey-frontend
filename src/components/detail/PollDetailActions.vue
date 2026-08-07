<template>
  <div class="p-8 sm:p-12 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
    <div class="flex w-full sm:w-auto gap-4 flex-1">
      <!-- Dùng <router-link> để chuyển hướng mà không cần tải lại trang -->
      <router-link 
        v-if="!poll.isClosed"
        :to="`/poll/${poll.pollCode}`" 
        class="flex-1 sm:flex-none px-8 py-4 bg-black hover:bg-gray-800 text-white font-extrabold rounded-xl transition-all shadow-lg hover:shadow-black/20 text-center flex items-center justify-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Cast Your Vote
      </router-link>

      <router-link 
        :to="`/results/${poll.pollCode}`" 
        class="flex-1 sm:flex-none px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-xl transition-all shadow-lg hover:shadow-amber-400/20 text-center flex items-center justify-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        View Live Results
      </router-link>
    </div>
    
    <router-link :to="`/edit/${poll.pollCode}`" class="text-sm font-bold text-gray-400 hover:text-black transition-colors flex items-center mt-4 sm:mt-0">
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
      Admin Manage
    </router-link>
  </div>
</template>

<script setup>
// Component này chỉ hiển thị các nút điều hướng (bỏ phiếu, xem kết quả).
defineProps({
  poll: {
    type: Object,
    required: true
  }
})
</script>
