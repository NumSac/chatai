import { Socket } from "socket.io";
import logger from "../config/pinoLogger";
import { CustomChatMessageHistory } from "../langchain/chatHistory";

export const onWebSocketConnect = (socket: Socket) => {
  console.log(`${socket.id}`);

  const chatHistory = new CustomChatMessageHistory({ sessionId: socket.id });

  socket.on("prompt_input", async (msg: string) => {
    await chatHistory.addMessage();

    if (true) {
      socket.emit("prompt_output", "hello");
    }
  });

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
};
