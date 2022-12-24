import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';

import { ValidationException } from '../../validation/joi/ValidationException';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(400).json({
      message: exception.validationErrors.map(({ message }) => message),
    });
  }
}
