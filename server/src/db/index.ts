import { Connection, createConnection, getConnection } from 'typeorm';
import config from '../config';

const orm = config.orm;

export const { connectDB, connectedToDB } = (() => {
  let connectedToDB = false;

  async function connectDB(callback?: () => void) {
    let connection: Connection | undefined;

    try {
      connection = getConnection();
    } catch (err) {
      // do nothing
    }

    try {
      if (connection) {
        if (!connection.isConnected) {
          await connection.connect();
        }
      } else {
        await createConnection({
          type: orm.type as any,
          host: orm.host,
          port: orm.port,
          username: orm.username,
          password: orm.password,
          database: orm.database,
          synchronize: orm.synchronize,
          entities: orm.entities,
          migrations: orm.migrations,
        });
      }

      if (callback != null) callback();
      connectedToDB = true;

      console.log(`Successfully connected to the database: '${orm.database}'.`);
    } catch (err) {
      console.error(
        `Error while connection to the database: '${orm.database}'!`,
      );
      throw err;
    }
  }

  return { connectDB, connectedToDB };
})();
