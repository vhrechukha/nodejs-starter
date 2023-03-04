import { Inject, Injectable, Scope } from '@nestjs/common';

import { AbstractQueryHandler } from '../../../../../common/application/AbstractQueryHandler';
import { IGlobalDBContext } from '../../../../../common/application/IGlobalDBContext';
import { BaseToken } from '../../../../../common/diTokens';
import type { GetAuthorizationLinkQueryResult } from './GetAuthorizationLinkQueryResult';
import type { IGetAuthorizationLinkQueryHandler } from './IGetAuthorizationLinkQueryHandler';

@Injectable({ scope: Scope.REQUEST })
export class GetAuthorizationLinkQueryHandler
  extends AbstractQueryHandler<void, GetAuthorizationLinkQueryResult>
  implements IGetAuthorizationLinkQueryHandler
{
  @Inject(BaseToken.GLOBAL_DB_CONTEXT) protected _dbContext: IGlobalDBContext;

  protected async implementation(): Promise<GetAuthorizationLinkQueryResult> {
    const SCOPES = 'email profile';
    const RESPONSE_TYPE = 'token';

    return {
      googleRedirectLink: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&scope=${SCOPES}&prompt=select_account%20consent`,
    };
  }
}
