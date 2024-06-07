import { PrismaClient } from "@prisma/client";
import { UniqueEntityId } from "#shared/domain";

import { AuthProvider as EnumAuthProvider, User } from "../../domain";
import { Crypto } from "../crypto";

import { AuthProvider } from "./auth-provider.interface";

export class CredentialsAuthProvider implements AuthProvider {
  provider = EnumAuthProvider.CREDENTIALS;
  constructor(
    readonly prisma: PrismaClient,
    readonly crypto: Crypto,
  ) {}
  async authenticate(input: any) {
    const user = new User({
      name: input.name,
      email: input.email,
      provider: EnumAuthProvider.CREDENTIALS,
    });
    if (input.password) {
      const hash = await this.crypto.hash(input.password);
      user.password = hash;
    }
    return user;
  }

  async validate(input: any) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (foundUser.provider !== EnumAuthProvider.CREDENTIALS) {
      throw new Error("Invalid provider");
    }
    const isValid = await this.crypto.compare(
      input.password,
      foundUser.password,
    );
    if (!isValid) {
      throw new Error("Invalid password");
    }
    const user = new User({
      id: new UniqueEntityId(foundUser.id),
      name: foundUser.name,
      email: foundUser.email,
      provider: foundUser.provider,
      created_at: foundUser.created_at,
      updated_at: foundUser.updated_at,
    });
    return user;
  }
}
