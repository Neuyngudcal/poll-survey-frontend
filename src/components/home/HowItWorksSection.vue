<template>
  <div>
    <!-- How It Works Section -->
    <section class="w-full py-20 bg-gray-100 border-y border-gray-200/60 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-black font-anton tracking-tight mb-3">
            How It Works in 3 Simple Steps
          </h2>
          <p class="text-gray-600 text-base">Get from question to actionable data in less time than it takes to log in elsewhere.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Step 1 -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative">
            <div class="w-10 h-10 rounded-full bg-black text-white font-mono font-bold flex items-center justify-center text-lg mb-6 shadow">
              1
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Type Your Question</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Enter your survey topic and up to 6 answer options. No account required, just type and click submit.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative">
            <div class="w-10 h-10 rounded-full bg-black text-white font-mono font-bold flex items-center justify-center text-lg mb-6 shadow">
              2
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Share & Collect Votes</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Copy your unique share URL. Send it to friends, colleagues, or social followers to start gathering responses instantly.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative">
            <div class="w-10 h-10 rounded-full bg-black text-white font-mono font-bold flex items-center justify-center text-lg mb-6 shadow">
              3
            </div>
            <h3 class="text-xl font-bold text-black mb-2">Analyze or Edit Anytime</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Watch real-time live percentage bars update every 5 seconds. Use your saved Admin Token to close or modify the poll whenever needed.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA Card Section -->
    <section class="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div class="bg-gradient-to-r from-black via-gray-900 to-black rounded-[2.5rem] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl border border-gray-800">
        <!-- Glowing accent orb -->
        <div class="absolute top-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 class="text-3xl sm:text-5xl md:text-6xl font-extrabold font-anton tracking-tight leading-tight">
            Ready to Gather Real Insights?
          </h2>
          <p class="text-gray-300 text-base sm:text-lg max-w-xl mx-auto font-normal">
            Experience the fastest, most effortless polling platform built for modern communities. Make your voice heard today.
          </p>
          <div class="pt-4">
            <!-- Sử dụng <router-link> để chuyển hướng nội bộ trong Vue Router mà không load lại trang -->
            <router-link 
              to="/create" 
              class="inline-flex items-center space-x-2 px-10 py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-base rounded-full transition-all duration-200 shadow-xl hover:shadow-amber-400/20 hover:scale-105"
            >
              <span>Create Free Poll Now</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>