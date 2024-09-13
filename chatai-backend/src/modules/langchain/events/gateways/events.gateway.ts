import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketEvents } from '../../enums/websocket-events.enum';
import { Observable } from 'rxjs';

@WebSocketGateway({})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(WebsocketEvents.LoadChatHistory)
  public loadHistory(@MessageBody() data: number): Promise<number> {
    return new Promise((resolve) => data);
  }
}
