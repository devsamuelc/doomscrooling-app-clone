let socket: WebSocket | null = null;

export function connectWebSocket(token: string) {
  socket = new WebSocket(`wss://seu-backend.com/ws?token=${token}`);

  socket.onopen = () => {
    console.log("WebSocket conectado");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("Mensagem recebida:", data);
  };

  socket.onclose = () => {
    console.log("WebSocket desconectado");
  };

  socket.onerror = (err) => {
    console.error("Erro no WebSocket:", err);
  };
}
