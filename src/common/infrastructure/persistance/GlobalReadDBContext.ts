import { Inject, Injectable } from '@nestjs/common';
import type { EntityTarget, ObjectLiteral } from 'typeorm';
import { DataSource } from 'typeorm';

import type { IUserRepository } from '../../../resources/users/application/boundaries/IUserRepository';
import { UserEntity } from '../../../resources/users/infrastructure/persistence/UserEntity';
import { UserRepository } from '../../../resources/users/infrastructure/persistence/UserRepository';
import type { IGlobalReadDBContext } from '../../application/IGlobalReadDBContext';
import { BaseToken } from '../../diTokens';

@Injectable()
export class GlobalReadDBContext implements IGlobalReadDBContext {
  private readonly instantiatedRepositories: Map<{ new (...args: any[]): any }, any> = new Map();

  constructor(@Inject(BaseToken.DATA_SOURCE) private dataSource: DataSource) {}

  private getRepository<TEntity extends EntityTarget<ObjectLiteral>, TRepository>(
    ctor: new (...args: any[]) => TRepository,
    entity: TEntity
  ): TRepository {
    let instantiatedRepository = this.instantiatedRepositories.get(ctor);

    if (!instantiatedRepository) {
      instantiatedRepository = new ctor(this.dataSource.getRepository(entity), this.dataSource);

      this.instantiatedRepositories.set(ctor, instantiatedRepository);
    }

    return instantiatedRepository as TRepository;
  }

  get userRepository(): IUserRepository {
    return this.getRepository(UserRepository, UserEntity);
  }
}
