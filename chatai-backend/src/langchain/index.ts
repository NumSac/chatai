import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export class LangchainEngine {
  private readonly _model: ChatOpenAI;
  private readonly _chain: ConversationChain;
  // Memory is initialized seperately
  public _memory: BufferMemory;

  constructor() {
    this._model = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    this._chain = new ConversationChain({
      llm: this._model,
      memory: this._memory,
    });
  }

  async invokeMessage(sessionId: string, message: string) {
    return await this._chain.call({ input: message });
  }

  private async loadPrompts() {
    const chatPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.",
      ],
    ]);
  }
}
