export interface AuthorizeUserCommandResult {
  user: {
    id: string;
    givenName: string;
    familyName: string | null;
    picture: string;
  };
  accessToken: string;
}
