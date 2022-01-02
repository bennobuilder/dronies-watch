import app from './app';
import { initSocketServer } from './socket';
import { createServer } from 'http';
import debugConfig from './config/debug.config';

// Assign port to express
app.set('port', debugConfig.PORT);

// Create Http server
export const server = createServer(app);

// Listen on provided port, on all network interfaces
server.listen(debugConfig.PORT);
server.on('error', (error) => {
  throw error;
});
server.on('listening', () => {
  console.log('Server Running on Port:', debugConfig.PORT);
});

// Init socket
export const io = initSocketServer(server);
