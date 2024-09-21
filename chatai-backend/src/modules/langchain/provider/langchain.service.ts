import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Stream } from 'openai/streaming';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { IChatRequest, IChatResponse } from '../interfaces/chat.interface';

@Injectable()
export class LangchainService {
  private openAiService: OpenAI;

  constructor(
    private configService: ConfigService,
    private eventEmitterService: EventEmitter2,
  ) {
    // Initialize OpenAI LLM
    const openaiApiKey = process.env.OPENAI_API_KEY;

    this.openAiService = new OpenAI({
      apiKey: openaiApiKey,
    });
  }

  public async getMessagesData(
    request: IChatRequest,
    userId: string,
  ): Promise<OpenAI.ChatCompletion | Stream<OpenAI.ChatCompletionChunk>> {
    const response = await this.openAiService.chat.completions.create({
      model: this.configService.get('OPENAI_API_MODEL'),
      messages: request.messages,
      stream: request.stream || false,
    });

    if (request.stream) {
      for await (const chunk of response as Stream<OpenAI.ChatCompletionChunk>) {
        // emit every message from each response
        this.eventEmitterService.emit(`streamMessage-${userId}`, chunk);
      }
    }
    return response;
  }

  public getStreamMessages(
    userId: string,
  ): Observable<OpenAI.ChatCompletionChunk> {
    return new Observable((subscribe) => {
      const listener = (message: OpenAI.ChatCompletionChunk) => {
        if (message.choices[0].finish_reason === 'stop') {
          subscribe.next(message);
          return subscribe.complete();
        }
        subscribe.next(message);
      };

      // Listen for user-specific events
      this.eventEmitterService.on(`streamMessage-${userId}`, listener);

      return () =>
        this.eventEmitterService.off(`streamMessage-${userId}`, listener);
    });
  }

  getChatOpenaiResponse(message: OpenAI.ChatCompletion): IChatResponse {
    return {
      success: true,
      message: message?.choices?.length && message?.choices[0],
    };
  }
}
