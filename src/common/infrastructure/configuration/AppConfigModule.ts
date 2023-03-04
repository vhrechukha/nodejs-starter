import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './AppConfigService';
import { appConfigValidationSchema } from './appConfigValidationSchema';

export enum Environment {
  TEST = 'test',
  LOCAL = 'local',
  DEVELOPMENT = 'dev',
  STAGING = 'stage',
  PRODUCTION = 'prod',
}

const ENV = process.env.ENV as Environment;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: appConfigValidationSchema,
      envFilePath: `.env.${ENV}`,
      isGlobal: true,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
