import { PrismaClient } from "@prisma/client";
import { UniqueEntityId } from "#shared/domain";
import axios from "axios";

import { AuthProvider as EnumAuthProvider, User } from "../../domain";

import { AuthProvider } from "./auth-provider.interface";

export interface GoogleUserInfoOutput {
  id: string;
  email: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  hd: string;
}

export class GoogleAuthProvider implements AuthProvider {
  provider = EnumAuthProvider.GOOGLE;
  constructor(readonly prisma: PrismaClient) {}
  async authenticate(input: { token: string }) {
    const { data } = await axios.get<GoogleUserInfoOutput>(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${input.token}` } },
    );
    const user = new User({
      email: data.email,
      name: `${data.given_name} ${data.family_name}`,
      provider: EnumAuthProvider.GOOGLE,
      external_id: data.id,
    });
    return user;
  }

  async validate(input: { token: string }) {
    const { data } = await axios.get<GoogleUserInfoOutput>(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${input.token}` } },
    );
    const foundUser = await this.prisma.user.findFirstOrThrow({
      where: {
        external_id: data.id,
        email: data.email,
      },
    });
    if (foundUser.provider !== EnumAuthProvider.GOOGLE) {
      throw new Error("Invalid provider");
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
