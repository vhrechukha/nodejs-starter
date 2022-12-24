import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeUserRequestBody {
  @ApiProperty()
  accessToken: string;
}
