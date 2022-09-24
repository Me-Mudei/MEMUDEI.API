import { rule } from "graphql-shield";
//import Auth from "../../../../core/auth";

export const isAdmin = rule()(async (_, { input }, _ctx) => {
  const auth = new Auth();
  console.log(input);
  return auth.isAdmin(input);
});

export class Auth {
  isAdmin(_input: any) {
    return false;
  }
}
