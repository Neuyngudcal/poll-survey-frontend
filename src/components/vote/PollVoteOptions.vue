<template>
  <div class="space-y-3">
    <!-- 
      Lặp qua mảng các đáp án (options). 
      Khi người dùng click vào một đáp án, Component này sẽ không tự lưu giá trị đó
      mà sẽ phát ra (emit) một sự kiện 'update:modelValue' kèm theo vị trí (index) của đáp án đó.
      Component cha sẽ lắng nghe sự kiện này (qua v-model) và cập nhật dữ liệu.
    -->
    <div 
      v-for="(option, index) in options" 
      :key="index"
      @click="$emit('update:modelValue', index)"
      class="p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between group"
      :class="modelValue === index ? 'border-amber-400 bg-amber-50/50 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'"
    >
      <div class="flex items-center space-x-4">
        <!-- Nút hình tròn (Radio Circle) -->
        <div 
          class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
          :class="modelValue === index ? 'border-amber-500 bg-amber-400' : 'border-gray-300 bg-white group-hover:border-gray-400'"
        >
          <div v-if="modelValue === index" class="w-2.5 h-2.5 rounded-full bg-black"></div>
        </div>

        <!-- Nội dung Đáp án -->
        <span 
          class="text-base sm:text-lg font-bold transition-colors"
          :class="modelValue === index ? 'text-black' : 'text-gray-700'"
        >
          {{ option.text }}
        </span>
      </div>

      <span class="text-xs font-mono font-bold px-2 py-1 rounded bg-black/5 text-gray-500">
        Option {{ index + 1 }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    default: null
  }
})

// Khai báo sự kiện để hỗ trợ tính năng v-model 2 chiều giữa Component Cha và Con
defineEmits(['update:modelValue'])
</script>
