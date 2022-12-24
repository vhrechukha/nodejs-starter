import type { Request } from 'express';

import type { DSRequestUser } from '../identity/DSRequestUser';

export type RequestExtended = Request & {
  user: DSRequestUser;
  originalBody: any;
};
