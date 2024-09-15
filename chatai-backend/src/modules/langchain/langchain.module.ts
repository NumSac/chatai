import { Module } from '@nestjs/common';
import { LangchainService } from './provider/langchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatInstance } from './entities/chat-instance.entity';
import { LlmUserMessage } from './entities/llm-user-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatInstance, LlmUserMessage])],
  providers: [LangchainService],
})
export class LangchainModule {}
