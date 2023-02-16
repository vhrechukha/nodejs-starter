import { Global, Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';

import type { IUserRepository } from '../../../resources/users/application/boundaries/IUserRepository';
import { UserRepository } from '../../../resources/users/infrastructure/persistence/UserRepository';
import type { IGlobalDBContext } from '../../application/IGlobalDBContext';

@Global()
@Injectable({ scope: Scope.REQUEST })
export class GlobalDBContext implements IGlobalDBContext {
  private readonly _userRepository: IUserRepository;
  private dataSource: DataSource;

  constructor(dataSource: DataSource, readonly _UserRepository: UserRepository) {
    this.dataSource = dataSource;
    this._userRepository = _UserRepository;
  }

  get userRepository(): IUserRepository {
    return this._userRepository;
  }
}
