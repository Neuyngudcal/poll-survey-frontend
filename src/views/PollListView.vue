<template>
  <div class="min-h-screen bg-[#FDFDFD] text-[#1C1C1C] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
    <!-- Absolute Header matching HomeView -->
    <header class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center">
      <router-link to="/" class="inline-flex items-center group focus:outline-none" title="Back to Home">
        <span class="text-4xl font-anton text-black uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300">
          POLLCO<span class="text-amber-400">.</span>
        </span>
      </router-link>
    </header>

    <!-- Subtle Background Glows -->
    <div class="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <!-- Rounded Header Card -->
      <div class="bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white rounded-[2.5rem] p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left max-w-4xl mx-auto">
        <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div class="relative z-10 flex-1">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-green-300 mb-4">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-1"></span>
            <span>Active Community Polls</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight font-anton text-white mb-3">
            Explore Polls
          </h1>
          <p class="text-gray-300 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            Discover what the community is voting on. Find trending polls, participate in active discussions, or check out past results.
          </p>
        </div>

        <div class="relative z-10 flex-shrink-0">
          <router-link to="/create" class="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-full transition-all shadow-lg hover:scale-105 flex items-center space-x-2">
            <span>Create New Poll</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </router-link>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16 bg-red-50 rounded-2xl border border-red-100">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <h3 class="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p class="text-red-600">{{ error }}</p>
          <button @click="fetchPolls" class="mt-4 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-semibold transition-colors">Try Again</button>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="polls.length === 0" class="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">No Polls Found</h3>
          <p class="text-gray-500 max-w-sm mx-auto">There are no polls available right now. Be the first to create one!</p>
        </div>
        
        <!-- Poll Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="poll in polls" :key="poll.pollCode" class="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div class="p-6 sm:p-8">
              <div class="flex justify-between items-start mb-4">
                <span class="px-3 py-1 text-xs font-bold font-mono rounded-full" :class="poll.isClosed ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">
                  {{ poll.isClosed ? 'Closed' : 'Active' }}
                </span>
                <span class="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">#{{ poll.pollCode }}</span>
              </div>
              <h3 class="text-xl font-bold text-black mb-3 line-clamp-2 leading-tight group-hover:text-amber-500 transition-colors">
                {{ poll.question }}
              </h3>
              <p class="text-gray-500 text-sm mb-6">{{ poll.options ? poll.options.length : 0 }} Options Available</p>
            </div>
            
            <div class="border-t border-gray-100 bg-gray-50/50 p-6 flex items-center gap-3">
              <router-link :to="`/detail/${poll.pollCode}`" class="flex-1 py-3 bg-black hover:bg-gray-800 text-white font-bold text-sm text-center rounded-xl transition-colors">
                View Details
              </router-link>
              <router-link :to="`/poll/${poll.pollCode}`" class="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold text-sm text-center rounded-xl transition-colors" v-if="!poll.isClosed">
                Vote Now
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { viewAllPolls } from '../helps/api';

const polls = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchPolls = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const data = await viewAllPolls();
    if (data && Array.isArray(data)) {
      polls.value = data;
    } else {
      // Handle cases where backend wraps data, or assign empty array if invalid
      polls.value = data?.polls || [];
    }
  } catch (err) {
    console.error('Failed to load polls', err);
    error.value = 'Failed to load polls. Please check your connection and try again.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPolls();
});
</script>