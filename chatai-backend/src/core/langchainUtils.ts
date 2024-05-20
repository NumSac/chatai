import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";

export const loadNewLangchainInstance = (
  temperature: number
): ChatOpenAI<ChatOpenAICallOptions> =>
  new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY, temperature });

export const createBufferMemory = (): BufferMemory =>
  new BufferMemory({
    returnMessages: false,
    inputKey: "input",
    outputKey: "output",
    memoryKey: "history",
  });

  