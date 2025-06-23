<template>
  <div class="relative">
    <div
      class="max-w-xl mx-auto mb-8 bg-white rounded-xl shadow-md overflow-hidden"
    >
      <video
        class="w-full h-auto rounded-t-xl"
        :src="video.url"
        autoplay
        muted
        loop
        playsinline
        controls
      ></video>

      <div
        class="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="mb-3 sm:mb-0">
          <h3 class="text-lg font-semibold text-gray-900">{{ video.title }}</h3>
          <p class="text-sm text-gray-600 mt-1">
            {{ $t('videoCard.by') }} {{ video.author?.name || $t('videoCard.anonymous') }}
          </p>
        </div>

        <div class="flex gap-2">
          <button
            @click="likeVideo"
            :disabled="liked || !authStore.isAuthenticated"
            class="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            {{ $t('videoCard.like') }} <span>{{ likes }}</span>
          </button>

          <button
            @click="showComments = !showComments"
            class="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
          >
            {{ showComments ? $t('videoCard.close') : $t('videoCard.comments') }}
          </button>
        </div>
      </div>
    </div>

    <CommentsSidebar
      :is-open="showComments"
      :comments="video.comments"
      :video-id="video.id"
      @close="showComments = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import CommentsSidebar from './CommentsSidebar.vue';

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  likeCount: number;
  userId: string;
  comments: Comment[];
  author?: {
    id: string;
    name: string;
  };
}

const props = defineProps<{ video: Video }>();

const likes = ref(props.video.likeCount);
const liked = ref(false);
const showComments = ref(false);

const authStore = useAuthStore();

async function likeVideo() {
  if (!authStore.isAuthenticated || liked.value) return;

  liked.value = true;
  likes.value++;

  try {
    await api.post(`/videos/${props.video.id}/like`);
  } catch (err) {
    liked.value = false;
    likes.value--;
    console.error('Erro ao dar like:', err);
  }
}
</script>
