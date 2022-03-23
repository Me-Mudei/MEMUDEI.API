import { mutationType, nonNull } from 'nexus';
import CreateUser from '../../../app/usecase/create_user/CreateUser';
import UserPrismaRepository from '../../repository/UserPrismaRepository';

export default mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'MutationOutput',
      args: {
        input: nonNull('CreateUserInput'),
      },
      resolve: (_, { input }, ctx) => {
        const createUser = new CreateUser(new UserPrismaRepository(ctx.db));
        return createUser.execute(input);
      },
    });
  },
});
