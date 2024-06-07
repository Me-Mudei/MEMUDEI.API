import { registerEnumType } from "@nestjs/graphql";
import { AuthProvider } from "#auth/domain";
export { AuthProvider };

registerEnumType(AuthProvider, {
  name: "AuthenticationProvider",
});
