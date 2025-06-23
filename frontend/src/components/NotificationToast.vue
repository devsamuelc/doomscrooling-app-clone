<template>
  <transition name="fade">
    <div v-if="visible" class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{ message: string | null }>();
const visible = ref(false);

watch(() => props.message, (msg) => {
  if (msg) {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 4000);
  }
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
