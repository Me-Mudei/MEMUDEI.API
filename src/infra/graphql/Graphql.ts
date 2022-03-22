import { GraphQLSchema } from 'graphql';
import Context from './Context';

export default interface graphql {
  schema: GraphQLSchema;
  context: Context;
  listen(port: number): void;
}
