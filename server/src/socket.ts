import { Server } from 'socket.io';
import * as http from 'http';

export const socketServer = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`Connected successfully to the socket: '${socket.id}'`);

    socket.on('disconnect', (reason) => {
      console.log(`Disconnected socket: '${socket.id}'`, reason);
    });
  });

  return io;
};
