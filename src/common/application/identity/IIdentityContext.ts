import type { DSIdentity } from './DSIdentity';

export interface IIdentityContext {
  getIdentity(): DSIdentity;
}
