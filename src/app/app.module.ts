import 'reflect-metadata';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { CommonModule } from '../common/common.module';
import { BaseType } from '../common/diTokens';
import { GlobalDBContext } from '../common/infrastructure/persistance/GlobalDBContext';
import appConfig from '../config/app.config';
import authConfig from '../config/auth.config';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UsersModule } from '../resources/users/users.module';
import pgConfig from './../config/pg.config';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

enum Environment {
  TEST = 'test',
  LOCAL = 'local',
  DEVELOPMENT = 'dev',
  STAGING = 'stage',
  PRODUCTION = 'prod',
}

const ENV = process.env.ENV as Environment;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `${process.env.PWD}/.env.${ENV}`,
      isGlobal: true,
      load: [appConfig, authConfig, pgConfig],
      expandVariables: true,
    }),
    CommonModule,
    InfrastructureModule,
    UsersModule,
  ],
  controllers: [],
  exports: [],

  // Registering deps into IoC container within current module
  // Creates an entry point to the new Dependency branch
  // Importing such module as a global one detaches it from Dep tree
  // and creates new seedling.
  providers: [
    {
      provide: BaseType.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
