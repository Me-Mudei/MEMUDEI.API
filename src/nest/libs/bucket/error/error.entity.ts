import { GraphQLError } from 'graphql';
import { ErrorCode } from '../../../libs/helpers/error-code.enum';

import { BucketErrorType } from './error.enum';

export class BucketError extends GraphQLError {
  constructor(
    message: string,
    type: BucketErrorType,
    code: ErrorCode = ErrorCode.INTERNAL_SERVER,
    originalError?: Error,
  ) {
    super(message, {
      extensions: {
        domain: 'BUCKET',
        type,
        originalError,
        code,
      },
    });
  }
}
