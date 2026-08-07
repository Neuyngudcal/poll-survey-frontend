<template>
  <div class="min-h-screen bg-[#FDFDFD] text-[#1C1C1C] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
    <!-- Header -->
    <header class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center">
      <button @click="router.push('/')" class="inline-flex items-center group focus:outline-none" title="Back to Home">
        <span class="text-4xl font-anton text-black uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300">
          POLLCO<span class="text-amber-400">.</span>
        </span>
      </button>

      <nav v-if="isLoaded" class="flex items-center space-x-3">
        <button 
          v-if="isCreator"
          @click="router.push(`/edit/${pollCode}`)" 
          class="inline-flex items-center px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-full text-xs font-bold text-amber-800 transition-all"
        >
          <span>Admin Panel</span>
        </button>
      </nav>
    </header>

    <!-- Subtle Background Glows -->
    <div class="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-3xl mx-auto relative z-10">

      <!-- 
        Component chứa Tiêu đề Bình chọn.
        Dùng v-bind (dấu :) để truyền các giá trị từ Component cha xuống Component con.
      -->
      <PollVoteHero 
        :pollCode="pollCode"
        :question="pollData.question"
        :isCreator="isCreator"
        :isLoaded="isLoaded"
      />

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 space-y-4 animate-pulse">
        <div class="h-16 bg-gray-200 rounded-2xl"></div>
        <div class="h-16 bg-gray-200 rounded-2xl"></div>
        <div class="h-16 bg-gray-200 rounded-2xl"></div>
      </div>

      <!-- Main Voting Card -->
      <div v-else-if="isLoaded" class="bg-white rounded-[2rem] shadow-xl border border-gray-200/80 overflow-hidden transition-all duration-300 animate-fade-in">
        <div class="h-2 w-full bg-gradient-to-r from-amber-400 to-amber-500"></div>

        <form @submit.prevent="handleVote" class="p-6 sm:p-10 space-y-8">
          <div class="space-y-4">
            <label class="block text-sm font-bold text-gray-700">
              Choose an option to cast your vote:
            </label>

            <!-- 
              Component chứa Danh sách Đáp án để chọn (Radio buttons).
              Dùng v-model="selectedOptionIndex" để đồng bộ lựa chọn của người dùng từ Component con lên biến selectedOptionIndex của cha.
            -->
            <PollVoteOptions 
              :options="pollData.options"
              v-model="selectedOptionIndex"
            />
          </div>

          <!-- Actions Footer -->
          <div class="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center space-x-3 w-full sm:w-auto">
              <button 
                @click="copyShareLink" 
                type="button"
                class="w-full sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-black font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 00-2 2z" />
                </svg>
                <span>Share Poll Link</span>
              </button>
            </div>

            <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button 
                @click="router.push(`/results/${pollCode}`)" 
                type="button"
                class="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-gray-600 hover:text-black transition-colors"
              >
                View Results
              </button>

              <button 
                type="submit" 
                :disabled="isSubmitting || selectedOptionIndex === null"
                class="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-base rounded-full transition-all duration-200 shadow-xl hover:shadow-amber-400/20 hover:scale-105 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center space-x-2"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Submitting Vote...' : 'Submit Vote' }}</span>
                <svg v-if="!isSubmitting" class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-16 bg-white rounded-[2rem] shadow-sm border border-gray-200 p-8">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Poll Not Found</h3>
        <p class="text-gray-500 max-w-sm mx-auto text-sm mb-6">
          The poll code <strong class="font-mono">#{{ pollCode }}</strong> does not exist or has been deleted.
        </p>
        <button 
          @click="router.push('/')"
          class="px-8 py-3 bg-black text-white font-bold rounded-full text-sm hover:bg-gray-800 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { viewPollByCode, votePoll } from '../helps/api';
import { toast } from 'vue-sonner';
import PollVoteHero from '../components/vote/PollVoteHero.vue';
import PollVoteOptions from '../components/vote/PollVoteOptions.vue';

const router = useRouter();
const route = useRoute();

const pollCode = ref('');
const isLoading = ref(true);
const isLoaded = ref(false);
const isSubmitting = ref(false);
const selectedOptionIndex = ref(null);
const isCreator = ref(false);

const pollData = ref({ question: '', options: [] });

onMounted(() => {
  const code = route.params.code;
  if (code) {
    pollCode.value = code;
    isCreator.value = !!localStorage.getItem(`poll_token_${code}`);
    fetchPollDetails();
  } else isLoading.value = false;
});

const fetchPollDetails = async () => {
  isLoading.value = true;
  try {
    const data = await viewPollByCode(pollCode.value);
    if (!data?.question) return toast.error('Poll not found.');

    pollData.value.question = data.question;
    const mappedOptions = [];
    const apiOptions = data.options || [];
    for (let i = 0; i < apiOptions.length; i++) {
      const opt = apiOptions[i];
      mappedOptions.push({
        id: opt.id !== undefined && opt.id !== null ? opt.id : i,
        text: opt.text !== undefined && opt.text !== null ? opt.text : opt
      });
    }
    pollData.value.options = mappedOptions;

    isLoaded.value = true;
  } catch (error) {
    toast.error('Unable to load poll from server.');
  } finally {
    isLoading.value = false;
  }
};

const handleVote = async () => {
  if (selectedOptionIndex.value === null) return toast.error('Please select an option before voting!');

  const selectedOpt = pollData.value.options[selectedOptionIndex.value];
  if (!selectedOpt) return;

  isSubmitting.value = true;
  try {
    const res = await votePoll(pollCode.value, selectedOpt.id);
    if (res) {
      toast.success('Your vote has been submitted successfully!');
      router.push(`/results/${pollCode.value}`);
    } else toast.error('Failed to submit vote. Please try again.');
  } catch (error) {
    toast.error('Connection error while voting.');
  } finally {
    isSubmitting.value = false;
  }
};

const copyShareLink = () => {
  navigator.clipboard.writeText(`${window.location.origin}/poll/${pollCode.value}`)
    .then(() => toast.success('Poll link copied to clipboard!'))
    .catch(() => toast.error('Failed to copy link.'));
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