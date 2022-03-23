import { mutationType, nonNull } from 'nexus';
import CreateUser from '../../../app/usecase/create_user/CreateUser';
import PrismaRepositoryFactory from '../../factory/PrismaRepositoryFactory';

export default mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'MutationOutput',
      args: {
        input: nonNull('CreateUserInput'),
      },
      resolve: (_, { input }, ctx) => {
        const createUser = new CreateUser(new PrismaRepositoryFactory(ctx.db));
        return createUser.execute(input);
      },
    });
  },
});
