import { APIGatewayEvent } from "aws-lambda";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler = async (event: APIGatewayEvent) => {
  const connectionId = event.requestContext.connectionId;

  if (!connectionId) throw new Error("Connection ID not found.");

  await prisma.webSocketConnection.updateMany({
    where: { connectionId },
    data: { disconnected: true },
  });

  return {
    statusCode: 200,
    body: "Disconnected.",
  };
};
