import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'joi';

export class ValidationBadRequestException extends BadRequestException {
  constructor(error: ValidationError, message = 'Validation Failed', description = 'Bad Request') {
    super(ValidationBadRequestException.createValidationResponse(error, message, description));
  }

  // Transform error data into the object where
  // the key is field name and value is an error.
  // Fields that do not have an error are omitted
  private static createValidationResponse = (
    error: ValidationError,
    message: string,
    description: string,
  ) => {
    const formErrors = error.details.reduce((acc, fieldError) => {
      // TODO: test this with nested fields
      acc[fieldError.path[0]] = fieldError.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
      error: description,
      errors: formErrors,
    };
  };
}
