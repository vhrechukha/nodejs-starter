import type { GetAuthorizationLinkQueryResult } from './GetAuthorizationLinkQueryResult';

export interface IGetAuthorizationLinkQueryHandler {
  execute(): Promise<GetAuthorizationLinkQueryResult>;
}
