import * as dotenv from 'dotenv';
import * as path from 'path';

import pgConfig from '../config/pg.config';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const postgresConfig = pgConfig().pg;

export = {
  type: postgresConfig.type,
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  synchronize: postgresConfig.synchronize,
  logging: postgresConfig.logging,
  entities: postgresConfig.entities,
  migrations: postgresConfig.migrations,
};
