<template>
  <aside
    v-if="isOpen"
    class="fixed top-0 right-0 w-80 h-full bg-white border-l shadow-lg z-50 flex flex-col"
  >
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-lg font-semibold">{{ $t('commentsSidebar.title') }}</h2>
      <button @click="$emit('close')" class="text-gray-500 hover:text-red-500" aria-label="Fechar comentários">
        ✕
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-gray-100 p-3 rounded shadow-sm"
      >
        <p class="text-sm text-gray-800">{{ comment.content }}</p>
        <p class="text-xs text-gray-500 mt-1">
          {{ $t('videoCard.by') }} {{ comment.user.name }} • {{ formatDate(comment.createdAt) }}
        </p>
      </div>
    </div>

    <div
      v-if="authStore.isAuthenticated"
      class="p-4 border-t flex flex-col gap-2"
    >
      <textarea
        v-model="newComment"
        class="w-full border rounded px-3 py-2 text-sm"
        rows="3"
        :placeholder="$t('commentsSidebar.placeholder')"
      ></textarea>
      <button
        @click="submitComment"
        :disabled="!newComment.trim()"
        class="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
      >
        {{ $t('commentsSidebar.send') }}
      </button>
    </div>

    <div v-else class="p-4 text-sm text-center text-gray-500 border-t">
      {{ $t('commentsSidebar.loginToComment') }}
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';

const props = defineProps<{
  isOpen: boolean;
  comments: {
    id: string;
    content: string;
    createdAt: string;
    user: { id: string; name: string };
  }[];
  videoId: string;
}>();

const emit = defineEmits(['close']);

const newComment = ref('');
const authStore = useAuthStore();

const comments = ref([...props.comments]);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('pt-BR');
}

async function submitComment() {
  const content = newComment.value.trim();
  if (!content || !authStore.user) return;

  const optimisticComment = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString(),
    user: {
      id: authStore.user.id,
      name: authStore.user.name,
    },
  };

  comments.value.unshift(optimisticComment);

  newComment.value = '';

  try {
    await api.post('/comments', {
      videoId: props.videoId,
      content,
    });
  } catch (err) {
    console.error('Erro ao enviar comentário:', err);
  }
}
</script>
