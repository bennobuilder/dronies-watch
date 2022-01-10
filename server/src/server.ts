import { initSocketServer } from './socket';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import config from './config';
import { connectDB } from './db';

export const { httpServer, io } = (() => {
  const PORT = config.app.port;

  const httpServer = createHttpServer();
  const httpsServer = createHttpsServer(); // TODO Required to use 'https'?
  const io = initSocketServer(httpServer);

  connectDB(async () => {
    // Import the express app after the DB has been connected
    // to not try to connect to the Repositories
    // accessed in the routes before the connection to the database has been established
    // https://github.com/typeorm/typeorm/issues/5362
    const { default: app } = await import('./app');

    // Assign express as request listener to the server,
    // after the db has been connected
    app.set('port', PORT);
    httpServer.on('request', app);
  });

  // Listen on provided port, on all network interfaces
  httpServer.listen(PORT);
  httpServer.on('error', (error) => {
    throw error;
  });
  httpServer.on('listening', () => {
    console.log(`Running on Port: ${PORT}`);
  });

  return { httpServer, io };
})();

export default httpServer;
