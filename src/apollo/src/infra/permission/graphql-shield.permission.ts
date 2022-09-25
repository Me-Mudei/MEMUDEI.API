import { shield, deny } from 'graphql-shield';
//import { isAdmin } from "./rules";
import Permission from './permission.interface';

export default class GraphqlShieldPermission implements Permission {
  constructor() {}

  getPermissions() {
    return shield({
      Mutation: {
        '*': deny,
      },
    });
  }
}
