<template>
  <div class="flex items-center space-x-3 w-full md:w-auto">
    <!-- 
      Nút Đóng Bình chọn (Close Poll). 
      Khi người dùng click (@click), Component này sẽ kích hoạt sự kiện 'close' để gửi lên Component cha.
    -->
    <button 
      @click="$emit('close')" 
      type="button"
      :disabled="isClosing"
      class="px-5 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2"
      title="Stop accepting new votes"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span>{{ isClosing ? 'Closing...' : 'Close Poll' }}</span>
    </button>

    <!-- Nút Xóa Bình chọn (Delete Poll) -->
    <button 
      @click="$emit('delete')" 
      type="button"
      :disabled="isDeleting"
      class="px-5 py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2"
      title="Permanently delete this poll"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <span>{{ isDeleting ? 'Deleting...' : 'Delete' }}</span>
    </button>
  </div>
</template>

<script setup>
// Khai báo dữ liệu nhận từ Component cha (EditPollView)
defineProps({
  isClosing: Boolean,
  isDeleting: Boolean
})

// Khai báo các hành động gửi lên cha (EditPollView) khi bấm nút
defineEmits(['close', 'delete'])
</script>
