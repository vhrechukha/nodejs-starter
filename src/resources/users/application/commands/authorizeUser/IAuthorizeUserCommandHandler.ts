import type { AuthorizeUserCommandInput } from './AuthorizeUserCommandInput';
import type { AuthorizeUserCommandResult } from './AuthorizeUserCommandResult';

export interface IAuthorizeUserCommandHandler {
  execute(input: AuthorizeUserCommandInput): Promise<AuthorizeUserCommandResult>;
}
