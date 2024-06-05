import { GraphQLError } from "graphql";

import { AuthErrorType } from "./error.enum";

export class AuthError extends GraphQLError {
  constructor(
    message: string,
    type: AuthErrorType,
    code: string = "INTERNAL_SERVER",
    originalError?: Error,
  ) {
    super(message, {
      extensions: {
        domain: "AUTH",
        type,
        originalError,
        code,
      },
    });
  }
}
