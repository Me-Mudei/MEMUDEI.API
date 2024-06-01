import { GraphQLError } from 'graphql';
import { ErrorCode } from '../../../libs/helpers/error-code.enum';

import { FileErrorType } from './error.enum';

export class FileError extends GraphQLError {
  constructor(
    message: string,
    type: FileErrorType,
    code: ErrorCode = ErrorCode.INTERNAL_SERVER,
    originalError?: Error,
  ) {
    super(message, {
      extensions: {
        domain: 'AUTH',
        type,
        originalError,
        code,
      },
    });
  }
}
