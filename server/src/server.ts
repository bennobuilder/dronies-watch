import { initSocketServer } from './socket';
import { createServer } from 'http';
import config from './config';
import { connectDB } from './db';

export const { server, io } = (() => {
  const PORT = config.debug.port;

  const server = createServer();
  const io = initSocketServer(server);

  connectDB(async () => {
    // Import the express app after the DB has been connected
    // to not try to connect to the Repositories
    // accessed in the routes before the connection to the database has been established
    // https://github.com/typeorm/typeorm/issues/5362
    const { default: app } = await import('./app');

    // Assign express as request listener to the server,
    // after the db has been connected
    app.set('port', PORT);
    server.on('request', app);
  });

  // Listen on provided port, on all network interfaces
  server.listen(PORT);
  server.on('error', (error) => {
    throw error;
  });
  server.on('listening', () => {
    console.log(`Running on Port: ${PORT}`);
  });

  return { server, io };
})();

export default server;
