import type { OmitTyped } from '../../../../common/types/OmitTyped';
import type { UserDto } from './UserDto';

export type UserCreateDto = OmitTyped<UserDto, 'id'>;
