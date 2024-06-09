import { Connection } from "#shared/infra";

import {
  AuthFacade,
  SignUpUseCase,
  SignInUseCase,
  ValidateUseCase,
  AuthorizeUseCase,
} from "../../app";
// import { GoogleAuthProvider } from "../auth-provider";
import { CredentialsAuthProvider } from "../auth-provider";
import { BcryptCrypto } from "../crypto";

export class AuthFacadeFactory {
  static create() {
    const prisma = Connection.getInstance();
    const crypto = new BcryptCrypto();
    // const googleProvider = new GoogleAuthProvider(prisma);
    const credentialsProvider = new CredentialsAuthProvider(crypto);

    const authorizeUseCase = new AuthorizeUseCase(prisma);
    const signUpUseCase = new SignUpUseCase(prisma, [credentialsProvider]);
    const signInUseCase = new SignInUseCase(prisma, [credentialsProvider]);
    const validateUseCase = new ValidateUseCase(prisma);

    return new AuthFacade({
      authorizeUseCase,
      signUpUseCase,
      signInUseCase,
      validateUseCase,
    });
  }
}
