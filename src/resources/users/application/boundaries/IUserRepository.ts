import type { UserCreateDto } from '../dataStructures/UserCreateDto';
import type { UserDto } from '../dataStructures/UserDto';
import type { UserUpdateDto } from '../dataStructures/UserUpdateDto';

export interface IUserRepository {
  findById(id: string): Promise<UserDto | null>;

  findByExternalId(externalId: string): Promise<UserDto | null>;

  create(data: UserCreateDto): Promise<UserDto>;

  update(data: UserUpdateDto): Promise<void>;
}
