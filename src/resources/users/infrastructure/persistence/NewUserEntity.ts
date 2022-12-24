import type { OmitTyped } from '../../../../common/types/OmitTyped';
import type { UserEntity } from './UserEntity';

export type NewUserEntity = OmitTyped<UserEntity, 'id' | 'createdAt' | 'updatedAt'>;
