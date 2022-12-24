import { Global, Injectable, Scope } from '@nestjs/common';
import type { QueryRunner } from 'typeorm';
import { getConnection } from 'typeorm';

import type { IUserRepository } from '../../../resources/users/application/boundaries/IUserRepository';
import { UserRepository } from '../../../resources/users/infrastructure/persistence/UserRepository';
import type { IGlobalDBContext } from '../../application/IGlobalDBContext';

@Global()
@Injectable({ scope: Scope.REQUEST })
export class GlobalDBContext implements IGlobalDBContext {
  private _queryRunner: QueryRunner;

  private _userRepository: IUserRepository;

  private initRepositories(): void {
    this._queryRunner = getConnection().createQueryRunner();

    this._userRepository = this._queryRunner.manager.getCustomRepository(UserRepository);
  }

  get userRepository(): IUserRepository {
    return this._userRepository;
  }

  startTransaction(): Promise<void> {
    this.initRepositories();

    return this._queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this._queryRunner.commitTransaction();

    await this._queryRunner.release();
  }

  async rollbackTransaction(): Promise<void> {
    await this._queryRunner.rollbackTransaction();

    await this._queryRunner.release();
  }

  async releaseConnection(): Promise<void> {
    await this._queryRunner.release();
  }
}
