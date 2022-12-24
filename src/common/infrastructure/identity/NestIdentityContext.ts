import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import type { DSIdentity } from '../../application/identity/DSIdentity';
import type { IIdentityContext } from '../../application/identity/IIdentityContext';
import { RequestExtended } from '../api/RequestExtended';

@Injectable({ scope: Scope.REQUEST })
export class NestIdentityContext implements IIdentityContext {
  constructor(
    @Inject(REQUEST)
    private request: RequestExtended
  ) {}

  getIdentity(): DSIdentity {
    const {
      user: { id },
    } = this.request;

    return {
      id,
    };
  }
}
