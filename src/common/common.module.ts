import { Global, Module } from '@nestjs/common';

import { BaseType } from './diTokens';
import { NestIdentityContext } from './infrastructure/identity/NestIdentityContext';
import { GlobalDBContext } from './infrastructure/persistance/GlobalDBContext';

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
})
export class CommonModule {}
