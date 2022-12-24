import { parse } from 'pg-connection-string';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

enum EnvBooleans {
  TRUE = '1',
  FALSE = '0',
}

const pgConfig = (): { pg: PostgresConnectionOptions } => {
  const pgURL = parse(process.env.DATABASE_URL || '');

  return {
    pg: {
      type: 'postgres',
      host: pgURL.host || process.env.PG_URL,
      port: parseInt(pgURL.port || process.env.PG_PORT || '5432', 10),
      username: pgURL.user || process.env.PG_USER,
      password: pgURL.password || process.env.PG_PASSWORD,
      database: pgURL.database || process.env.PG_DB_NAME,
      entities: [__dirname + '/../**/*Entity{.ts,.js}'],
      migrations: [__dirname + '/../infrastructure/db/migrations/**/*{.ts,.js}'],
      synchronize: process.env.PG_SYNCHRONIZE === EnvBooleans.TRUE,
      migrationsRun: true,
      logging: ['error', 'migration'],
      cli: {
        migrationsDir: 'src/infrastructure/db/migrations',
      },
    },
  };
};

export default pgConfig;
