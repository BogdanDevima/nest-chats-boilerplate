import { PipeTransform, Injectable } from '@nestjs/common';
import { ObjectSchema } from 'joi';

import { ValidationBadRequestException } from 'src/exceptions';

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform {
  constructor(private schema: ObjectSchema<T>) {}

  transform(value: T) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new ValidationBadRequestException(error, 'Validation failed');
    }
    return value;
  }
}
