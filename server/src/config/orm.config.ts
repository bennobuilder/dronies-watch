import path from 'path';

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'random_node_project',
  synchronize: !!process.env.DB_SYNC,
  entities: [isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isCompiled ? 'dist/**/*.migration.js' : 'src/**/*.migration.ts'],
  secret: process.env.DB_ENCRYPT_SECRET,
};
