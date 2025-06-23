// src/composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from "vue";

export function useWebSocket(url: string) {
  const socket = ref<WebSocket | null>(null);
  const messages = ref<any[]>([]);

  function connect() {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log("WebSocket conectado");
    };

    socket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Mensagem WS recebida:", data);
        messages.value.push(data);
      } catch (err) {
        console.error("Erro ao parsear mensagem WS", err);
      }
    };

    socket.value.onclose = () => {
      console.log("WebSocket desconectado");

      socket.value = null;
    };

    socket.value.onerror = (err) => {
      console.error("Erro WebSocket:", err);
    };
  }

  function disconnect() {
    socket.value?.close();
  }

  function send(data: any) {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(data));
    } else {
      console.warn(
        "WebSocket não está aberto. Não foi possível enviar mensagem."
      );
    }
  }

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    disconnect();
  });

  return { socket, messages, send };
}
