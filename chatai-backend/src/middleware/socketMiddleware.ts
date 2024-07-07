import { NextFunction } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export async function authorizationMiddleware(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const token = socket.handshake.headers["Authorization"];

  try {
    // Assuming a hypothetical `decryptAndValidateToken` function that throws if invalid
    // const user = await decryptAndValidateToken(token);
    // socket.user = user; // Optionally attach user info or other session details

    next(); // No arguments when successful
  } catch (error) {
    // Create an error with a message and possibly other properties
    const authError: ExtendedError = new Error("Authentication error");
    authError.data = { content: "Please provide a valid token!" }; // Example additional data
    next(authError); // Pass error object to `next`
  }
}
