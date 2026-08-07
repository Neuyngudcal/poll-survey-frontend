<template>
  <div class="min-h-screen bg-[#FDFDFD] text-[#1C1C1C] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white relative overflow-x-hidden">
    <!-- Header -->
    <header class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center">
      <button @click="router.push('/')" class="inline-flex items-center group focus:outline-none" title="Back to Home">
        <span class="text-4xl font-anton text-black uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300">
          POLLCO<span class="text-amber-400">.</span>
        </span>
      </button>
    </header>

    <!-- Background Glows -->
    <div class="absolute top-0 right-0 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-3xl mx-auto relative z-10">
      <QaHeroSection />
      <FaqList />
      <ContactSupportSection />
      
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import QaHeroSection from '../components/qa/QaHeroSection.vue'
import FaqList from '../components/qa/FaqList.vue'
import ContactSupportSection from '../components/qa/ContactSupportSection.vue'
</script>