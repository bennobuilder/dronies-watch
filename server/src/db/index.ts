import { Connection, createConnection, getConnection } from 'typeorm';
import config from '../config';

const orm = config.orm;

export async function connectDB() {
  let connection: Connection | undefined;

  try {
    connection = getConnection();
  } catch (err) {
    console.log(err);
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
      });
    }
    console.log(`Successfully connected to the database: '${orm.database}'.`);
  } catch (err) {
    console.error(`Error while connection to the database: '${orm.database}'!`);
    throw err;
  }
}
