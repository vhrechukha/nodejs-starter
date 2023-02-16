import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserRepository } from '../resources/users/infrastructure/persistence/UserRepository';
import { BaseType } from './diTokens';
import { NestIdentityContext } from './infrastructure/identity/NestIdentityContext';
import { GlobalDBContext } from './infrastructure/persistance/GlobalDBContext';
import { TypeOrmExModule } from './typeorm-ex.module';

@Global()
@Module({
  providers: [
    {
      provide: BaseType.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
    {
      provide: BaseType.IDENTITY_CONTEXT,
      useClass: NestIdentityContext,
    },
  ],
  exports: [
    {
      provide: BaseType.GLOBAL_DB_CONTEXT,
      useClass: GlobalDBContext,
    },
    {
      provide: BaseType.IDENTITY_CONTEXT,
      useClass: NestIdentityContext,
    },
  ],
  imports: [TypeOrmExModule.forCustomRepository([UserRepository, DataSource])],
})
export class CommonModule {}
