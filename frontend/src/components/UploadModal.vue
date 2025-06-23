<template>
  <div
    class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
      <button
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Fechar modal"
      >
        ✖
      </button>

      <h2 class="text-xl font-bold mb-4 text-center">{{ $t('uploadModal.title') }}</h2>

      <div v-if="step === 1">
        <form @submit.prevent="uploadFile">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('uploadModal.step1.label') }}</label>
            <input
              type="file"
              accept="video/mp4"
              @change="handleFileChange"
              required
              class="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <button
            type="submit"
            :disabled="!file || loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
          >
            {{ loading ? $t('uploadModal.step1.sending') : $t('uploadModal.step1.submit') }}
          </button>
        </form>
      </div>

      <div v-else>
        <form @submit.prevent="submitVideo">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('uploadModal.step2.titleLabel') }}</label>
            <input
              v-model="title"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('uploadModal.step2.descriptionLabel') }}</label>
            <textarea
              v-model="description"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input type="hidden" :value="url" />

          <button
            type="submit"
            :disabled="!title || !description || loading"
            class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition"
          >
            {{ loading ? $t('uploadModal.step2.saving') : $t('uploadModal.step2.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const authStore = useAuthStore();

const step = ref(1);
const file = ref<File | null>(null);
const loading = ref(false);
const url = ref('');
const title = ref('');
const description = ref('');
const videoId = ref('');

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    const selected = target.files[0];
    if (selected.size > 10 * 1024 * 1024) {
      alert('O vídeo deve ter no máximo 10MB.');
      return;
    }
    file.value = selected;
  }
}

async function uploadFile() {
  if (!file.value) return;
  loading.value = true;

  try {
    const id = uuidv4();
    videoId.value = id;

    const formData = new FormData();
    formData.append('file', file.value);

    const { data } = await api.post(`/videos/${id}/upload`, formData);

    url.value = data.url;
    step.value = 2;
  } catch (err) {
    console.error('Erro ao enviar vídeo:', err);
    alert('Falha ao enviar o vídeo.');
  } finally {
    loading.value = false;
  }
}

async function submitVideo() {
  if (!url.value || !title.value || !description.value) return;

  loading.value = true;

  try {
    await api.post('/videos', {
      id: videoId.value,
      title: title.value,
      description: description.value,
      url: url.value,
    });

    alert('Vídeo salvo com sucesso!');
    closeModal();
  } catch (err) {
    console.error('Erro ao salvar vídeo:', err);
    alert('Erro ao salvar o vídeo.');
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  step.value = 1;
  file.value = null;
  title.value = '';
  description.value = '';
  url.value = '';
  videoId.value = '';
  authStore.showUploadModal = false;
}
</script>
