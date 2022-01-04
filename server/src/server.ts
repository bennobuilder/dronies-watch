import app from './app';
import { initSocketServer } from './socket';
import { createServer } from 'http';
import config from './config';
import { connectDB } from './db';

export const { server, io } = (() => {
  const PORT = config.debug.port;

  // Assign defined port to express
  app.set('port', PORT);

  // Connect to db
  connectDB();

  // Create Http server
  const server = createServer(app);

  // Listen on provided port, on all network interfaces
  server.listen(PORT);
  server.on('error', (error) => {
    throw error;
  });
  server.on('listening', () => {
    console.log(`Running on Port: ${PORT}`);
  });

  // Init socket
  const io = initSocketServer(server);

  return { server, io };
})();

export default server;
