import type { OmitTyped } from '../../../../common/types/OmitTyped';
import type { UserEntity } from './UserEntity';

export type UpdatableUserEntity = OmitTyped<UserEntity, 'createdAt' | 'updatedAt'>;
