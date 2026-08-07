<template>
  <div class="bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white rounded-[2.5rem] p-8 sm:p-12 mb-8 shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
    
    <div class="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
      <div class="max-w-md">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-4">
          <span>🛡️ Admin Panel</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-anton">
          Edit Poll
        </h1>
        <p class="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
          Update your question, modify answer options, or manage your poll's status.
        </p>
      </div>

      <!-- Khu vực ô nhập Poll Code để tải dữ liệu bình chọn -->
      <div class="w-full md:w-auto bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex-shrink-0">
        <label class="block text-xs font-bold text-gray-400 mb-2">
          Enter Poll Code to Edit
        </label>
        <!-- 
          @submit.prevent="$emit('submit')": 
          Khi form được submit, ngăn chặn việc tải lại trang (.prevent) 
          và phát ra (emit) một sự kiện tên là 'submit' để báo cho Component cha biết.
        -->
        <form @submit.prevent="$emit('submit')" class="flex gap-2">
          <!-- 
            Sử dụng :value và @input để mô phỏng v-model.
            Khi người dùng gõ phím, nó sẽ phát ra sự kiện update:modelValue để cập nhật giá trị ở Component cha.
          -->
          <input 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            type="text"
            placeholder="e.g., pPNXiZQ" 
            class="w-32 sm:w-40 px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl font-mono text-sm font-semibold text-white placeholder-gray-500 focus:bg-white/10 focus:border-amber-400 focus:outline-none transition-all"
          />
          <button 
            type="submit" 
            :disabled="isLoading || !modelValue.trim()"
            class="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl font-extrabold text-sm disabled:opacity-40 transition-all flex items-center space-x-1"
          >
            <svg v-if="isLoading" class="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isLoading ? '' : 'Load' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// defineProps: Khai báo những dữ liệu mà Component con này được quyền nhận từ Component cha.
defineProps({
  modelValue: { // Giá trị của mã Poll Code truyền vào thông qua v-model
    type: String,
    required: true
  },
  isLoading: { // Trạng thái đang tải (hiện icon xoay xoay)
    type: Boolean,
    default: false
  }
})

// defineEmits: Khai báo những sự kiện (events) mà Component con này có thể gửi lên cho Component cha.
defineEmits(['update:modelValue', 'submit'])
</script>
