<template>
  <!-- Hero Section with Modern Dark & Gradient Aesthetics -->
  <section class="relative w-full min-h-[90vh] bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
    <!-- Animated Background Glows -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
    <div class="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-[140px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-blue-500/10 rounded-full blur-[160px]"></div>

    <!-- Subtle Grid Pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    
    <div class="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
      <!-- Hero Left Content -->
      <div class="flex-1 text-center lg:text-left space-y-8">
        <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-gray-200">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Instant Community Feedback • Zero Friction</span>
        </div>
        
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-anton">
          Create & Share Polls Without Logging In
        </h1>
        
        <p class="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
          Launch dynamic, real-time voting in under 30 seconds. Share anywhere with a single link, and retain complete administrative control to edit or close polls anytime—no account or registration required.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
          <router-link 
            to="/create" 
            class="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-bold text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
          >
            <span>Start Your First Poll</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>

          <router-link 
            to="/lists"
            class="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full font-bold text-base transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
              Poll Details
          </router-link>
        </div>

        <!-- Trust Badges -->
        <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400 font-mono">
          <div class="flex items-center space-x-1.5">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>No password needed</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>Secure Admin Token</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>Live 5s Auto-Refresh</span>
          </div>
        </div>
      </div>

      <!-- Hero Right: Interactive Quick Access / Demo Card -->
      <div class="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative group">
        <div class="absolute -top-3 -right-3 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Quick Jump
        </div>
        
        <h3 class="text-xl font-bold text-white mb-2">Have a Poll Code?</h3>
        <p class="text-sm text-gray-300 mb-6">
          Enter any code (e.g. <span class="font-mono text-amber-300 bg-black/40 px-1.5 py-0.5 rounded">#pPNXiZQ</span>) to vote, check live results, or edit.
        </p>

        <!-- Form nhập code -->
        <!-- @submit.prevent: Ngăn chặn hành vi mặc định của form (load lại trang) khi nhấn Submit -->
        <form @submit.prevent="handleQuickJump" class="space-y-4">
          <div class="relative">
            <!-- v-model: Liên kết dữ liệu hai chiều (two-way binding) với biến quickCode -->
            <input 
              v-model="quickCode" 
              type="text" 
              placeholder="Enter Poll Code..." 
              class="w-full px-4 py-3.5 bg-black/50 border border-white/20 rounded-2xl text-white placeholder-gray-400 font-mono text-base font-semibold focus:outline-none focus:border-white transition-all"
            />
          </div>

          <!-- Action Selector Buttons -->
          <div class="grid grid-cols-3 gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
            <!-- @click: Xử lý sự kiện click để gán giá trị cho biến quickAction -->
            <!-- :class: Ràng buộc class động (dynamic class binding) dựa trên giá trị của quickAction -->
            <button 
              type="button" 
              @click="quickAction = 'vote'" 
              :class="quickAction === 'vote' ? 'bg-white text-black shadow-sm' : 'text-gray-300 hover:text-white'"
              class="py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1"
            >
              <span>Vote</span>
            </button>
            <button 
              type="button" 
              @click="quickAction = 'results'" 
              :class="quickAction === 'results' ? 'bg-white text-black shadow-sm' : 'text-gray-300 hover:text-white'"
              class="py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1"
            >
              <span>Results</span>
            </button>
            <button 
              type="button" 
              @click="quickAction = 'edit'" 
              :class="quickAction === 'edit' ? 'bg-white text-black shadow-sm' : 'text-gray-300 hover:text-white'"
              class="py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1"
            >
              <span>Edit</span>
            </button>
          </div>

          <!-- :disabled: Khóa nút submit nếu quickCode bị trống -->
          <button 
            type="submit" 
            :disabled="!quickCode.trim()" 
            class="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm rounded-2xl transition-all duration-200 shadow-lg disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center space-x-2"
          >
            <span>Go to {{ quickAction === 'vote' ? 'Voting Page' : quickAction === 'results' ? 'Live Results' : 'Admin Panel' }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { ref } để tạo các biến phản ứng (reactive variables) trong Vue 3
import { ref } from 'vue';
// import { useRouter } để sử dụng cho việc chuyển trang (navigation)
import { useRouter } from 'vue-router';

// Khởi tạo router để có thể chuyển hướng người dùng bằng code
const router = useRouter();

// Tạo các biến phản ứng (reactive state)
// quickCode lưu trữ giá trị người dùng nhập vào ô mã Code
const quickCode = ref('');
// quickAction lưu trữ hành động mà người dùng muốn thực hiện (vote, results, edit)
const quickAction = ref('vote'); 

// Hàm xử lý sự kiện khi form được submit
const handleQuickJump = () => {
  // Loại bỏ khoảng trắng và dấu '#' ở đầu mã (nếu người dùng có gõ vào)
  const code = quickCode.value.trim().replace(/^#/, '');
  if (!code) return; // Nếu mã rỗng, không làm gì cả
  
  // Kiểm tra lựa chọn của người dùng (quickAction) và chuyển hướng đến URL tương ứng
  if (quickAction.value === 'vote') {
    router.push(`/poll/${code}`);
  } else if (quickAction.value === 'results') {
    router.push(`/results/${code}`);
  } else if (quickAction.value === 'edit') {
    router.push(`/edit/${code}`);
  }
};
</script>