import type { Repository } from 'typeorm';

import type { UserEntity } from '../../infrastructure/persistence/UserEntity';
import type { UserCreateDto } from '../dataStructures/UserCreateDto';
import type { UserDto } from '../dataStructures/UserDto';
import type { UserUpdateDto } from '../dataStructures/UserUpdateDto';

export interface IUserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserDto | null>;

  findByExternalId(externalId: string): Promise<UserDto | null>;

  createUser(data: UserCreateDto): Promise<UserDto>;

  updateUser(data: UserUpdateDto): Promise<void>;
}
