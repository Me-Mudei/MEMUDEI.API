import { GraphQLSchema } from 'graphql';

export default interface Schema {
  getSchema(): GraphQLSchema;
}
