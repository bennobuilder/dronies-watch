import app from './app';
import { initSocketServer } from './socket';
import { PORT } from './constants';
import { createServer } from 'http';

// Assign port to express
app.set('port', PORT);

// Create Http server
export const server = createServer(app);

// Listen on provided port, on all network interfaces
server.listen(PORT);
server.on('error', (error) => {
  throw error;
});
server.on('listening', () => {
  console.log('Server Running on Port:', PORT);
});

// Init socket
export const io = initSocketServer(server);
