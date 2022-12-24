import { Inject } from '@nestjs/common';

import { BaseType } from '../diTokens';
import { IIdentityContext } from './identity/IIdentityContext';
import { IGlobalDBContext } from './IGlobalDBContext';

export abstract class AbstractQueryHandler<TInputData = void, TOutputData = void> {
  protected _inputData: TInputData;

  @Inject(BaseType.GLOBAL_DB_CONTEXT)
  protected _dbContext: IGlobalDBContext;

  @Inject(BaseType.IDENTITY_CONTEXT)
  protected _identityContext: IIdentityContext;

  async execute(inputData: TInputData): Promise<TOutputData> {
    this._inputData = inputData;

    const result: TOutputData = await this.implementation(inputData);

    return result;
  }

  protected abstract implementation(inputData: TInputData): Promise<TOutputData> | TOutputData;
}
