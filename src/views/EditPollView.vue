<template>
  <div class="min-h-screen bg-[#FDFDFD] text-[#1C1C1C] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
    <!-- Header -->
    <header class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center">
      <button @click="router.push('/')" class="inline-flex items-center group focus:outline-none" title="Back to Home">
        <span class="text-4xl font-anton text-black uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300">
          POLLCO<span class="text-amber-400">.</span>
        </span>
      </button>
      <nav class="flex items-center space-x-4">
      </nav>
    </header>

    <!-- Subtle Background Glows -->
    <div class="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-3xl mx-auto relative z-10">

      <!-- 
        Component Banner & Nhập mã.
        v-model="inputPollCode": Truyền biến inputPollCode xuống component con, nếu con đổi thì biến này cũng đổi.
        @submit="fetchPollData": Lắng nghe sự kiện 'submit' từ component con để chạy hàm fetchPollData.
      -->
      <EditPollHero 
        v-model="inputPollCode" 
        :isLoading="isLoading"
        @submit="fetchPollData"
      />

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 space-y-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-14 bg-gray-200 rounded-xl"></div>
        <div class="h-4 bg-gray-200 rounded w-1/3 pt-4"></div>
        <div class="space-y-4">
          <div class="h-14 bg-gray-200 rounded-xl"></div>
          <div class="h-14 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      <!-- Main Form Card (Visible when poll is loaded) -->
      <div v-else-if="isLoaded" class="bg-white rounded-[2rem] shadow-xl border border-gray-200/80 overflow-hidden transition-all duration-300 animate-fade-in">
        <div class="h-2 w-full bg-gradient-to-r from-amber-400 to-amber-500"></div>

        <div class="p-6 sm:p-10 space-y-8">
          <!-- Question Input Section -->
          <div class="space-y-3">
            <label class="block text-sm font-bold text-gray-700">
              Poll Question <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input 
                v-model="pollForm.question" 
                type="text"
                placeholder="e.g., What should we order for lunch today?" 
                class="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl text-base sm:text-lg font-semibold text-black placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none transition-all duration-200 shadow-sm"
                @input="toast.dismiss()"
              />
            </div>
          </div>

          <!-- Options Input Section -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="block text-sm font-bold text-gray-700">
                Answer Options <span class="text-gray-400 font-normal">({{ pollForm.options.length }}/6 max)</span>
              </label>
              <span class="text-xs font-semibold text-gray-400">At least 2 required</span>
            </div>

            <!-- Options List -->
            <div class="space-y-3">
              <!-- 
                v-for lặp qua mảng options. 
                Lưu ý: Mảng options là một mảng các chuỗi (string) đơn giản. 
              -->
              <div 
                v-for="(option, index) in pollForm.options" 
                :key="index"
                class="flex items-center space-x-3 group"
              >
                <!-- Option Index Badge -->
                <div class="w-10 h-12 bg-black text-white font-mono rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                  {{ index + 1 }}
                </div>

                <!-- Option Input -->
                <div class="relative flex-1">
                  <!-- v-model ở đây giúp ràng buộc thẳng vào phần tử thứ [index] của mảng -->
                  <input 
                    v-model="pollForm.options[index]" 
                    type="text"
                    :placeholder="`Option ${index + 1}`" 
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-black placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none transition-all duration-200"
                    @input="toast.dismiss()"
                  />
                </div>

                <!-- Nút xóa (Remove) -->
                <!-- Gọi hàm removeOption(index) để xóa phần tử tại vị trí thứ index -->
                <button 
                  @click="removeOption(index)" 
                  type="button"
                  :disabled="pollForm.options.length <= 2"
                  class="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none focus:outline-none"
                  title="Remove option"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Nút thêm (Add Option) -->
            <!-- Dùng v-if để ẩn nút này nếu đã đủ 6 câu trả lời -->
            <div class="pt-2">
              <button 
                v-if="pollForm.options.length < 6"
                @click="addOption" 
                type="button"
                class="w-full py-3.5 border-2 border-dashed border-gray-300 hover:border-black rounded-2xl text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50/80 transition-all duration-200 flex items-center justify-center space-x-2 group focus:outline-none"
              >
                <svg class="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Another Option</span>
              </button>
              <p v-else class="text-center text-xs text-amber-700 font-semibold py-2.5 bg-amber-50 rounded-xl border border-amber-200">
                You have reached the maximum limit of 6 answer options.
              </p>
            </div>
          </div>

          <!-- Danger Zone & Actions -->
          <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <!-- 
              Component Khu vực Nút Danger (Close & Delete). 
              Lắng nghe sự kiện @close và @delete từ Component con.
            -->
            <EditPollDangerZone 
              :isClosing="isClosing"
              :isDeleting="isDeleting"
              @close="handleClosePoll"
              @delete="handleDeletePoll"
            />

            <!-- Submit Buttons -->
            <div class="flex items-center space-x-3 w-full md:w-auto justify-end">
              <button 
                @click="router.push('/')" 
                type="button"
                class="px-6 py-3.5 text-sm font-bold text-gray-600 hover:text-black transition-colors focus:outline-none"
              >
                Cancel
              </button>

              <button 
                @click="handleUpdatePoll" 
                type="button"
                :disabled="isSubmitting"
                class="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm rounded-full transition-all duration-200 shadow-xl hover:shadow-amber-400/20 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Saving...' : 'Save Changes' }}</span>
                <svg v-if="!isSubmitting" class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { viewPollByCode, editPollByCode, deletePollByCode, closePoll } from '../helps/api';
import { toast } from 'vue-sonner';
import EditPollHero from '../components/edit/EditPollHero.vue';
import EditPollDangerZone from '../components/edit/EditPollDangerZone.vue';

const router = useRouter();
const route = useRoute();

const inputPollCode = ref('');
const currentPollCode = ref('');
const isLoading = ref(false);
const isLoaded = ref(false);
const isSubmitting = ref(false);
const isClosing = ref(false);
const isDeleting = ref(false);

const pollForm = ref({ question: '', options: ['', ''] });

onMounted(() => {
  const code = route.params.code || route.query.code;
  if (code) {
    inputPollCode.value = code;
    fetchPollData();
  }
});

const fetchPollData = async () => {
  const code = inputPollCode.value.trim().replace(/^#/, '');
  if (!code) return toast.error('Please enter a Poll Code!');

  isLoading.value = true;
  isLoaded.value = false;
  toast.dismiss();

  try {
    const data = await viewPollByCode(code);
    if (!data?.question) return toast.error('No poll found with this code!');

    currentPollCode.value = code;
    pollForm.value.question = data.question;
    
    // Code cũ: dùng các hàm nâng cao (map, spread, slice) hơi khó hiểu
    // Code mới: Viết tường minh bằng vòng lặp for dễ hiểu cho người mới học
    const apiOptions = data.options || [];
    const mappedOptions = [];
    
    // 1. Duyệt qua mảng API trả về và lấy text
    for (let i = 0; i < apiOptions.length; i++) {
      let opt = apiOptions[i];
      if (typeof opt === 'string') {
        mappedOptions.push(opt);
      } else {
        mappedOptions.push(opt.text || '');
      }
    }

    // 2. Đảm bảo UI luôn hiển thị ít nhất 2 ô nhập liệu
    if (mappedOptions.length === 0) {
      mappedOptions.push('', ''); // Thêm 2 ô trống
    } else if (mappedOptions.length === 1) {
      mappedOptions.push('');     // Thêm 1 ô trống nữa
    }

    pollForm.value.options = mappedOptions;
    isLoaded.value = true;
    toast.success(`Poll #${code} loaded successfully!`);
  } catch (error) {
    toast.error('Error loading poll data from server.');
  } finally {
    isLoading.value = false;
  }
};

const addOption = () => {
  if (pollForm.value.options.length < 6) {
    pollForm.value.options.push('');
    toast.dismiss();
  }
};

const removeOption = (index) => {
  if (pollForm.value.options.length > 2) {
    pollForm.value.options.splice(index, 1);
    toast.dismiss();
  }
};

const handleUpdatePoll = async () => {
  toast.dismiss();
  const question = pollForm.value.question.trim();
  const options = [];
  for (let i = 0; i < pollForm.value.options.length; i++) {
    options.push(pollForm.value.options[i].trim());
  }

  if (!question) return toast.error('Please enter a question for your poll!');
  
  // Kiểm tra xem có option nào bị trống không
  let hasEmptyOption = false;
  for (let i = 0; i < options.length; i++) {
    if (options[i] === '') {
      hasEmptyOption = true;
      break;
    }
  }
  if (hasEmptyOption) return toast.error('Options cannot be empty!');

  const creatorToken = localStorage.getItem(`poll_token_${currentPollCode.value}`);
  if (!creatorToken) return toast.error('You do not have permission to edit this poll.');

  isSubmitting.value = true;
  try {
    const res = await editPollByCode(currentPollCode.value, { creatorToken, question, options });
    if (res) {
      toast.success('Poll updated successfully!');
      router.push(`/results/${currentPollCode.value}`);
    } else toast.error('An error occurred while updating the poll.');
  } catch (error) {
    toast.error('Unable to connect to the server.');
  } finally {
    isSubmitting.value = false;
  }
};

const handleClosePoll = async () => {
  if (!confirm('Are you sure you want to close this poll? Users will no longer be able to vote.')) return;
  
  const creatorToken = localStorage.getItem(`poll_token_${currentPollCode.value}`);
  if (!creatorToken) return toast.error('You do not have permission to close this poll.');
  
  isClosing.value = true;
  try {
    const res = await closePoll(currentPollCode.value, creatorToken);
    if (res) toast.success('Poll closed successfully.');
    else toast.error('Unable to close poll at this time.');
  } catch (error) {
    toast.error('Connection error while closing poll.');
  } finally {
    isClosing.value = false;
  }
};

const handleDeletePoll = async () => {
  if (!confirm('WARNING: Are you sure you want to permanently delete this poll? This action cannot be undone!')) return;
  
  const creatorToken = localStorage.getItem(`poll_token_${currentPollCode.value}`);
  if (!creatorToken) return toast.error('You do not have permission to delete this poll.');
  
  isDeleting.value = true;
  try {
    const res = await deletePollByCode(currentPollCode.value, creatorToken);
    if (res) {
      toast.success('Poll deleted permanently.');
      router.push('/');
    } else toast.error('Unable to delete poll.');
  } catch (error) {
    toast.error('Connection error while deleting poll.');
  } finally {
    isDeleting.value = false;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>