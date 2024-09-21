import {
  Controller,
  Sse,
  MessageEvent,
  Body,
  HttpCode,
  Post,
} from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import OpenAI from 'openai';
import { LangchainService } from './provider/langchain.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type-enum';
import { IChatRequest, IChatResponse } from './interfaces/chat.interface';

@Controller('ai')
export class LangchainController {
  constructor(private readonly langchainService: LangchainService) {}

  @Post('/chat')
  @HttpCode(200)
  async getChatOpenai(@Body() request: IChatRequest): Promise<IChatResponse> {
    const getMessages = (await this.langchainService.getMessagesData(
      request,
      '2',
    )) as OpenAI.ChatCompletion;
    return this.langchainService.getChatOpenaiResponse(getMessages);
  }

  @Sse('chat-streams')
  getChatStreamsOpenai(): Observable<MessageEvent> {
    return this.langchainService.getStreamMessages('2').pipe(
      map(
        (message: OpenAI.ChatCompletionChunk): MessageEvent => ({
          id: message.id,
          type: message.object,
          data: message.choices[0],
        }),
      ),
    );
  }
}
