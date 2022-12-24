import type { IdentityDto } from './IdentityDto';

export interface IAuthService {
  authenticate(accessToken: string): Promise<IdentityDto>;
}
