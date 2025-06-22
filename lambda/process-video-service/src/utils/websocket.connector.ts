import { ApiGatewayManagementApi } from "aws-sdk";

export async function sendWebSocketMessage(connectionId: string, message: any) {
  const endpoint = process.env.WEBSOCKET_API_ENDPOINT as string;

  const api = new ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint,
  });

  try {
    await api
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(message),
      })
      .promise();

    console.log("Mensagem enviada ao WebSocket:", connectionId);
  } catch (err) {
    console.error("Erro ao enviar mensagem WebSocket:", err);
  }
}