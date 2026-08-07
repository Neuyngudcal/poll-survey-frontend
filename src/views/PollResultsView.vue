<template>
  <div class="min-h-screen bg-[#FDFDFD] text-[#1C1C1C] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
    <!-- Absolute Header matching HomeView -->
    <header class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center">
      <button @click="router.push('/')" class="inline-flex items-center group focus:outline-none" title="Back to Home">
        <span class="text-4xl font-anton text-black uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300">
          POLLCO<span class="text-amber-400">.</span>
        </span>
      </button>
    </header>

    <!-- Subtle Background Glows matching Home -->
    <div class="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-3xl mx-auto relative z-10">

      <!-- Hero Header Banner matching Home Dark Theme -->
      <div class="bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white rounded-[2.5rem] p-8 sm:p-12 mb-8 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div class="max-w-md">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-green-300 mb-4">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-1"></span>
              <span>Live Analytics & Breakdown</span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-anton">
              Poll Results
            </h1>
            <p class="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
              Real-time voting data and community feedback breakdown. Responses refresh automatically every 5 seconds.
            </p>
          </div>

          <!-- Poll Code Selector right in Header -->
          <div class="w-full md:w-auto bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex-shrink-0">
            <label class="block text-xs font-bold text-gray-400 mb-2">
              Enter Poll Code to View
            </label>
            <form @submit.prevent="fetchResults" class="flex gap-2">
              <input 
                v-model="inputPollCode" 
                type="text"
                placeholder="e.g., pPNXiZQ" 
                class="w-32 sm:w-40 px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl font-mono text-sm font-semibold text-white placeholder-gray-500 focus:bg-white/10 focus:border-amber-400 focus:outline-none transition-all"
              />
              <button 
                type="submit" 
                :disabled="isLoading || !inputPollCode.trim()"
                class="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl font-extrabold text-sm disabled:opacity-40 transition-all flex items-center space-x-1"
              >
                <svg v-if="isLoading" class="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? '' : 'View' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 space-y-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-10 bg-gray-200 rounded w-3/4"></div>
        <div class="space-y-4 pt-4">
          <div class="h-16 bg-gray-200 rounded-xl"></div>
          <div class="h-16 bg-gray-200 rounded-xl"></div>
          <div class="h-16 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      <!-- Results Content Card -->
      <div v-else-if="isLoaded" class="bg-white rounded-[2rem] shadow-xl border border-gray-200/80 overflow-hidden transition-all duration-300 animate-fade-in">
        <!-- Top accent banner -->
        <div class="h-2 w-full bg-gradient-to-r from-amber-400 to-amber-500"></div>

        <div class="p-6 sm:p-10">
          <!-- Question Header & Refresh Indicator -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-100">
            <div>
              <span class="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2 inline-block">
                Question
              </span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mt-1">
                {{ pollData.question }}
              </h2>
            </div>

            <!-- Auto-refresh status -->
            <div class="flex items-center space-x-3 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200/80 self-start sm:self-center">
              <span class="relative flex h-2.5 w-2.5">
                <span :class="isAutoRefresh ? 'animate-ping bg-green-400' : 'bg-gray-300'" class="absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                <span :class="isAutoRefresh ? 'bg-green-500' : 'bg-gray-400'" class="relative inline-flex rounded-full h-2.5 w-2.5"></span>
              </span>
              <span class="text-xs font-semibold text-gray-600">
                {{ isAutoRefresh ? 'Live (WebSocket)' : 'Paused' }}
              </span>
              <button 
                @click="toggleAutoRefresh" 
                class="text-xs font-bold text-black hover:underline focus:outline-none"
              >
                {{ isAutoRefresh ? 'Pause' : 'Resume' }}
              </button>
            </div>
          </div>

          <!-- Total Votes & Winner Banner -->
          <div class="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-gray-50/80 p-5 rounded-2xl border border-gray-200/60 flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg shadow-sm">
                📊
              </div>
              <div>
                <div class="text-xs font-bold text-gray-500">Total Votes</div>
                <div class="text-2xl font-extrabold text-black">{{ totalVotes }}</div>
              </div>
            </div>

            <div class="bg-amber-50/80 p-5 rounded-2xl border border-amber-200/60 flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-black flex items-center justify-center font-bold text-lg shadow-sm">
                👑
              </div>
              <div class="overflow-hidden">
                <div class="text-xs font-bold text-amber-800">Leading Option</div>
                <div class="text-lg font-extrabold text-black truncate">
                  {{ leadingOption ? leadingOption.text : 'No votes yet' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Options Breakdown List -->
          <div class="space-y-4 pt-4">
            <div class="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
              <span>Options</span>
              <span>Votes & Percentage</span>
            </div>

            <div 
              v-for="(option, index) in processedOptions" 
              :key="index"
              class="relative bg-gray-50 rounded-2xl p-5 border transition-all duration-300 overflow-hidden group"
              :class="option.isWinner && totalVotes > 0 ? 'border-amber-400 shadow-md bg-amber-50/30' : 'border-gray-200 hover:border-gray-300'"
            >
              <!-- Background Progress Bar -->
              <div 
                class="absolute top-0 left-0 bottom-0 transition-all duration-700 ease-out rounded-2xl"
                :class="option.isWinner && totalVotes > 0 ? 'bg-gradient-to-r from-amber-200/60 to-amber-300/40' : 'bg-gray-200/60'"
                :style="{ width: `${option.percentage}%` }"
              ></div>

              <!-- Option Content -->
              <div class="relative z-10 flex items-center justify-between gap-4">
                <div class="flex items-center space-x-3.5 min-w-0">
                  <span 
                    class="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 shadow-sm"
                    :class="option.isWinner && totalVotes > 0 ? 'bg-amber-400 text-black' : 'bg-black text-white'"
                  >
                    {{ index + 1 }}
                  </span>
                  <span class="font-bold text-black text-base sm:text-lg truncate">
                    {{ option.text }}
                  </span>
                  <span v-if="option.isWinner && totalVotes > 0" class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-black shadow-sm">
                    ★ Leading
                  </span>
                </div>

                <div class="flex items-center space-x-4 flex-shrink-0">
                  <span class="text-sm font-semibold text-gray-600">
                    {{ option.votes }} {{ option.votes === 1 ? 'vote' : 'votes' }}
                  </span>
                  <span class="text-lg font-extrabold text-black font-mono w-14 text-right">
                    {{ option.percentage }}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Actions & Share -->
          <div class="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Results update in real-time as votes are submitted.</span>
            </div>

            <div class="flex items-center space-x-3 w-full sm:w-auto">
              <button 
                @click="copyShareLink" 
                type="button"
                class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm rounded-full transition-all shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Share Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty / Not Loaded State -->
      <div v-else class="text-center py-16 bg-white rounded-[2rem] shadow-sm border border-gray-200 p-8">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">No Poll Selected</h3>
        <p class="text-gray-500 max-w-sm mx-auto text-sm">
          Please enter your Poll Code above to view live voting analytics and response percentages.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getPollResults, viewPollByCode, HUB_BASE_URL } from '../helps/api';
import { toast } from 'vue-sonner';
import * as signalR from '@microsoft/signalr';

const router = useRouter();
const route = useRoute();

const inputPollCode = ref('');
const currentPollCode = ref('');
const isLoading = ref(false);
const isLoaded = ref(false);
const isRefreshing = ref(false);
const isAutoRefresh = ref(true);
let hubConnection = null;

const pollData = ref({ question: '', options: [] });

// Tính tổng số phiếu bầu (Viết tường minh thay vì dùng hàm reduce phức tạp)
const totalVotes = computed(() => {
  let sum = 0;
  for (let i = 0; i < pollData.value.options.length; i++) {
    sum += (pollData.value.options[i].votes || 0);
  }
  return sum;
});

// Tìm ra câu trả lời có nhiều phiếu nhất (Viết tường minh thay vì dùng hàm sort)
const leadingOption = computed(() => {
  if (pollData.value.options.length === 0 || totalVotes.value === 0) {
    return null;
  }
  
  let winner = pollData.value.options[0];
  for (let i = 1; i < pollData.value.options.length; i++) {
    if (pollData.value.options[i].votes > winner.votes) {
      winner = pollData.value.options[i];
    }
  }
  return winner;
});

const processedOptions = computed(() => {
  const total = totalVotes.value;
  const maxVotes = leadingOption.value?.votes || 0;
  
  const results = [];
  for (let i = 0; i < pollData.value.options.length; i++) {
    const opt = pollData.value.options[i];
    const votes = opt.votes || 0;
    results.push({
      id: opt.id,
      text: opt.text,
      votes: votes,
      percentage: total > 0 ? Math.round((votes / total) * 100) : 0,
      isWinner: total > 0 && votes === maxVotes && votes > 0
    });
  }
  return results;
});

onMounted(() => {
  const code = route.params.code || route.query.code;
  if (code) {
    inputPollCode.value = code;
    fetchResults();
  }
});

onUnmounted(() => stopSignalR());

const fetchResults = async () => {
  const code = inputPollCode.value.trim().replace(/^#/, '');
  if (!code) return toast.error('Please enter a Poll Code!');

  isLoading.value = true;
  isLoaded.value = false;
  toast.dismiss();

  try {
    await loadResultsData(code);
    currentPollCode.value = code;
    isLoaded.value = true;
    startSignalR(code);
    toast.success(`Results for #${code} loaded successfully!`);
  } catch (error) {
    toast.error('No poll results found with this code. Please check again.');
  } finally {
    isLoading.value = false;
  }
};

const loadResultsData = async (code) => {
  let data = await getPollResults(code);
  
  if (!data?.question && !data?.options && !data?.results) {
    data = await viewPollByCode(code);
    if (!data?.question) throw new Error('Poll not found');
  }

  const rawOpts = data.options || data.results || [];
  const mappedOptions = [];
  for (let i = 0; i < rawOpts.length; i++) {
    const opt = rawOpts[i];
    mappedOptions.push({
      id: opt.id !== undefined && opt.id !== null ? opt.id : i,
      text: opt.text !== undefined && opt.text !== null ? opt.text : opt,
      votes: parseInt(opt.votes !== undefined && opt.votes !== null ? opt.votes : 0, 10)
    });
  }
  
  pollData.value = {
    question: data.question || `Poll #${code}`,
    options: mappedOptions
  };
};

const silentRefresh = async () => {
  if (!isLoaded.value || !currentPollCode.value || isRefreshing.value) return;
  isRefreshing.value = true;
  try {
    await loadResultsData(currentPollCode.value);
  } catch (error) {} finally {
    isRefreshing.value = false;
  }
};

const startSignalR = async (code) => {
  stopSignalR();
  
  hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(HUB_BASE_URL)
    .withAutomaticReconnect()
    .build();

  hubConnection.on("ResultsUpdated", () => {
    if (isAutoRefresh.value) {
      silentRefresh();
    }
  });

  try {
    await hubConnection.start();
    await hubConnection.invoke("WatchPoll", code);
  } catch (err) {
    console.error("SignalR Connection Error: ", err);
  }
};

const stopSignalR = async () => {
  if (hubConnection) {
    try {
      await hubConnection.stop();
    } catch (err) {}
    hubConnection = null;
  }
};

const toggleAutoRefresh = () => {
  isAutoRefresh.value = !isAutoRefresh.value;
  if (isAutoRefresh.value) {
    toast.success('Real-time WebSocket updates resumed');
  } else {
    toast.info('Real-time updates paused.');
  }
};

const copyShareLink = () => {
  navigator.clipboard.writeText(`${window.location.origin}/poll/${currentPollCode.value}`)
    .then(() => toast.success('Share link copied to clipboard!'))
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
