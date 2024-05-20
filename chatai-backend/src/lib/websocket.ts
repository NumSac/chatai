import { Server, Socket } from "socket.io";
import http from "http";
import https from "https";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"],
};

export default class WebSocket extends Server {
  private static io: WebSocket;

  private constructor(httpServer: http.Server | https.Server) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer?: any): WebSocket {
    if (!WebSocket.io) {
      WebSocket.io = new WebSocket(httpServer);
    }

    return WebSocket.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      let namespace = WebSocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}
