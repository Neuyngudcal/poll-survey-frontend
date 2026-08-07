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
      <!-- Hero Banner -->
      <div class="bg-gradient-to-br from-[#0F0F0F] via-[#1C1C1C] to-[#2A2A2A] text-white rounded-[2.5rem] p-8 sm:p-12 mb-8 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div class="relative z-10 max-w-xl">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-4">
            <span>⚡ Instant Setup • Zero Registration</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-anton">
            Create Your Poll
          </h1>
          <p class="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
            Ask your question and let your community vote in real-time. We will automatically generate your shareable link and private admin token.
          </p>
        </div>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white rounded-[2rem] shadow-xl border border-gray-200/80 p-6 sm:p-10 space-y-8">
        
        <!-- Poll Question Input -->
        <BaseInput 
          v-model="pollForm.question"
          label="Poll Question"
          :required="true"
          placeholder="Question title?"
        />

        <!-- Options Input Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-bold text-gray-700">
              Answer Options <span class="text-gray-400 font-normal">({{ pollForm.options.length }}/6 max)</span>
            </label>
            <span class="text-xs font-semibold text-gray-400">At least 2 required, Options must be unique.</span>
          </div>

          <!-- Options List -->
          <div class="space-y-3">
            <!-- Option Item -->
            <div 
              v-for="(option, index) in pollForm.options" 
              :key="index"
              class="flex items-center space-x-3 group"
            >

            <!-- Option Number Badge -->
              <div class="w-10 h-12 bg-black text-white font-mono rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                {{ index + 1 }}
              </div>

              <!-- Option Input -->
              <div class="relative flex-1">
                <input 
                  v-model="pollForm.options[index]" 
                  type="text"
                  :placeholder="`Option ${index + 1}`" 
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-black placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none transition-all duration-200"
                  @input="toast.dismiss()"
                />
              </div>

              <!-- Remove Option Button -->
              <button 
                @click="removeOption(index)" 
                type="button"
                :disabled="pollForm.options.length <= 2"
                class="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none focus:outline-none"
                title="Remove option"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Add Option Button -->
          <div class="pt-2">
            <button 
              v-if="pollForm.options.length < 6"
              @click="addOption" 
              type="button"
              class="w-full py-3.5 border-2 border-dashed border-gray-300 hover:border-black rounded-2xl text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50/80 transition-all duration-200 flex items-center justify-center space-x-2 group focus:outline-none"
            >
              <svg class="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Another Option</span>
            </button>
            <!-- Max Options Reached Message -->
            <p v-else class="text-center text-xs text-amber-700 font-semibold py-2.5 bg-amber-50 rounded-xl border border-amber-200">
              You have reached the maximum limit of 6 answer options.
            </p>
          </div>
        </div>

        <!-- Submit Button Section -->
        <div class="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-4">
          <!-- Cancel Button -->
          <BaseButton variant="secondary" @click="router.push('/')">
            Cancel
          </BaseButton>

          <!-- Submit Button -->
          <BaseButton 
            :disabled="isSubmitting"
            @click="handleCreatePoll"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSubmitting ? 'Publishing Poll...' : 'Publish Poll' }}</span>
            <svg v-if="!isSubmitting" class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { addNewPoll } from '../helps/api';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();
const isSubmitting = ref(false);

const pollForm = ref({
  question: '',
  options: ['', '']
});

const addOption = () => {
  if (pollForm.value.options.length < 6) {
    pollForm.value.options.push('');
    toast.dismiss();
  }
};

const removeOption = (index) => {
  if (pollForm.value.options.length > 2) {
    pollForm.value.options.splice(index, 1);
    toast.dismiss();
  }
};

const handleCreatePoll = async () => {
  toast.dismiss();

  const questionText = pollForm.value.question.trim();
  // Lọc ra các câu trả lời hợp lệ (bỏ qua khoảng trắng và ô trống)
  // Viết tường minh thay vì dùng hàm filter(Boolean) khó hiểu
  const validOptions = [];
  for (let i = 0; i < pollForm.value.options.length; i++) {
    const opt = pollForm.value.options[i].trim();
    if (opt !== '') {
      validOptions.push(opt);
    }
  }

  if (!questionText) return toast.error('Please enter a question for your poll!');
  if (validOptions.length < 2) return toast.error('Please provide at least 2 valid options (cannot be empty)!');

  isSubmitting.value = true;
  
  try {
    const response = await addNewPoll({ question: questionText, options: validOptions });
  
    if (response?.code) {
      if (response.creatorToken) {
        localStorage.setItem(`poll_token_${response.code}`, response.creatorToken);
      }
      toast.success('Poll created successfully!');
      router.push(`/poll/${response.code}`);
    } else {
      toast.error('An error occurred while creating the poll. Please try again.');
    }

  } catch (error) {
    console.error('Error creating poll:', error);
    toast.error('Unable to connect to the server. Please check your network connection or try again.');
  } finally {
    isSubmitting.value = false;
  }
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