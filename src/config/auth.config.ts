interface AuthConfiguration {
  jwtSecret: string;
  jwtTTL: number;
  clientId: string;
  clientSecret: string;
  jwtIntegrationSecret: string;
}

const appConfig = (): { auth: AuthConfiguration } => ({
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtTTL: parseInt(process.env.JWT_TTL, 10),
    clientId: process.env.OAUTH_ID,
    clientSecret: process.env.OAUTH_SECRET,
    jwtIntegrationSecret: process.env.JWT_INTEGRATION_SECRET,
  },
});

export default appConfig;
