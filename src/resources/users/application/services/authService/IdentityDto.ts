export interface IdentityDto {
  externalId: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string | null;
  picture: string;
}
