import { Inject, Injectable, Scope } from '@nestjs/common';
import type { EntityTarget, ObjectLiteral, QueryRunner } from 'typeorm';
import { DataSource } from 'typeorm';

import type { IUserRepository } from '../../../resources/users/application/boundaries/IUserRepository';
import { UserEntity } from '../../../resources/users/infrastructure/persistence/UserEntity';
import { UserRepository } from '../../../resources/users/infrastructure/persistence/UserRepository';
import type { IGlobalDBContext } from '../../application/IGlobalDBContext';
import { BaseToken } from '../../diTokens';

@Injectable({ scope: Scope.REQUEST })
export class GlobalDBContext implements IGlobalDBContext {
  private _queryRunner: QueryRunner;

  private _userRepository: IUserRepository;
  constructor(@Inject(BaseToken.DATA_SOURCE) private dataSource: DataSource) {}

  private getRepository<TEntity extends EntityTarget<ObjectLiteral>, TRepository>(
    ctor: new (...args: any[]) => TRepository,
    entity: TEntity
  ): TRepository {
    const repository = this._queryRunner.manager.getRepository(entity);

    return new ctor(repository.target, repository.manager, repository.queryRunner);
  }

  private initRepositories(): void {
    this._queryRunner = this.dataSource.createQueryRunner();

    this._userRepository = this.getRepository(UserRepository, UserEntity);
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
