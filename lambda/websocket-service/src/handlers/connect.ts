import { APIGatewayEvent } from "aws-lambda";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler = async (event: any) => {
  const connectionId = event.requestContext.connectionId;
  
  if (!connectionId) {
    return { statusCode: 400, body: "Connection ID not found." };
  }

  try {
    await prisma.webSocketConnection.create({
      data: {
        connectionId,
      },
    });

    return {
      statusCode: 200,
      body: "Connected.",
    };
  } catch (error) {
    console.error("Erro ao salvar conexão:", error);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
};
