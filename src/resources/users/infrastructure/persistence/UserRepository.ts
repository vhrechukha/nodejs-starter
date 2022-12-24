import { AbstractRepository, EntityRepository } from 'typeorm';

import type { IUserRepository } from '../../application/boundaries/IUserRepository';
import type { UserCreateDto } from '../../application/dataStructures/UserCreateDto';
import type { UserDto } from '../../application/dataStructures/UserDto';
import type { UserUpdateDto } from '../../application/dataStructures/UserUpdateDto';
import { UserEntity } from './UserEntity';
import { UserMapper } from './UserMapper';

@EntityRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity> implements IUserRepository {
  async findById(id: string): Promise<UserDto | null> {
    const contactEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!contactEntity) {
      return null;
    }

    return UserMapper.toDto(contactEntity);
  }

  async findByExternalId(externalId: string): Promise<UserDto | null> {
    const contactEntity = await this.repository.findOne({
      where: {
        externalId,
      },
    });

    if (!contactEntity) {
      return null;
    }

    return UserMapper.toDto(contactEntity);
  }

  async create(data: UserCreateDto): Promise<UserDto> {
    const applyInquiryEntityToSave = UserMapper.toNewEntity(data);

    const savedUserEntity = await this.repository.save(applyInquiryEntityToSave);

    const applyInquiryEntity = await this.repository.findOneOrFail({
      where: {
        id: savedUserEntity.id,
      },
    });

    return UserMapper.toDto(applyInquiryEntity);
  }

  async update(user: UserUpdateDto): Promise<void> {
    const userEntityToSave = UserMapper.toUpdateEntity(user);

    await this.repository.save(userEntityToSave);
  }
}
