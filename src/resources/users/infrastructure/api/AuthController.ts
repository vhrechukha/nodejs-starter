import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommandHandlerType, QueryHandlerType } from '../../../../common/diTokens';
import { JwtAuthGuard } from '../../../../common/infrastructure/api/guards/jwt-auth.guard';
import { RequestExtended } from '../../../../common/infrastructure/api/RequestExtended';
import { IAuthorizeUserCommandHandler } from '../../application/commands/authorizeUser/IAuthorizeUserCommandHandler';
import { IDeactivateUserCommandHandler } from '../../application/commands/deactivateUser/IDeactivateUserCommandHandler';
import { IGetAuthorizationLinkQueryHandler } from '../../application/queries/getAuthorizationLink/IGetAuthorizationLinkQueryHandler';
import { AuthorizeUserRequestBody } from './authorizeUser/AuthorizeUserRequest';
import { AuthorizeUserResponse } from './authorizeUser/AuthorizeUserResponse';
import type { GetAuthorizationLinkResponse } from './getAuthorizationLink/GetAuthorizationLinkResponse';

@ApiTags('Authorization')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(
    @Inject(QueryHandlerType.AUTHORIZATION_LINK)
    private getAuthorizationLinkQueryHandler: IGetAuthorizationLinkQueryHandler,

    @Inject(CommandHandlerType.AUTHORIZE_USER) private authorizeUserCommandHandler: IAuthorizeUserCommandHandler,

    @Inject(CommandHandlerType.DEACTIVATE_USER) private deactivateUserCommandHandler: IDeactivateUserCommandHandler
  ) {}

  @ApiOperation({
    description: `Logs out user and deactivates it in the system.`,
  })
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: RequestExtended): Promise<void> {
    await this.deactivateUserCommandHandler.execute({ userId: req.user.id });
  }

  @ApiOperation({
    description: `Should be called by API consumers (Web or Mobile App) to exchange Google OAuth token for JWT token,
    assuming that Google OAuth flow has already happened in browser.
    This is a part of authorization flow for any FE application that want to use this API.`,
  })
  @ApiOkResponse({ type: AuthorizeUserResponse })
  @Post('token')
  async authorizeUser(@Body() body: AuthorizeUserRequestBody): Promise<AuthorizeUserResponse> {
    const result = await this.authorizeUserCommandHandler.execute({
      oauthToken: body.accessToken,
    });

    return {
      accessToken: result.accessToken,
      user: {
        id: result.user.id,
        givenName: result.user.givenName,
        picture: result.user.picture,
        familyName: result.user.familyName,
      },
    };
  }

  @ApiOperation({
    description: `Returns redirect link to Google OAuth authorization.`,
  })
  @Get('link')
  redirectToGoogleAuth(): Promise<GetAuthorizationLinkResponse> {
    return this.getAuthorizationLinkQueryHandler.execute();
  }
}
