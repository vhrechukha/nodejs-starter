import type { IUserRepository } from '../../resources/users/application/boundaries/IUserRepository';
import type { IDBContext } from './IDBContext';

export interface IGlobalDBContext extends IDBContext {
  userRepository: IUserRepository;
}
