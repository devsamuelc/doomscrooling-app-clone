<template>
  <div id="app" class="min-h-screen bg-gray-100 text-gray-900">
    <NotificationToast :message="notificationMessage" />
    <header
      class="fixed top-0 left-0 right-0 z-20 bg-white shadow flex justify-between items-center px-6 py-4"
      style="height: 80px;"
    >
      <h1 class="text-4xl font-extrabold text-center text-red-700 drop-shadow-lg">
        Doomscrolling of Doom
      </h1>

      <div class="flex items-center gap-4">
        <span v-if="authStore.isAuthenticated" class="font-medium">
          {{ authStore.user?.name }}
        </span>

        <button
          v-if="authStore.isAuthenticated"
          @click="authStore.logout"
          class="text-sm text-red-600 hover:underline"
        >
          {{ $t('logout') }}
        </button>

        <button
          v-else
          @click="authStore.showLoginModal = true"
          class="text-sm text-blue-600 hover:underline"
        >
          {{ $t('login') }}
        </button>

        <button
          v-if="authStore.isAuthenticated"
          @click="authStore.showUploadModal = true"
          class="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          {{ $t('upload') }}
        </button>
      </div>
    </header>

    <main class="pt-[100px] pb-8 flex flex-col items-center">
      <div class="w-full max-w-xl px-4">
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
          class="mb-6"
        />

        <div v-if="loading" class="text-center text-gray-500 mt-4">
          {{ $t('loading') }}...
        </div>
      </div>
    </main>

    <LoginModal v-if="authStore.showLoginModal" />
    <UploadModal v-if="authStore.showUploadModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api from './services/api';
import { useAuthStore } from './store/useAuthStore';
import VideoCard from './components/VideoCard.vue';
import LoginModal from './components/LoginModal.vue';
import UploadModal from './components/UploadModal.vue';
import { useI18n } from 'vue-i18n';
import { useWebSocket } from './composables/useWebSocket';
import NotificationToast from './components/NotificationToast.vue';

const authStore = useAuthStore();

const { locale } = useI18n();

locale.value = 'en';

const wsUrl = import.meta.env.VITE_WEBSOCKET_API_ENDPOINT;
const { messages } = useWebSocket(wsUrl);

const notificationMessage = ref<string | null>(null);

watch(messages, (msgs) => {
  if (msgs.length === 0) return;
  const lastMsg = msgs[msgs.length - 1];
  if (lastMsg.type === 'VIDEO_AVAILABLE') {
    notificationMessage.value = `Vídeo disponível: ${lastMsg.title}`;
    // Atualize a lista de vídeos aqui se quiser
  }
});
interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  likeCount: number;
  userId: string;
}

const videos = ref<Video[]>([]);
const loading = ref(false);

onMounted(async () => {
  authStore.loadUser();

  await loadVideos();
});

async function loadVideos() {
  try {
    loading.value = true;

    const response = await api.get('/videos');

    videos.value = response.data.data;
  } catch (err) {
    console.error('Erro ao buscar vídeos:', err);
  } finally {
    loading.value = false;
  }
}
</script>
