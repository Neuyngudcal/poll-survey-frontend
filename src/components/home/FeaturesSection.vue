<template>
  <!-- Core Features Showcase (Bento Grid) -->
  <section id="features" class="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
      <h2 class="text-3xl sm:text-5xl font-extrabold text-black font-anton">
        Designed for Speed, Simplicity & Control
      </h2>
      <p class="text-gray-600 text-base sm:text-lg">
        We stripped away all the friction of traditional survey platforms. No registration walls, no hidden fees, and zero complexity.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Feature 1: No Login Required -->
      <div class="bg-gradient-to-br from-white to-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
        <div class="space-y-6">
          <div class="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div class="space-y-3">
            <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-green-100 text-green-800 text-xs font-bold font-mono">
              ⚡ 0s Setup Time
            </div>
            <h3 class="text-2xl font-bold text-black">
              Create Polls Without Logging In
            </h3>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              Skip the sign-up forms, passwords, and email verifications. Open the app, type your question, add up to 6 answer options, and hit publish instantly. Your community can participate without creating an account either.
            </p>
          </div>
        </div>
      </div>

      <!-- Feature 2: Easy Sharing -->
      <div class="bg-gradient-to-br from-white to-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
        <div class="space-y-6">
          <div class="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>

          <div class="space-y-3">
            <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold font-mono">
              🔗 Universal Links
            </div>
            <h3 class="text-2xl font-bold text-black">
              Effortless One-Click Sharing
            </h3>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              Every poll generates a clean short code and URL (e.g. <code>/poll/pPNXiZQ</code>). Share it in messaging apps, social media, or live meetings. Participants vote with a single tap and see live percentage updates immediately.
            </p>
          </div>
        </div>
      </div>

      <!-- Feature 3: Control & Edit Polls -->
      <div class="bg-gradient-to-br from-white to-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
        <div class="space-y-6">
          <div class="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <div class="space-y-3">
            <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold font-mono">
              🛡️ Admin Authority
            </div>
            <h3 class="text-2xl font-bold text-black ">
              Full Control & Secure Edits
            </h3>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              When you create a poll, our system automatically saves an encrypted Admin Token to your device. Use it to update questions, modify answer options, close voting when time runs out, or delete polls permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
