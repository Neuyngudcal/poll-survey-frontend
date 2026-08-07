<template>
  <div class="w-full min-h-screen bg-[#FDFDFD] text-[#1C1C1C] overflow-x-hidden font-sans selection:bg-black selection:text-white">
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
  </div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue';
import FeaturesSection from '../components/home/FeaturesSection.vue';
import HowItWorksSection from '../components/home/HowItWorksSection.vue';
</script>