<template>
  <div class="p-8 sm:p-12 border-b border-gray-100">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <span class="px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider"
            :class="poll.isClosed ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'">
        ● {{ poll.isClosed ? 'Voting Closed' : 'Accepting Votes' }}
      </span>
      <div class="flex items-center text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>
        <span class="font-mono text-sm font-bold text-gray-600">{{ poll.pollCode }}</span>
      </div>
    </div>

    <h1 class="text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight mb-4">
      {{ poll.question }}
    </h1>
    
    <p class="text-gray-500 flex items-center mt-6 text-sm" v-if="poll.createdAt">
      <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      Created at {{ new Date(poll.createdAt).toLocaleDateString() }}
    </p>
  </div>
</template>

<script setup>
// Component này chỉ dùng để hiển thị phần Header của bài Bình chọn.
// Dữ liệu 'poll' được truyền từ Component cha xuống thông qua defineProps.
defineProps({
  poll: {
    type: Object,
    required: true
  }
})
</script>
