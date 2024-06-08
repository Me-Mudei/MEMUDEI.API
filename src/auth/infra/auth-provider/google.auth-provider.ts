import axios from "axios";

import { AuthProvider as EnumAuthProvider, User } from "../../domain";

import { AuthProvider, ProviderValidateInput } from "./auth-provider.interface";

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
  async authenticate(input: { token: string }) {
    const { data } = await axios.get<GoogleUserInfoOutput>(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${input.token}` } },
    );
    const user = new User({
      email: data.email,
      provider: EnumAuthProvider.GOOGLE,
    });
    user.external_id = data.id;
    return user;
  }

  async findUser<GoogleUserInfoOutput>(input: { token: string }) {
    const { data } = await axios.get<GoogleUserInfoOutput>(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      { headers: { Authorization: `Bearer ${input.token}` } },
    );
    return data;
  }

  async validate(input: ProviderValidateInput<GoogleUserInfoOutput>) {
    if (input.user.provider !== EnumAuthProvider.GOOGLE) {
      throw new Error("Invalid provider");
    }

    return (
      input.user.email === input.provider_user.email &&
      input.user.external_id === input.provider_user.id
    );
  }
}
