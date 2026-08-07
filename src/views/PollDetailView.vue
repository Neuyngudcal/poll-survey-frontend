<template>
  <div class="min-h-screen bg-[#FDFDFD] text-[#1C1C1C] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
    <!-- Header -->
    <header class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center">
      <!-- 
        Nút Back to Home.
        Dùng thẻ button và router.push() thay vì thẻ <a> để trang web không bị reload (Tải lại từ đầu).
      -->
      <button @click="router.push('/')" class="inline-flex items-center group focus:outline-none" title="Back to Home">
        <span class="text-4xl font-anton text-black uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300">
          POLLCO<span class="text-amber-400">.</span>
        </span>
      </button>
    </header>

    <!-- Background Accents -->
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"></div>
    </div>

    <!-- Main Container -->
    <main class="relative z-10 max-w-4xl mx-auto">
      
      <!-- Loading State (Hiển thị biểu tượng quay quay khi đang chờ gọi API) -->
      <div v-if="isLoading" class="flex flex-col justify-center items-center py-32 space-y-4">
        <div class="w-14 h-14 border-4 border-gray-200 border-t-amber-400 rounded-full animate-spin"></div>
        <p class="text-gray-500 font-medium">Loading poll details...</p>
      </div>

      <!-- Error State (Hiển thị báo lỗi nếu không tìm thấy) -->
      <div v-else-if="error" class="bg-white p-10 rounded-[2rem] shadow-xl border border-red-100 text-center">
        <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Poll Not Found</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">{{ error }}</p>
        <div class="flex justify-center gap-4">
          <router-link to="/lists" class="px-8 py-3.5 bg-black hover:bg-gray-800 text-white font-bold rounded-full transition-colors">
            Browse All Polls
          </router-link>
          <router-link to="/" class="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-black font-bold rounded-full transition-colors">
            Go Home
          </router-link>
        </div>
      </div>

      <!-- Poll Details Content (Hiển thị sau khi tải xong dữ liệu thành công) -->
      <div v-else-if="poll" class="space-y-8">
        
        <!-- Navigation Breadcrumb -->
        <div class="flex items-center space-x-2 text-sm font-medium text-gray-500 mb-8">
          <router-link to="/lists" class="hover:text-black transition-colors flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to List
          </router-link>
          <span>/</span>
          <span class="text-black truncate max-w-[200px]">Poll #{{ poll.pollCode }}</span>
        </div>

        <!-- Detail Card -->
        <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          
          <!-- Component Header hiển thị Tiêu đề và Thời gian -->
          <!-- Truyền dữ liệu 'poll' thông qua props (:poll="poll") xuống Component con -->
          <PollDetailHeader :poll="poll" />

          <!-- Options List (Danh sách các đáp án) -->
          <div class="p-8 sm:p-12 bg-gray-50/50">
            <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <svg class="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Available Options ({{ poll.options ? poll.options.length : 0 }})
            </h3>
            
            <ul class="space-y-3">
              <!-- v-for lặp qua từng phương án (option) -->
              <li v-for="(option, index) in poll.options" :key="option.id || index" 
                  class="bg-white border border-gray-200 rounded-xl p-5 flex items-center shadow-sm">
                <span class="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-mono text-sm font-bold mr-4 flex-shrink-0">
                  {{ index + 1 }}
                </span>
                <span class="text-gray-800 font-semibold text-lg">{{ option.text }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Component Footer hiển thị các nút điều hướng (Bỏ phiếu, Xem kết quả) -->
          <PollDetailActions :poll="poll" />
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { viewPollByCode } from '../helps/api';

import PollDetailHeader from '../components/detail/PollDetailHeader.vue';
import PollDetailActions from '../components/detail/PollDetailActions.vue';

const route = useRoute();
const router = useRouter();

// Dữ liệu 'poll' sẽ là Object sau khi lấy được từ server
const poll = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  const code = route.params.code; // Lấy mã Code từ thanh URL (VD: /detail/ABCD -> lấy ra chữ ABCD)
  if (!code) {
    error.value = "No poll code provided.";
    isLoading.value = false;
    return;
  }

  try {
    const data = await viewPollByCode(code);
    if (data) {
      poll.value = data; // Gán dữ liệu nhận được vào biến `poll`
    } else {
      error.value = "Poll not found or may have been deleted.";
    }
  } catch (err) {
    console.error('Error fetching poll:', err);
    error.value = "Failed to load poll details. Please try again.";
  } finally {
    isLoading.value = false;
  }
});
</script>