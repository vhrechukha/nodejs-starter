import type { DeactivateUserCommandInput } from './DeactivateUserCommandInput';
import type { DeactivateUserCommandResult } from './DeactivateUserCommandResult';

export interface IDeactivateUserCommandHandler {
  execute(input: DeactivateUserCommandInput): Promise<DeactivateUserCommandResult>;
}
