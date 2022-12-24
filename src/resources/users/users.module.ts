import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommandHandlerType, QueryHandlerType, ServiceType } from '../../common/diTokens';
import { AuthorizeUserCommandHandler } from './application/commands/authorizeUser/AuthorizeUserCommandHandler';
import { DeactivateUserCommandHandler } from './application/commands/deactivateUser/DeactivateUserCommandHandler';
import { GetAuthorizationLinkQueryHandler } from './application/queries/getAuthorizationLink/GetAuthorizationLinkQueryHandler';
import { AuthController } from './infrastructure/api/AuthController';
import { GoogleOAuth2Service } from './infrastructure/services/authService/GoogleOAuth2Service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.OAUTH_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Commands
    {
      provide: CommandHandlerType.DEACTIVATE_USER,
      useClass: DeactivateUserCommandHandler,
    },
    {
      provide: CommandHandlerType.AUTHORIZE_USER,
      useClass: AuthorizeUserCommandHandler,
    },

    // Queries
    {
      provide: QueryHandlerType.AUTHORIZATION_LINK,
      useClass: GetAuthorizationLinkQueryHandler,
    },

    // Services
    {
      provide: ServiceType.AUTH_SERVICE,
      useClass: GoogleOAuth2Service,
    },
  ],
})
export class UsersModule {}
