/* eslint-disable no-console */
import { Inject } from '@nestjs/common';

import { BaseToken } from '../diTokens';
import type { IDBContext } from './IDBContext';
import { IIdentityContext } from './identity/IIdentityContext';

export abstract class AbstractCommandHandler<TInputData = void, TOutputData = void> {
  protected _inputData: TInputData;

  protected abstract _dbContext: IDBContext | null;

  @Inject(BaseToken.IDENTITY_CONTEXT)
  protected _identityContext: IIdentityContext;

  private _rollbackHandlers: Array<<TError extends Error>(error: TError) => Promise<any>>;

  private _commitHandlers: Array<() => Promise<any>>;

  private _finallyHandlers: Array<() => Promise<any>>;

  constructor() {
    this._rollbackHandlers = [];

    this._commitHandlers = [];

    this._finallyHandlers = [];
  }

  protected addRollbackHandler(handler: <TError extends Error>(error: TError) => Promise<any>): void {
    this._rollbackHandlers.push(handler);
  }

  protected addCommitHandler(handler: () => any): void {
    this._commitHandlers.push(handler);
  }

  protected addFinallyHandler(handler: () => Promise<any>): void {
    this._finallyHandlers.push(handler);
  }

  async execute(inputData: TInputData): Promise<TOutputData> {
    this._inputData = inputData;

    if (this._dbContext) {
      await this._dbContext.startTransaction();
    }

    let result: TOutputData;

    try {
      result = await this.implementation(inputData);

      if (this._dbContext) {
        await this._dbContext.commitTransaction();
      }

      this._commitHandlers.map(action =>
        setImmediate(async () => {
          try {
            await action.apply(this);
          } catch (e) {
            console.error(`Error during commit handlers execution`, e);
          }
        })
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      if (this._dbContext) {
        await this._dbContext.rollbackTransaction();
      }

      this._rollbackHandlers.map(action =>
        setImmediate(async () => {
          try {
            await action.apply(this);
          } catch (e) {
            console.error(`Error during commit handlers execution`, e);
          }
        })
      );

      throw error;
    } finally {
      this._finallyHandlers.map(action =>
        setImmediate(async () => {
          try {
            await action.apply(this);
          } catch (e) {
            console.error(`Error during commit handlers execution`, e);
          }
        })
      );
    }

    return result;
  }

  protected abstract implementation(inputData: TInputData): Promise<TOutputData> | TOutputData;
}
