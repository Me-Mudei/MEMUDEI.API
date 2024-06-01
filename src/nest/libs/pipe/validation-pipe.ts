import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class ValidationPipe extends NestValidationPipe {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async resolvePromises(value: any) {
    for (const key in value) {
      if (key && typeof value[key]?.then === 'function') {
        value[key] = await value[key];
      }
    }
    return value;
  }

  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata)) {
      return value;
    }
    await this.resolvePromises(value);

    const object = plainToInstance(metadata.metatype, value);
    const errors = await this.validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }
}
