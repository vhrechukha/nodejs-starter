import { Inject, Injectable, Scope } from '@nestjs/common';

import { ApplicationError } from '../../../../../app/errors/application.error';
import { AbstractCommandHandler } from '../../../../../common/application/AbstractCommandHandler';
import { IGlobalDBContext } from '../../../../../common/application/IGlobalDBContext';
import { BaseType } from '../../../../../common/diTokens';
import type { UserDto } from '../../dataStructures/UserDto';
import type { DeactivateUserCommandInput } from './DeactivateUserCommandInput';
import type { DeactivateUserCommandResult } from './DeactivateUserCommandResult';
import type { IDeactivateUserCommandHandler } from './IDeactivateUserCommandHandler';

@Injectable({ scope: Scope.REQUEST })
export class DeactivateUserCommandHandler
  extends AbstractCommandHandler<DeactivateUserCommandInput, DeactivateUserCommandResult>
  implements IDeactivateUserCommandHandler
{
  @Inject(BaseType.GLOBAL_DB_CONTEXT) protected _dbContext: IGlobalDBContext;

  protected async implementation(input: DeactivateUserCommandInput): Promise<DeactivateUserCommandResult> {
    const { userId } = input;

    const user = await this._dbContext.userRepository.findById(userId);

    if (!user) {
      throw new ApplicationError('User not found');
    }

    user.isActive = false;

    await this._dbContext.userRepository.updateUser(user);

    const updatedUser = (await this._dbContext.userRepository.findById(user.id)) as UserDto;

    return {
      id: updatedUser.id,
    };
  }
}
