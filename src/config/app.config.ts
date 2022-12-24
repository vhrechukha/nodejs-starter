interface ApplicationConfiguration {
  port: number;
  host: string;
  url: string;
}

const appConfig = (): { app: ApplicationConfiguration } => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10),
    host: process.env.APP_HOST,
    url: process.env.APP_URL,
  },
});

export default appConfig;
