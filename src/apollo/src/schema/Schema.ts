import { GraphQLSchema } from 'graphql';

export default interface Schema {
  schema: GraphQLSchema;
  getSchema(): GraphQLSchema;
}
