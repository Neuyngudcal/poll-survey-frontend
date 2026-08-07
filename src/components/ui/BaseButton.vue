<template>
  <!-- 
    BaseButton: Nút bấm dùng chung cho toàn bộ dự án.
    - :type="type": Gắn kiểu của nút (button, submit, reset).
    - :disabled="disabled": Khóa nút nếu biến disabled = true.
    - @click="$emit('click', $event)": Khi người dùng bấm nút này, phát ra sự kiện 'click' cho component cha bắt lấy.
  -->
  <button 
    :type="type" 
    :disabled="disabled"
    @click="$emit('click', $event)"
    :class="[
      'w-full sm:w-auto px-8 py-4 font-extrabold text-base rounded-full transition-all duration-200 shadow-xl flex items-center justify-center space-x-2',
      disabled ? 'opacity-50 pointer-events-none' : 'hover:scale-105',
      variant === 'primary' 
        ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black hover:shadow-amber-400/20' 
        : 'bg-white text-black border border-gray-200 hover:bg-gray-50'
    ]"
  >
    <!-- Slot cho phép chúng ta truyền chữ hoặc icon tùy ý vào bên trong nút khi gọi nó -->
    <slot></slot>
  </button>
</template>

<script setup>
// defineProps: Định nghĩa các thuộc tính (props) truyền từ ngoài (component cha) vào component này
defineProps({
  // Kiểu của nút (mặc định là 'button')
  type: {
    type: String,
    default: 'button'
  },
  // Có khóa nút không (mặc định là false)
  disabled: {
    type: Boolean,
    default: false
  },
  // Giao diện nút (primary hoặc secondary, mặc định là primary)
  variant: {
    type: String,
    default: 'primary'
  }
});

// defineEmits: Định nghĩa các sự kiện mà component này có thể phát ra (emit) lên component cha
defineEmits(['click']);
</script>
