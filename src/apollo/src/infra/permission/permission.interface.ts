import { IMiddlewareGenerator } from 'graphql-middleware';

export default interface Permission {
  getPermissions(): IMiddlewareGenerator<any, any, any>;
}
