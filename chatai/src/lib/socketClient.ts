import { Socket, io } from "socket.io-client";

export default function socketClient() {
  return io("http://localhost:8001", {
    path: "/",
    addTrailingSlash: false,
  });
}
