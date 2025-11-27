import { verifyToken } from "../utils/jwt.js";

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Authentication error: No token"));
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return next(new Error("Authentication error: Invalid token"));
  }

  socket.user = decoded; // attach user data to socket
  next();
};
