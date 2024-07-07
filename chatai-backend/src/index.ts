import http from "http";
import express, { Request, Response } from "express";
import WebSocket from "./lib/websocket";
import { onWebSocketConnect } from "./core/socketEventHandler";
import { authorizationMiddleware } from "./middleware/socketMiddleware";
import dotenv from "dotenv";

dotenv.config();

export class SocketServer {
  // Separate ports for HTTP and HTTPS
  private readonly HTTP_PORT = process.env.HTTP_PORT || 8001;
  private readonly HTTPS_PORT = process.env.HTTPS_PORT || 8443;
  private httpServer!: http.Server;
  private app!: express.Application;
  private io!: WebSocket;

  constructor() {
    this.createApp();
    this.createServer();
    this.createSockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.get("api/status", (req: Request, res: Response) => {
      // Return a simple JSON indicating the server status
      res.json({
        status: "up",
        uptime: process.uptime(),
        timestamp: new Date(),
        httpPort: this.HTTP_PORT,
        httpsPort: this.HTTPS_PORT,
        environment: process.env.NODE_ENV || "development",
      });
    });
  }

  private createServer(): void {
    this.httpServer = http.createServer(this.app);
    // this.httpsServer = https.createServer(this.app);
    this.httpServer.setTimeout(1200000);
  }

  private async createSockets() {
    this.io = WebSocket.getInstance(this.httpServer);

    // Setup middleware
    this.io.use(authorizationMiddleware);
    this.io.listen(this.httpServer);
  }

  private listen() {
    if (
      this.httpServer == undefined ||
      this.io == undefined ||
      this.app == undefined
    )
      throw new Error();

    this.httpServer.listen(this.HTTP_PORT, () => {
      console.log("[!] Server started on port %s", this.HTTP_PORT);
    });

    this.io.on("connect", onWebSocketConnect);
  }

  public getApp(): express.Application {
    return this.app;
  }
}

let app = new SocketServer().getApp();

export { app };
