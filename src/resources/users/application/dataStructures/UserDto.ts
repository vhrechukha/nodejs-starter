export interface UserDto {
  id: string;
  externalId: string;
  givenName: string;
  familyName: string | null;
  email: string;
  picture: string;
  isActive: boolean;
}
