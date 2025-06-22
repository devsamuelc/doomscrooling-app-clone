import { SQSEvent } from "aws-lambda";
import { PrismaClient, VideoStatus } from "@prisma/client";
import { sendWebSocketMessage } from "./utils/websocket.connector";

const prisma = new PrismaClient();

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const { id: videoId } = JSON.parse(record.body);

    if (!videoId) {
      console.warn("Mensagem SQS sem videoId:", record.body);

      continue;
    }

    const video = await prisma.video.findUnique({ where: { id: videoId } });

    if (!video) {
      console.warn(`Vídeo não encontrado para ID ${videoId}`);
      continue;
    }

    if (
      video.status === VideoStatus.PROCESSING ||
      video.status === VideoStatus.AVAILABLE
    ) {
      console.info(`Vídeo ${videoId} já está sendo ou foi processado.`);
      continue;
    }

    await prisma.video.update({
      where: { id: videoId },
      data: {
        status: VideoStatus.PROCESSING,
      },
    });

    try {
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: {
          processedAt: new Date(),
          status: VideoStatus.AVAILABLE,
        },
      });

      const socketConnections = await prisma.webSocketConnection.findMany({
        where: { disconnected: false },
      });

      if (socketConnections.length > 0) {
        await Promise.all(
          socketConnections.map((conn) =>
            sendWebSocketMessage(conn.connectionId, {
              type: "VIDEO_AVAILABLE",
              videoId: updatedVideo.id,
              title: updatedVideo.title,
            })
          )
        );
      }
    } catch (error) {
      console.error(`Erro ao processar vídeo ${videoId}:`, error);

      await prisma.video.update({
        where: { id: videoId },
        data: {
          status: VideoStatus.FAILED,
        },
      });
    }
  }

  await prisma.$disconnect();
};
