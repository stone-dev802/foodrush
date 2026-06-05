import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // À restreindre en production
    }
  });
  return io;
};

export const getIO = () => io;