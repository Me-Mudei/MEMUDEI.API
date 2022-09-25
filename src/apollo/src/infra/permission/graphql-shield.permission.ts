import { shield } from 'graphql-shield';
import { isAdmin } from './rules';
import Permission from './permission.interface';

export default class GraphqlShieldPermission implements Permission {
  getPermissions() {
    return shield({
      Mutation: {
        create_user: isAdmin,
      },
    });
  }
}
