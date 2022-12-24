export interface GoogleUserDto {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name?: string;
  picture: string;
  verified_email: boolean;
}
