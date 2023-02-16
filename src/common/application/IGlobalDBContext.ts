import type { IUserRepository } from '../../resources/users/application/boundaries/IUserRepository';

export interface IGlobalDBContext {
  userRepository: IUserRepository;
}
