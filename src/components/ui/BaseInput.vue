<template>
  <div class="space-y-3">
    <!-- Hiển thị Label nếu có truyền vào -->
    <label v-if="label" class="block text-sm font-bold text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <!-- 
        BaseInput: Ô nhập liệu dùng chung.
        - :value="modelValue": Hiển thị giá trị được truyền từ v-model của component cha.
        - @input: Lắng nghe khi người dùng gõ phím.
        - $emit('update:modelValue', ...): Phát sự kiện cập nhật giá trị mới lên component cha để v-model hoạt động.
      -->
      <input 
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => { $emit('update:modelValue', e.target.value); $emit('input', e) }"
        class="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl text-base sm:text-lg font-semibold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none transition-all duration-200 shadow-sm"
      />
    </div>
  </div>
</template>

<script setup>
// Khai báo các thuộc tính (props) nhận từ component cha
defineProps({
  // Tiêu đề của ô input
  label: {
    type: String,
    default: ''
  },
  // Có bắt buộc nhập không (hiển thị dấu *)
  required: {
    type: Boolean,
    default: false
  },
  // Kiểu input (text, password, number...)
  type: {
    type: String,
    default: 'text'
  },
  // Chữ mờ gợi ý
  placeholder: {
    type: String,
    default: ''
  },
  // modelValue là prop đặc biệt dùng cho v-model trong Vue 3
  modelValue: {
    type: [String, Number],
    default: ''
  }
});

// Cần emit sự kiện 'update:modelValue' để v-model có thể cập nhật dữ liệu 2 chiều (two-way binding)
defineEmits(['update:modelValue', 'input']);
</script>
