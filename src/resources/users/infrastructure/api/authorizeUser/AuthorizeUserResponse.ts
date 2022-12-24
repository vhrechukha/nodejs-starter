import { ApiProperty } from '@nestjs/swagger';

class AuthorizeUserResponseUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  givenName: string;

  @ApiProperty({ nullable: true })
  familyName: string | null;

  @ApiProperty()
  picture: string;
}

export class AuthorizeUserResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: AuthorizeUserResponseUser })
  user: AuthorizeUserResponseUser;
}
