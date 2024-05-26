import { GraphQLError } from "graphql";
import { nexusShield, allow } from "nexus-shield";

export const shieldPlugin = nexusShield({
  defaultError: new GraphQLError("Not Authorized!", {
    extensions: { code: "FORBIDDEN" },
  }),
  defaultRule: allow,
});
