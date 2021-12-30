import app from './app';
import * as http from 'http';
import { socketServer } from './socket';
import { PORT } from './constants';

// Assign port
app.set('port', PORT);

// Create Http server
export const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT} [http://localhost:${PORT}/]`);
});

// Init socket.io
export const io = socketServer(server);
