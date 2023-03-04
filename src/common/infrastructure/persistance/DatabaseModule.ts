import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

import { BaseToken } from '../../diTokens';
import { AppConfigService } from '../configuration/AppConfigService';
import { NestIdentityContext } from '../identity/NestIdentityContext';
import { GlobalDBContext } from './GlobalDBContext';
import { GlobalReadDBContext } from './GlobalReadDBContext';

const constructTypeOrmConfiguration = (appConfigService: AppConfigService): DataSourceOptions => {
  const distPath = join(__dirname, '../../../');

  return {
    type: 'postgres',
    host: appConfigService.database.HOST,
    port: appConfigService.database.PORT,
    username: appConfigService.database.USER,
    password: appConfigService.database.PASSWORD,
    database: appConfigService.database.NAME,
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    entities: [join(distPath, '**', '*Entity{.ts,.js}')],
    migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
    logging: ['error', 'migration'],
  };
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => constructTypeOrmConfiguration(appConfigService),
    }),
  ],
  providers: [
    {
      provide: BaseToken.IDENTITY_CONTEXT,
      useClass: NestIdentityContext,
    },
    {
      inject: [AppConfigService],
      provide: BaseToken.DATA_SOURCE,
      useFactory: (appConfigService: AppConfigService): Promise<DataSource> => {
        const dataSource = new DataSource(constructTypeOrmConfiguration(appConfigService));

        return dataSource.initialize();
      },
    },
    {
      provide: BaseToken.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
    {
      provide: BaseToken.GLOBAL_READ_DB_CONTEXT,
      useClass: GlobalReadDBContext,
    },
  ],
  exports: [
    BaseToken.GLOBAL_DB_CONTEXT,
    BaseToken.GLOBAL_READ_DB_CONTEXT,
    {
      provide: BaseToken.IDENTITY_CONTEXT,
      useClass: NestIdentityContext,
    },
  ],
})
export class DatabaseModule {}
