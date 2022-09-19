import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import User from "../../../../../@core/src/user";

export const CreateUserInput = inputObjectType({
  name: "create_user_input",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("name");
    t.nonNull.string("role_name");
  },
});

export const CreateUserOutput = objectType({
  name: "MutationOutput",
  definition(t) {
    t.string("status");
    t.string("message");
  },
});

export const UserMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_user", {
      type: "user_output",
      args: {
        input: nonNull("create_user_input"),
      },
      resolve: (_, { input }, _ctx) => {
        const user = User.create();
        return user.create_user(input);
      },
    });
  },
});
