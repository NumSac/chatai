import { Socket } from "socket.io";
import WebSocket from "../lib/websocket";
import LangchainEngineCore from "./langchainCore";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { basicFunctionSchema } from "./schemas/prompts";
import { PromptTemplate } from "@langchain/core/prompts";
import LangchainInstance from "./langchainCore";

const outputParser = new StringOutputParser();

const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
);

export const onWebSocketConnect = (socket: Socket) => {
  console.log(`${socket.id}`);

  const core = new LangchainInstance();

  const chain = RunnableSequence.from([
    promptTemplate,
    core.openAiChatModel,
    outputParser,
  ]);

  socket.on("prompt_input", async (msg: string) => {
    const result = await chain.invoke({ topic: msg });

    console.log(result);

    if (result) {
      socket.emit("prompt_output", result);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};
