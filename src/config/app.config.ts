import type { Environment } from '../app/app.module';

export interface ApplicationConfiguration {
  env: Environment;
  port: number;
  host: string;
  url: string;
}

const appConfig = (): { app: ApplicationConfiguration } => ({
  app: {
    env: process.env.ENV as Environment,
    port: parseInt(process.env.APP_PORT, 10),
    host: process.env.APP_HOST,
    url: process.env.APP_URL,
  },
});

export default appConfig;
