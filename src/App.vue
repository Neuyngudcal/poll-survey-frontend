<template>
  <div class="min-h-screen bg-background relative flex flex-col">
    <header v-if="!$route.meta.hideLayout" class="w-full absolute top-0 left-0 z-50 py-8 px-8 sm:px-16 lg:px-32 flex justify-between items-center transition-colors duration-300" :class="$route.path === '/' ? 'text-white' : 'text-black'">
      <router-link to="/" class="text-4xl font-anton uppercase">POLLCO</router-link>
      <nav class="flex items-center space-x-6">
      </nav>
    </header>

    <main class="flex-grow w-full relative z-10" >
      <router-view />
    </main>
    
    <footer v-if="!$route.meta.hideLayout" class="w-full relative z-10 py-12 px-8 sm:px-16 lg:px-32 flex justify-between items-center border-t border-gray-200 mt-auto">
      <router-link to="/qa" class="text-sm text-gray-600 font-light hover:opacity-70 hover:underline transition-opacity">Have a question? Contact us.</router-link>
      <span class="ml-auto text-sm text-gray-600 font-light">©2026 POLLCO</span>
    </footer>

    <Toaster position="top-right" rich-colors close-button />
  </div>
</template>

<script setup>
import { Toaster } from 'vue-sonner'
</script>