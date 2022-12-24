import { BadRequestException } from '@nestjs/common';

interface CustomValidationErrors {
  field: string;
  message: string;
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: CustomValidationErrors[]) {
    super();
  }
}
