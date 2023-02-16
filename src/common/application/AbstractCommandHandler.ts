/* eslint-disable no-console */
import { Inject } from '@nestjs/common';

import { BaseType } from '../diTokens';
import { IIdentityContext } from './identity/IIdentityContext';
import type { IGlobalDBContext } from './IGlobalDBContext';

export abstract class AbstractCommandHandler<TInputData = void, TOutputData = void> {
  protected _inputData: TInputData;

  protected abstract _dbContext: IGlobalDBContext | null;

  @Inject(BaseType.IDENTITY_CONTEXT)
  protected _identityContext: IIdentityContext;

  async execute(inputData: TInputData): Promise<TOutputData> {
    this._inputData = inputData;

    const result: TOutputData = await this.implementation(inputData);

    return result;
  }

  protected abstract implementation(inputData: TInputData): Promise<TOutputData> | TOutputData;
}
