import { registerEnumType } from "@nestjs/graphql";

export enum AuthenticationProvider {
  GOOGLE = "GOOGLE",
}

registerEnumType(AuthenticationProvider, {
  name: "AuthenticationProvider",
});
