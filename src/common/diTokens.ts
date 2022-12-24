export enum BaseType {
  GLOBAL_DB_CONTEXT = 'GLOBAL_DB_CONTEXT',
  IDENTITY_CONTEXT = 'IDENTITY_CONTEXT',
}

export enum QueryHandlerType {
  AUTHORIZATION_LINK = 'AUTHORIZATION_LINK',
}

export enum CommandHandlerType {
  AUTHORIZE_USER = 'AUTHORIZE_USER',
  DEACTIVATE_USER = 'DEACTIVATE_USER',
}

export enum ServiceType {
  AUTH_SERVICE = 'AUTH_SERVICE',
}
