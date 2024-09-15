import { ChatOpenAI, OpenAI } from '@langchain/openai';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { LlmUserMessage } from '../entities/llm-user-message.entity';
import { read } from 'fs';
import { Repository } from 'typeorm';
import { ChatInstance } from '../entities/chat-instance.entity';
import { BaseMessage } from '@langchain/core/messages';
import { Observable } from 'rxjs';

@Injectable()
export class LangchainService {
  private conversation: ConversationChain;

  constructor(
    @InjectRepository(ChatInstance)
    private readonly chatInstanceRepository: Repository<ChatInstance>,
  ) {
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
}
