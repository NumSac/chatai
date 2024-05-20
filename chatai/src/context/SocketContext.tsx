"use client";

import { getToken } from "next-auth/jwt";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Socket, io } from "socket.io-client";
import Error from "next/error";

// Define the type for the context value
interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: ReactNode; jwt: string }> = ({
  children,
  jwt,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create the socket instance with endpoint and options
    const newSocket = io("http://localhost:8001", {
      extraHeaders: {
        authorization: `bearer ${jwt.toString()}`,
      },
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
