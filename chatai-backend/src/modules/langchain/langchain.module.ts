import { Module } from '@nestjs/common';
import { LangchainService } from './provider/langchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatInstance } from './entities/chat-instance.entity';
import { LlmUserMessage } from './entities/llm-user-message.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LangchainController } from './langchain.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatInstance, LlmUserMessage]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [LangchainController],
  providers: [LangchainService],
})
export class LangchainModule {}
