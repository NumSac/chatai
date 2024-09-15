import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketEvents } from './enums/websocket-events.enum';
import { Observable } from 'rxjs';

@WebSocketGateway(8001, { cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage(WebsocketEvents.LoadChatHistory)
  public async loadHistory(@MessageBody() data: number): Promise<number> {
    return new Promise((resolve) => 1);
  }

  @SubscribeMessage(WebsocketEvents.ChatMessageReq)
  public handleMessageRequest(@MessageBody() data: string) {
    console.log(data);
  }
}
