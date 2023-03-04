import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

import { AppConfigService } from '../configuration/AppConfigService';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const distPath = join(__dirname, '../../../');

    return {
      type: 'mssql',
      host: this.appConfigService.database.HOST,
      port: this.appConfigService.database.PORT,
      username: this.appConfigService.database.USER,
      password: this.appConfigService.database.PASSWORD,
      database: this.appConfigService.database.NAME,
      synchronize: false,
      migrationsRun: false,
      dropSchema: false,
      entities: [join(distPath, '**', '*Entity{.ts,.js}')],
      migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
      logging: ['error', 'migration'],
      options: {
        encrypt: true,
        packetSize: 32768,
      },
    };
  }
}
