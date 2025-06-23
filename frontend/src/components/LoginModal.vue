<template>
  <div
    class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div class="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg relative">
      <button
        @click="authStore.showLoginModal = false"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Fechar modal"
      >
        ✖
      </button>

      <h2 class="text-xl font-bold mb-4 text-center">{{ $t('loginModal.title') }}</h2>

      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('loginModal.emailLabel') }}</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('loginModal.passwordLabel') }}</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
        >
          {{ $t('loginModal.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/useAuthStore';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

async function submit() {
  try {
    await authStore.login(email.value, password.value);
  } catch (err) {
    alert('Erro ao fazer login.');
    console.error(err);
  }
}
</script>
