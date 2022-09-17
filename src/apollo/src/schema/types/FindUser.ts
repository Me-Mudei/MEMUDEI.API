import { nonNull, extendType, stringArg } from 'nexus';
import FindUser from '../../../app/query/find_user/FindUser';
import PrismaDAOFactory from '../../factory/PrismaDAOFactory';

export default extendType({
  type: 'Query',
  definition(t) {
    t.field('findUser', {
      type: 'FindUserOutput',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        const query = {
          ['id']: args.id,
        };
        const createUser = new FindUser(new PrismaDAOFactory(ctx.db));
        return createUser.execute(query);
      },
    });
  },
});
