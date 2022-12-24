import { ApiProperty } from '@nestjs/swagger';

export class GetAuthorizationLinkResponse {
  @ApiProperty()
  googleRedirectLink: string;
}
