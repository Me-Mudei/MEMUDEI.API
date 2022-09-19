import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import UserCreatedSendConfirmationHandler from "../../../../@core/user/app/handlers/user-created-send-confirmation.handler";
import CreateUser from "../../../../@core/user/app/use-cases/create-user.use-case";

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
      resolve: (_, { input }, ctx) => {
        ctx.broker.register(new UserCreatedSendConfirmationHandler());
        const createUser = new CreateUser(ctx.repositoryFactory, ctx.broker);
        return createUser.execute(input);
      },
    });
  },
});
