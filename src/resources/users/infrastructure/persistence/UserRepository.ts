import { EntityManager, EntityTarget, Repository } from 'typeorm';

import { CustomRepository } from '../../../../common/decorators/custom-repository.decorator';
import type { IUserRepository } from '../../application/boundaries/IUserRepository';
import type { UserCreateDto } from '../../application/dataStructures/UserCreateDto';
import type { UserDto } from '../../application/dataStructures/UserDto';
import type { UserUpdateDto } from '../../application/dataStructures/UserUpdateDto';
import { UserEntity } from './UserEntity';
import { UserMapper } from './UserMapper';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
  constructor(target: EntityTarget<UserRepository>, manager: EntityManager) {
    super(UserEntity, manager);
  }

  async findById(id: string): Promise<UserDto | null> {
    const contactEntity = await this.findOne({
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
    const contactEntity = await this.findOne({
      where: {
        externalId,
      },
    });

    if (!contactEntity) {
      return null;
    }

    return UserMapper.toDto(contactEntity);
  }

  async createUser(data: UserCreateDto): Promise<UserDto> {
    const applyInquiryEntityToSave = UserMapper.toNewEntity(data);

    const savedUserEntity = await this.save(applyInquiryEntityToSave);

    const applyInquiryEntity = await this.findOneOrFail({
      where: {
        id: savedUserEntity.id,
      },
    });

    return UserMapper.toDto(applyInquiryEntity);
  }

  async updateUser(user: UserUpdateDto): Promise<void> {
    const userEntityToSave = UserMapper.toUpdateEntity(user);

    await this.save(userEntityToSave);
  }
}
