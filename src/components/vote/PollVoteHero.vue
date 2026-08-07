<template>
  <div class="bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white rounded-[2.5rem] p-8 sm:p-12 mb-8 shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>
    
    <div class="relative z-10">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
          <span>Voting Open • Code: #{{ pollCode }}</span>
        </div>

        <div v-if="isCreator" class="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-400 text-black text-xs font-extrabold shadow">
          👑 You are the Creator
        </div>
      </div>

      <h1 v-if="isLoaded" class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-anton leading-tight">
        {{ question }}
      </h1>
      <h1 v-else class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-400 mb-3 font-anton animate-pulse">
        Loading poll question...
      </h1>
      <p class="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
        Select your preferred option below and click Submit Vote. Responses are confidential and updated in real-time.
      </p>
    </div>
  </div>
</template>

<script setup>
// Component này chỉ để hiển thị Câu hỏi bình chọn (Question)
defineProps({
  pollCode: String,
  question: String,
  isCreator: Boolean,
  isLoaded: Boolean
})
</script>
