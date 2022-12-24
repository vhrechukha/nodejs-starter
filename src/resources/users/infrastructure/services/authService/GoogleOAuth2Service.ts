import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import type { IAuthService } from '../../../application/services/authService/IAuthService';
import type { IdentityDto } from '../../../application/services/authService/IdentityDto';
import type { GoogleUserDto } from './GoogleUserDto';

export class GoogleOAuth2Service implements IAuthService {
  async authenticate(token: string): Promise<IdentityDto> {
    const httpService = new HttpService();

    const { data: googleUser } = await firstValueFrom(
      httpService.get<GoogleUserDto>('https://www.googleapis.com/oauth2/v1/userinfo', {
        params: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          access_token: token,
        },
        responseType: 'json',
      })
    );

    return {
      email: googleUser.email,
      externalId: googleUser.id,
      givenName: googleUser.given_name,
      name: googleUser.name,
      picture: googleUser.picture,
      familyName: googleUser.family_name ?? null,
    };
  }
}
