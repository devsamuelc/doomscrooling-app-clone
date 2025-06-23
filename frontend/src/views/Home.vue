<template>
  <div>
    <header>
      <div v-if="authStore.isAuthenticated">
        {{ authStore.user?.name }}
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <button @click="authStore.showLoginModal = true">Login</button>
      </div>

      <button v-if="authStore.isAuthenticated" @click="authStore.showUploadModal = true">Upload</button>
    </header>

    <main @scroll.passive="onScroll" ref="scrollContainer">
      <VideoCard v-for="video in videos" :key="video.id" :video="video" />
      <div v-if="loading">Carregando...</div>
    </main>

    <LoginModal v-if="authStore.showLoginModal" />
    <UploadModal v-if="authStore.showUploadModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VideoCard from '../components/VideoCard.vue';
import LoginModal from '../components/LoginModal.vue';
import UploadModal from '../components/UploadModal.vue';
import { useAuthStore } from '../store/useAuthStore';
import axios from '../services/api';
import { backendApi } from '../services/api.ts'

const authStore = useAuthStore();
const videos = ref<any[]>([]);
const page = ref(1);
const loading = ref(false);

onMounted(() => {
  authStore.loadUser();
  loadVideos();
});

async function loadVideos() {
  loading.value = true;
  const { data } = await backendApi.get(`/videos?page=${page.value}`);

  console.log(data);
  
  videos.value.push(...data);
  page.value++;
  loading.value = false;
}

function onScroll(e: Event) {
  const target = e.target as HTMLElement;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 200 && !loading.value) {
    loadVideos();
  }
}

function logout() {
  authStore.logout();
}
</script>
