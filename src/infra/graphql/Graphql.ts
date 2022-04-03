import { GraphQLSchema } from 'graphql';
import Context from './Context';

export default interface Graphql {
  schema: GraphQLSchema;
  context: Context;
  listen(port?: number): Promise<any>;
}
