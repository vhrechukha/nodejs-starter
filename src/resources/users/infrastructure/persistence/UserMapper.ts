import type { UserCreateDto } from '../../application/dataStructures/UserCreateDto';
import type { UserDto } from '../../application/dataStructures/UserDto';
import type { UserUpdateDto } from '../../application/dataStructures/UserUpdateDto';
import type { NewUserEntity } from './NewUserEntity';
import type { UpdatableUserEntity } from './UpdatableUserEntity';
import type { UserEntity } from './UserEntity';

export class UserMapper {
  static toDto(entity: UserEntity): UserDto {
    return {
      email: entity.email,
      externalId: entity.externalId,
      givenName: entity.givenName,
      id: entity.id,
      isActive: entity.isActive,
      picture: entity.picture,
      familyName: entity.familyName,
    };
  }

  static toNewEntity(entity: UserCreateDto): NewUserEntity {
    return {
      email: entity.email,
      externalId: entity.externalId,
      givenName: entity.givenName,
      isActive: entity.isActive,
      picture: entity.picture,
      familyName: entity.familyName,
    };
  }

  static toUpdateEntity(entity: UserUpdateDto): UpdatableUserEntity {
    return {
      id: entity.id,
      email: entity.email,
      externalId: entity.externalId,
      givenName: entity.givenName,
      isActive: entity.isActive,
      picture: entity.picture,
      familyName: entity.familyName,
    };
  }
}
