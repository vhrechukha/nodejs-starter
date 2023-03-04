import 'reflect-metadata';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigModule } from '../common/infrastructure/configuration/AppConfigModule';
import { DatabaseModule } from '../common/infrastructure/persistance/DatabaseModule';
import appConfig from '../config/app.config';
import authConfig from '../config/auth.config';
import pgConfig from '../config/pg.config';
import { UsersModule } from '../resources/users/users.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

export enum Environment {
  TEST = 'test',
  LOCAL = 'local',
  DEVELOPMENT = 'dev',
  STAGING = 'stage',
  PRODUCTION = 'prod',
}

const ENV = process.env.ENV as Environment;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.PWD}/.env.${ENV}`,
      isGlobal: true,
      load: [appConfig, authConfig, pgConfig],
      expandVariables: true,
    }),
    // CommonModule,
    UsersModule,
    DatabaseModule,
    AppConfigModule,
  ],
  controllers: [],
  exports: [],

  // Registering deps into IoC container within current module
  // Creates an entry point to the new Dependency branch
  // Importing such module as a global one detaches it from Dep tree
  // and creates new seedling.
  providers: [
    // CommonModule,
    DatabaseModule,
    AppConfigModule,
    // {
    //   provide: BaseToken.DATA_SOURCE,
    //   useClass: DataSource,
    // },
    // {
    //   provide: BaseToken.GLOBAL_DB_CONTEXT,
    //   useClass: GlobalDBContext,
    // },
    // {
    //   provide: BaseToken.GLOBAL_READ_DB_CONTEXT,
    //   useClass: GlobalReadDBContext,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
