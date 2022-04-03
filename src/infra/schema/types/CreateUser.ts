import { extendType, nonNull } from 'nexus';
import UserCreatedSendConfirmationHandler from '../../../app/handler/UserCreatedSendConfirmationHandler';
import CreateUser from '../../../app/usecase/create_user/CreateUser';
import NodeMailerMailClientAdapter from '../../mail_client/NodeMailerMailClientAdapter';

export default extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'MutationOutput',
      args: {
        input: nonNull('CreateUserInput'),
      },
      resolve: (_, { input }, ctx) => {
        const mailClient = new NodeMailerMailClientAdapter();
        ctx.broker.register(new UserCreatedSendConfirmationHandler(mailClient));
        const createUser = new CreateUser(ctx.repositoryFactory, ctx.broker);
        return createUser.execute(input);
      },
    });
  },
});
