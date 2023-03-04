import { Inject } from '@nestjs/common';

import { BaseToken } from '../diTokens';
import { IIdentityContext } from './identity/IIdentityContext';
import { IGlobalReadDBContext } from './IGlobalReadDBContext';

export abstract class AbstractQueryHandler<TInputData = void, TOutputData = void> {
  protected _inputData: TInputData;

  @Inject(BaseToken.GLOBAL_READ_DB_CONTEXT)
  protected _dbContext: IGlobalReadDBContext;

  @Inject(BaseToken.IDENTITY_CONTEXT)
  protected _identityContext: IIdentityContext;

  async execute(inputData: TInputData): Promise<TOutputData> {
    this._inputData = inputData;

    const result: TOutputData = await this.implementation(inputData);

    return result;
  }

  protected abstract implementation(inputData: TInputData): Promise<TOutputData> | TOutputData;
}
