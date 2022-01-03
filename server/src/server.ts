import app from './app';
import { initSocketServer } from './socket';
import { createServer } from 'http';
import config from './config';

const PORT = config.debug.PORT;

// Assign defined port to express
app.set('port', PORT);

// Create Http server
export const server = createServer(app);

// Listen on provided port, on all network interfaces
server.listen(PORT);
server.on('error', (error) => {
  throw error;
});
server.on('listening', () => {
  console.log(`Running on Port: ${PORT}`);
});

// Init socket
export const io = initSocketServer(server);
