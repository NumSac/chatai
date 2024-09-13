import { ChatOpenAI, OpenAI } from '@langchain/openai';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';

@Injectable()
export class LangchainChatService {
  private conversation: ConversationChain;

  constructor() {
    // Inject Llm Message Repository

    // Initialize OpenAI LLM
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const llm = new OpenAI({
      openAIApiKey: openaiApiKey,
      temperature: 0.9,
    });

    // Initialize memory (using buffer memory for simplicity)
    const memory = new BufferMemory();

    // Create conversation chain
    this.conversation = new ConversationChain({
      llm,
      memory,
    });
  }

  public async getChatResponse(input: string): Promise<string> {
    // Get the response from the LangChain conversation
    const response = await this.conversation.call({ input });
    return response.response;
  }
}
