import { AuthProvider as EnumAuthProvider, User } from "../../domain";
import { Crypto } from "../crypto";

import { AuthProvider, ProviderValidateInput } from "./auth-provider.interface";

export class CredentialsAuthProvider implements AuthProvider {
  provider = EnumAuthProvider.CREDENTIALS;
  constructor(readonly crypto: Crypto) {}
  async authenticate(input: any) {
    const user = new User({
      email: input.email,
      provider: EnumAuthProvider.CREDENTIALS,
    });
    if (input.password) {
      const hash = await this.crypto.hash(input.password);
      user.password = hash;
    }
    return user;
  }

  async validate(input: ProviderValidateInput<User>) {
    if (input.user.provider !== EnumAuthProvider.CREDENTIALS) {
      throw new Error("Invalid provider");
    }
    return this.crypto.compare(
      input.provider_user.password,
      input.user.password,
    );
  }
}
