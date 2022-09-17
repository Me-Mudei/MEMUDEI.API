import { extendType, nonNull } from 'nexus';
import CompleteUser from '../../../app/usecase/complete_user/CompleteUser';

export default extendType({
  type: 'Mutation',
  definition(t) {
    t.field('completeUser', {
      type: 'MutationOutput',
      args: {
        input: nonNull('CompleteUserInput'),
      },
      resolve: (_, { input }, ctx) => {
        const completeUser = new CompleteUser(
          ctx.repositoryFactory,
          ctx.broker
        );
        return completeUser.execute(input);
      },
    });
  },
});
