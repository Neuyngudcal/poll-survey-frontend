<template>
  <!-- Call To Action - CTA-->
  <div class="mt-16 bg-gradient-to-br from-gray-900 to-black rounded-[2rem] p-10 text-center text-white border border-gray-800 shadow-2xl relative overflow-hidden">
    <!-- Hiệu ứng màu nền ánh sáng -->
    <div class="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>
    
    <h3 class="text-2xl sm:text-3xl font-extrabold font-anton mb-3">Still have questions?</h3>
    <p class="text-gray-300 mb-8 text-base max-w-md mx-auto">
      Can't find the answer you're looking for? Reach out directly to our friendly support team.
    </p>
    <a 
      href="https://www.facebook.com/profile.php?id=61591453265744" 
      target="_blank" 
      class="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-base rounded-full transition-all shadow-xl hover:scale-105"
    >
      <span>Contact Support</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</template>
